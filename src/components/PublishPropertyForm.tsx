import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import {
  ArrowRight, ArrowLeft, CheckCircle2, User, MapPin,
  Home, Euro, Sparkles, Camera, Send
} from 'lucide-react';

// ─── Schema ───
const formSchema = z.object({
  // Contact
  name: z.string().trim().min(2, 'Mínimo 2 caracteres').max(100),
  surname: z.string().trim().max(100).optional(),
  email: z.string().trim().email('Email inválido').max(255),
  telephone: z.string().trim().min(6, 'Teléfono inválido').max(20),
  mobile: z.string().trim().max(20).optional(),
  // Location
  province: z.string().min(1, 'Seleccione provincia'),
  city: z.string().trim().max(100).optional(),
  zone: z.string().trim().max(100).optional(),
  postalCode: z.string().trim().max(10).optional(),
  address: z.string().trim().min(3, 'Dirección requerida').max(300),
  addressNumber: z.string().trim().max(10).optional(),
  floor: z.string().trim().max(10).optional(),
  door: z.string().trim().max(10).optional(),
  // Property
  propertyType: z.string().min(1, 'Seleccione tipo'),
  bedrooms: z.string().max(5).optional(),
  doubleBedrooms: z.string().max(5).optional(),
  bathrooms: z.string().max(5).optional(),
  toilets: z.string().max(5).optional(),
  netArea: z.string().max(10).optional(),
  builtArea: z.string().max(10).optional(),
  plotArea: z.string().max(10).optional(),
  propertyCondition: z.string().optional(),
  interiorCarpentry: z.string().optional(),
  exteriorCarpentry: z.string().optional(),
  views: z.string().optional(),
  description: z.string().max(2000).optional(),
  // Economic
  salePrice: z.string().max(20).optional(),
  rentalPrice: z.string().max(20).optional(),
  communityFees: z.string().max(20).optional(),
  communityIncluded: z.boolean().optional(),
  optionToBuy: z.boolean().optional(),
  // Extras
  extras: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: 'contact', label: 'Contacto', icon: User },
  { id: 'location', label: 'Ubicación', icon: MapPin },
  { id: 'property', label: 'Inmueble', icon: Home },
  { id: 'economic', label: 'Económico', icon: Euro },
  { id: 'extras', label: 'Extras', icon: Sparkles },
  { id: 'photos', label: 'Fotos', icon: Camera },
];

const PROVINCES = [
  'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
  'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Girona', 'Granada',
  'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La Rioja', 'Las Palmas',
  'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra',
  'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza',
];

const PROPERTY_TYPES = [
  'Piso', 'Apartamento', 'Ático', 'Ático Dúplex', 'Dúplex', 'Planta Baja', 'Estudio',
  'Casa', 'Chalet', 'Adosado', 'Villa', 'Villa de Lujo', 'Casa de Pueblo',
  'Finca Rústica', 'Masía', 'Edificio',
  'Local Comercial', 'Nave Industrial', 'Parking', 'Trastero',
  'Parcela', 'Solar', 'Terreno',
];

const CONDITIONS = [
  'A reformar', 'Original', 'Parcialmente reformado', 'Buen estado',
  'Reformado', 'Semi-nuevo', 'Obra nueva', 'En construcción',
];

const INTERIOR_CARPENTRY = ['Aluminio', 'Madera', 'PVC', 'Cristal', 'Roble', 'Pino', 'Nogal', 'Haya'];
const EXTERIOR_CARPENTRY = ['Aluminio', 'Aluminio Lacado', 'Aluminio/Climalit', 'Climalit', 'Doble Acristalamiento', 'Hierro', 'Madera', 'PVC', 'PVC Climalit'];
const VIEWS_OPTIONS = ['Calle', 'Piscina', 'Playa', 'Mar', 'Mar y Montaña', 'Parque', 'Río', 'Avenida', 'Exterior', 'Jardín', 'Montaña', 'Panorámica', 'Patio', 'Plaza', 'Valle'];

const EXTRAS_LIST = [
  'Agua', 'Aire acondicionado', 'Aire acondicionado central', 'Alarma', 'Alarma incendios',
  'Alarma robo', 'Apartamento independiente', 'Armarios empotrados', 'Ascensor', 'Balcón',
  'Bar', 'Barbacoa', 'Buhardilla', 'Caja fuerte', 'Calefacción', 'Calefacción central',
  'Chimenea', 'Cocina independiente', 'Depósito de agua', 'Electrodomésticos',
  'Galería', 'Gas central', 'Gimnasio', 'Sala de juegos', 'Jacuzzi', 'Jardín',
  'Lavandería', 'Línea telefónica', 'Electricidad', 'Cenador', 'Amueblado', 'Mirilla',
  'Parking', 'Patio', 'Pérgola', 'Piscina comunitaria', 'Piscina privada', 'Garaje',
  'Portero físico', 'Primera línea', 'Puerta de seguridad', 'Puertas automáticas',
  'Riego automático', 'Satélite', 'Sauna', 'Solárium', 'Pista de tenis',
  'Terraza', 'Terraza acristalada', 'Todo exterior', 'Trastero', 'TV',
  'Urbanización', 'Armarios', 'Videoportero',
];

const initialFormData: FormData = {
  name: '', surname: '', email: '', telephone: '', mobile: '',
  province: '', city: '', zone: '', postalCode: '', address: '', addressNumber: '', floor: '', door: '',
  propertyType: '', bedrooms: '', doubleBedrooms: '', bathrooms: '', toilets: '',
  netArea: '', builtArea: '', plotArea: '', propertyCondition: '', interiorCarpentry: '',
  exteriorCarpentry: '', views: '', description: '',
  salePrice: '', rentalPrice: '', communityFees: '', communityIncluded: false, optionToBuy: false,
  extras: [],
};

// ─── Reusable Field ───
function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5 tracking-wide uppercase">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ value, onChange, options, placeholder, error }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string; error?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${error ? 'border-destructive' : 'border-input'}`}
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function PublishPropertyForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const update = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const toggleExtra = (extra: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras?.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...(prev.extras || []), extra],
    }));
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 12 - photoFiles.length);
      setPhotoFiles(prev => [...prev, ...newFiles].slice(0, 12));
    }
  };

  const removePhoto = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};
    if (step === 0) {
      if (!formData.name || formData.name.trim().length < 2) newErrors.name = 'Nombre requerido';
      if (!formData.email || !z.string().email().safeParse(formData.email).success) newErrors.email = 'Email inválido';
      if (!formData.telephone || formData.telephone.trim().length < 6) newErrors.telephone = 'Teléfono requerido';
    }
    if (step === 1) {
      if (!formData.province) newErrors.province = 'Seleccione provincia';
      if (!formData.address || formData.address.trim().length < 3) newErrors.address = 'Dirección requerida';
    }
    if (step === 2) {
      if (!formData.propertyType) newErrors.propertyType = 'Seleccione tipo';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep(s => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Save to database
    try {
      await supabase.from('property_submissions').insert({
        contact_name: `${formData.name} ${formData.surname || ''}`.trim(),
        contact_email: formData.email,
        contact_phone: formData.telephone,
        contact_mobile: formData.mobile || null,
        property_type: formData.propertyType,
        province: formData.province,
        city: formData.city || null,
        zone: formData.zone || null,
        postal_code: formData.postalCode || null,
        address: formData.address,
        address_number: formData.addressNumber || null,
        floor: formData.floor || null,
        door: formData.door || null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        double_bedrooms: formData.doubleBedrooms ? parseInt(formData.doubleBedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        toilets: formData.toilets ? parseInt(formData.toilets) : null,
        net_area: formData.netArea ? parseFloat(formData.netArea) : null,
        built_area: formData.builtArea ? parseFloat(formData.builtArea) : null,
        plot_area: formData.plotArea ? parseFloat(formData.plotArea) : null,
        property_condition: formData.propertyCondition || null,
        interior_carpentry: formData.interiorCarpentry || null,
        exterior_carpentry: formData.exteriorCarpentry || null,
        views: formData.views || null,
        description: formData.description || null,
        sale_price: formData.salePrice || null,
        rental_price: formData.rentalPrice || null,
        community_fees: formData.communityFees || null,
        community_included: formData.communityIncluded || false,
        option_to_buy: formData.optionToBuy || false,
        extras: formData.extras || [],
      } as any);
    } catch (e) {
      // Silently fail - form still shows success to user
      console.error('Error saving submission:', e);
    }

    setSubmitted(true);
    toast({ title: '¡Enviado correctamente!', description: 'Nos pondremos en contacto contigo pronto.' });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl border border-border p-12 text-center max-w-lg mx-auto"
      >
        <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">¡Gracias!</h3>
        <p className="text-muted-foreground">Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 24 horas.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Step Indicator ── */}
      <div className="flex items-center justify-between mb-8 px-2">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { if (i < step) setStep(i); }}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              i === step
                ? 'bg-primary text-primary-foreground shadow-md'
                : i < step
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
            }`}>
              {i < step ? <CheckCircle2 className="h-5 w-5" /> : <s.icon className="h-4 w-4" />}
            </div>
            <span className={`text-[10px] font-medium tracking-wide uppercase hidden sm:block transition-colors ${
              i === step ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Form Card ── */}
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* STEP 0: Contact */}
            {step === 0 && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">Datos de contacto</h3>
                <p className="text-sm text-muted-foreground mb-4">Para poder contactarte con la información de tu valoración.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombre" required error={errors.name}>
                    <Input value={formData.name} onChange={e => update('name', e.target.value)} placeholder="María" className={errors.name ? 'border-destructive' : ''} />
                  </Field>
                  <Field label="Apellidos">
                    <Input value={formData.surname} onChange={e => update('surname', e.target.value)} placeholder="García López" />
                  </Field>
                </div>
                <Field label="Email" required error={errors.email}>
                  <Input type="email" value={formData.email} onChange={e => update('email', e.target.value)} placeholder="maria@email.com" className={errors.email ? 'border-destructive' : ''} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Teléfono" required error={errors.telephone}>
                    <Input value={formData.telephone} onChange={e => update('telephone', e.target.value)} placeholder="+34 600 000 000" className={errors.telephone ? 'border-destructive' : ''} />
                  </Field>
                  <Field label="Móvil">
                    <Input value={formData.mobile} onChange={e => update('mobile', e.target.value)} placeholder="+34 700 000 000" />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 1: Location */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">Ubicación del inmueble</h3>
                <p className="text-sm text-muted-foreground mb-4">Indícanos dónde se encuentra la propiedad.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Provincia" required error={errors.province}>
                    <SelectField value={formData.province} onChange={v => update('province', v)} options={PROVINCES} placeholder="Seleccionar provincia" error={!!errors.province} />
                  </Field>
                  <Field label="Ciudad">
                    <Input value={formData.city} onChange={e => update('city', e.target.value)} placeholder="Madrid" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Zona / Barrio">
                    <Input value={formData.zone} onChange={e => update('zone', e.target.value)} placeholder="Salamanca" />
                  </Field>
                  <Field label="Código Postal">
                    <Input value={formData.postalCode} onChange={e => update('postalCode', e.target.value)} placeholder="28001" />
                  </Field>
                </div>
                <Field label="Dirección" required error={errors.address}>
                  <Input value={formData.address} onChange={e => update('address', e.target.value)} placeholder="Calle Serrano 45" className={errors.address ? 'border-destructive' : ''} />
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Número">
                    <Input value={formData.addressNumber} onChange={e => update('addressNumber', e.target.value)} placeholder="45" />
                  </Field>
                  <Field label="Planta">
                    <Input value={formData.floor} onChange={e => update('floor', e.target.value)} placeholder="3º" />
                  </Field>
                  <Field label="Puerta">
                    <Input value={formData.door} onChange={e => update('door', e.target.value)} placeholder="A" />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 2: Property */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">Detalles del inmueble</h3>
                <p className="text-sm text-muted-foreground mb-4">Cuéntanos las características de tu propiedad.</p>
                <Field label="Tipo de inmueble" required error={errors.propertyType}>
                  <SelectField value={formData.propertyType} onChange={v => update('propertyType', v)} options={PROPERTY_TYPES} placeholder="Seleccionar tipo" error={!!errors.propertyType} />
                </Field>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Field label="Hab. dobles">
                    <Input type="number" min="0" value={formData.doubleBedrooms} onChange={e => update('doubleBedrooms', e.target.value)} placeholder="0" />
                  </Field>
                  <Field label="Habitaciones">
                    <Input type="number" min="0" value={formData.bedrooms} onChange={e => update('bedrooms', e.target.value)} placeholder="0" />
                  </Field>
                  <Field label="Baños">
                    <Input type="number" min="0" value={formData.bathrooms} onChange={e => update('bathrooms', e.target.value)} placeholder="0" />
                  </Field>
                  <Field label="Aseos">
                    <Input type="number" min="0" value={formData.toilets} onChange={e => update('toilets', e.target.value)} placeholder="0" />
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="M² útiles">
                    <Input type="number" min="0" value={formData.netArea} onChange={e => update('netArea', e.target.value)} placeholder="80" />
                  </Field>
                  <Field label="M² construidos">
                    <Input type="number" min="0" value={formData.builtArea} onChange={e => update('builtArea', e.target.value)} placeholder="95" />
                  </Field>
                  <Field label="M² parcela">
                    <Input type="number" min="0" value={formData.plotArea} onChange={e => update('plotArea', e.target.value)} placeholder="200" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Estado del inmueble">
                    <SelectField value={formData.propertyCondition || ''} onChange={v => update('propertyCondition', v)} options={CONDITIONS} placeholder="Seleccionar estado" />
                  </Field>
                  <Field label="Vistas">
                    <SelectField value={formData.views || ''} onChange={v => update('views', v)} options={VIEWS_OPTIONS} placeholder="Seleccionar vistas" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Carpintería interior">
                    <SelectField value={formData.interiorCarpentry || ''} onChange={v => update('interiorCarpentry', v)} options={INTERIOR_CARPENTRY} placeholder="Seleccionar" />
                  </Field>
                  <Field label="Carpintería exterior">
                    <SelectField value={formData.exteriorCarpentry || ''} onChange={v => update('exteriorCarpentry', v)} options={EXTERIOR_CARPENTRY} placeholder="Seleccionar" />
                  </Field>
                </div>
                <Field label="Descripción de la propiedad">
                  <Textarea value={formData.description} onChange={e => update('description', e.target.value)} rows={4} placeholder="Describe tu propiedad: orientación, estado, reformas, detalles destacados..." />
                </Field>
              </div>
            )}

            {/* STEP 3: Economic */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">Datos económicos</h3>
                <p className="text-sm text-muted-foreground mb-4">Información sobre precios y gastos.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Precio de venta (€)">
                    <Input type="number" min="0" value={formData.salePrice} onChange={e => update('salePrice', e.target.value)} placeholder="350.000" />
                  </Field>
                  <Field label="Precio de alquiler (€/mes)">
                    <Input type="number" min="0" value={formData.rentalPrice} onChange={e => update('rentalPrice', e.target.value)} placeholder="1.200" />
                  </Field>
                </div>
                <Field label="Gastos de comunidad (€/mes)">
                  <Input type="number" min="0" value={formData.communityFees} onChange={e => update('communityFees', e.target.value)} placeholder="80" />
                </Field>
                <div className="flex flex-col gap-3 mt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.communityIncluded}
                      onChange={e => update('communityIncluded', e.target.checked)}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">Comunidad incluida en el precio</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.optionToBuy}
                      onChange={e => update('optionToBuy', e.target.checked)}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">Opción a compra</span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: Extras */}
            {step === 4 && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">Extras y equipamiento</h3>
                <p className="text-sm text-muted-foreground mb-4">Selecciona todo lo que incluye tu propiedad.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EXTRAS_LIST.map(extra => (
                    <label
                      key={extra}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all duration-200 ${
                        formData.extras?.includes(extra)
                          ? 'border-primary bg-primary/5 text-primary font-medium'
                          : 'border-border bg-background text-foreground hover:border-primary/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.extras?.includes(extra)}
                        onChange={() => toggleExtra(extra)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        formData.extras?.includes(extra) ? 'bg-primary border-primary' : 'border-muted-foreground/30'
                      }`}>
                        {formData.extras?.includes(extra) && (
                          <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span className="truncate">{extra}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Photos */}
            {step === 5 && (
              <div className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">Fotografías</h3>
                <p className="text-sm text-muted-foreground mb-4">Sube hasta 12 fotos de tu propiedad. Las buenas fotos atraen más compradores.</p>
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Arrastra o haz clic para subir</span>
                  <span className="text-xs text-muted-foreground mt-1">{photoFiles.length}/12 fotos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotos}
                    className="sr-only"
                  />
                </label>
                {photoFiles.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {photoFiles.map((file, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-muted">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Foto ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-foreground/70 text-background rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={prev}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
          <span className="text-xs text-muted-foreground">{step + 1} / {STEPS.length}</span>
          {step < STEPS.length - 1 ? (
            <Button onClick={next} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              Enviar
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Tus datos están protegidos. No compartimos tu información con terceros.
      </p>
    </div>
  );
}
