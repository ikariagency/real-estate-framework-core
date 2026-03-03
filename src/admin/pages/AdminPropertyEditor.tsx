import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Search, Plus, ArrowLeft, Save, Trash2, Eye, EyeOff,
  Star, StarOff, Camera, GripVertical, X, History, RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { optimizeImage, generateSlug } from '@/admin/utils/imageOptimizer';
import {
  PROPERTY_TYPES, ZONES_MADRID, CONDITIONS, EXTRAS_LIST,
  RENT_CATEGORIES
} from '@/data/propertyConstants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// ─── Types ───
interface AdminProperty {
  id: string;
  slug: string;
  title: string;
  title_en: string | null;
  type: string;
  property_type: string | null;
  rent_category: string | null;
  price: string;
  zone: string;
  sqm: number;
  sqm_useful: number | null;
  beds: number;
  baths: number;
  floor: string | null;
  elevator: boolean;
  garage: boolean;
  year_built: number | null;
  energy_cert: string | null;
  description_es: string | null;
  description_en: string | null;
  features: string[];
  features_en: string[];
  plot_size: number | null;
  reference: string | null;
  images: string[];
  published: boolean;
  featured: boolean;
  status: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface PropertyVersion {
  id: string;
  data_snapshot: any;
  edited_by: string | null;
  edited_at: string;
}

const emptyProperty: Omit<AdminProperty, 'id' | 'created_at' | 'updated_at'> = {
  slug: '', title: '', title_en: '', type: 'sale', property_type: 'Piso',
  rent_category: null, price: '', zone: '', sqm: 0, sqm_useful: null,
  beds: 0, baths: 0, floor: '', elevator: false, garage: false,
  year_built: null, energy_cert: 'En trámite', description_es: '', description_en: '',
  features: [], features_en: [], plot_size: null, reference: '',
  images: [], published: true, featured: false, status: 'active', created_by: null,
};

// ─── Reusable Field ───
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide uppercase">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function AdminSelect({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[] | string[]; placeholder: string;
}) {
  const opts = typeof options[0] === 'string'
    ? (options as string[]).map(o => ({ value: o, label: o }))
    : options as { value: string; label: string }[];
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="flex h-10 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      <option value="">{placeholder}</option>
      {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

const inputClass = "bg-slate-700 border-slate-600 text-white placeholder:text-slate-500";

export default function AdminPropertyEditor() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<AdminProperty | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [versions, setVersions] = useState<PropertyVersion[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'description' | 'extras' | 'images' | 'settings'>('basic');

  // ─── Fetch properties ───
  const fetchProperties = useCallback(async () => {
    const { data } = await supabase.from('admin_properties').select('*').order('created_at', { ascending: false });
    if (data) setProperties(data as unknown as AdminProperty[]);
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  // ─── Fetch versions ───
  const fetchVersions = async (propertyId: string) => {
    const { data } = await supabase.from('property_versions')
      .select('*')
      .eq('property_id', propertyId)
      .order('edited_at', { ascending: false })
      .limit(20);
    if (data) setVersions(data as unknown as PropertyVersion[]);
  };

  // ─── Handlers ───
  const startNew = () => {
    setEditing({ ...emptyProperty, id: '', created_at: '', updated_at: '' } as AdminProperty);
    setIsNew(true);
    setActiveTab('basic');
  };

  const startEdit = (p: AdminProperty) => {
    setEditing({ ...p });
    setIsNew(false);
    setActiveTab('basic');
  };

  const update = (field: keyof AdminProperty, value: any) => {
    setEditing(prev => {
      if (!prev) return prev;
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title
      if (field === 'title' && (isNew || !prev.slug)) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const toggleFeature = (feature: string) => {
    setEditing(prev => {
      if (!prev) return prev;
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  // ─── Save ───
  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title.trim()) { toast({ title: 'El título es obligatorio', variant: 'destructive' }); return; }
    if (!editing.price.trim()) { toast({ title: 'El precio es obligatorio', variant: 'destructive' }); return; }
    if (!editing.zone.trim()) { toast({ title: 'La zona es obligatoria', variant: 'destructive' }); return; }
    if (!editing.slug.trim()) { toast({ title: 'El slug es obligatorio', variant: 'destructive' }); return; }

    setSaving(true);
    try {
      const { id, created_at, updated_at, ...data } = editing;
      const payload = { ...data, updated_at: new Date().toISOString() };

      if (isNew) {
        const user = (await supabase.auth.getUser()).data.user;
        (payload as any).created_by = user?.id || null;
        const { error } = await supabase.from('admin_properties').insert(payload as any);
        if (error) throw error;
        toast({ title: 'Propiedad creada correctamente' });
      } else {
        // Save version snapshot before update
        const user = (await supabase.auth.getUser()).data.user;
        const original = properties.find(p => p.id === id);
        if (original) {
          await supabase.from('property_versions').insert({
            property_id: id,
            data_snapshot: original as any,
            edited_by: user?.id || null,
          } as any);
        }
        const { error } = await supabase.from('admin_properties').update(payload as any).eq('id', id);
        if (error) throw error;
        toast({ title: 'Propiedad actualizada' });
      }

      await fetchProperties();
      setEditing(null);
      setIsNew(false);
    } catch (err: any) {
      toast({ title: 'Error al guardar', description: err.message, variant: 'destructive' });
    }
    setSaving(false);
  };

  // ─── Delete ───
  const handleDelete = async () => {
    if (!editing || isNew) return;
    if (!confirm('¿Eliminar esta propiedad permanentemente?')) return;

    // Delete images from storage
    if (editing.images.length > 0) {
      const paths = editing.images.map(url => {
        const parts = url.split('/property-images/');
        return parts[1] || '';
      }).filter(Boolean);
      if (paths.length) await supabase.storage.from('property-images').remove(paths);
    }

    await supabase.from('admin_properties').delete().eq('id', editing.id);
    toast({ title: 'Propiedad eliminada' });
    await fetchProperties();
    setEditing(null);
  };

  // ─── Image upload ───
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !editing) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    for (const file of files) {
      try {
        const optimized = await optimizeImage(file);
        const fileName = `${editing.slug || 'prop'}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.webp`;
        const path = `${editing.slug || 'new'}/${fileName}`;

        const { error } = await supabase.storage.from('property-images').upload(path, optimized, {
          contentType: 'image/webp', upsert: false,
        });
        if (error) throw error;

        const { data: urlData } = supabase.storage.from('property-images').getPublicUrl(path);
        newUrls.push(urlData.publicUrl);
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    if (newUrls.length > 0) {
      update('images', [...editing.images, ...newUrls]);
      toast({ title: `${newUrls.length} imagen(es) subida(s)` });
    }
    setUploading(false);
    e.target.value = '';
  };

  const removeImage = async (index: number) => {
    if (!editing) return;
    const url = editing.images[index];
    const parts = url.split('/property-images/');
    if (parts[1]) {
      await supabase.storage.from('property-images').remove([parts[1]]);
    }
    update('images', editing.images.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (!editing) return;
    const imgs = [...editing.images];
    const [moved] = imgs.splice(from, 1);
    imgs.splice(to, 0, moved);
    update('images', imgs);
  };

  // ─── Restore version ───
  const restoreVersion = async (version: PropertyVersion) => {
    if (!editing) return;
    const snap = version.data_snapshot as any;
    setEditing(prev => prev ? { ...prev, ...snap, id: prev.id } : prev);
    setShowHistory(false);
    toast({ title: 'Versión restaurada (sin guardar aún)' });
  };

  // ─── Filtered list ───
  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.zone.toLowerCase().includes(search.toLowerCase()) ||
    (p.reference || '').toLowerCase().includes(search.toLowerCase())
  );

  // ─── LIST VIEW ───
  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Publicar y Editar Propiedades</h1>
          <Button onClick={startNew} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="h-4 w-4" /> Nueva propiedad
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por título, zona o referencia..." value={search} onChange={e => setSearch(e.target.value)}
            className={`pl-10 ${inputClass}`} />
        </div>

        {properties.length === 0 ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
            <Plus className="h-12 w-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">No hay propiedades creadas desde el admin.</p>
            <p className="text-sm text-slate-500 mt-1">Crea tu primera propiedad con el botón de arriba.</p>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-left">
                  <th className="px-4 py-3">Imagen</th>
                  <th className="px-4 py-3">Título</th>
                  <th className="px-4 py-3">Ref</th>
                  <th className="px-4 py-3">Zona</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt="" className="w-16 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-10 bg-slate-700 rounded flex items-center justify-center">
                          <Camera className="h-4 w-4 text-slate-500" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white font-medium max-w-[200px] truncate">{p.title}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{p.reference || '—'}</td>
                    <td className="px-4 py-3 text-slate-300">{p.zone}</td>
                    <td className="px-4 py-3 text-white font-semibold">{p.price}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {p.published ? <Eye className="h-4 w-4 text-emerald-400" /> : <EyeOff className="h-4 w-4 text-slate-500" />}
                        {p.featured && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(p)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-slate-700 h-8 px-2">
                          Editar
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { startEdit(p); fetchVersions(p.id); setShowHistory(true); }}
                          className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 px-2">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ─── EDITOR VIEW ───
  const tabs = [
    { id: 'basic' as const, label: 'Básico' },
    { id: 'details' as const, label: 'Detalles' },
    { id: 'description' as const, label: 'Descripción' },
    { id: 'extras' as const, label: 'Extras' },
    { id: 'images' as const, label: `Imágenes (${editing.images.length})` },
    { id: 'settings' as const, label: 'Configuración' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => { setEditing(null); setIsNew(false); }}
            className="text-slate-400 hover:text-white hover:bg-slate-700 h-9 px-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold text-white">{isNew ? 'Nueva propiedad' : 'Editar propiedad'}</h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <>
              <Button variant="ghost" onClick={() => { fetchVersions(editing.id); setShowHistory(true); }}
                className="text-slate-400 hover:text-white hover:bg-slate-700 gap-2">
                <History className="h-4 w-4" /> Historial
              </Button>
              <Button variant="ghost" onClick={handleDelete}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 gap-2">
                <Trash2 className="h-4 w-4" /> Eliminar
              </Button>
            </>
          )}
          <Button onClick={handleSave} disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Save className="h-4 w-4" /> {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        {/* ── BASIC ── */}
        {activeTab === 'basic' && (
          <div className="space-y-5 max-w-3xl">
            <Field label="Título" required>
              <Input value={editing.title} onChange={e => update('title', e.target.value)} placeholder="Piso en Madrid (Salamanca)" className={inputClass} />
            </Field>
            <Field label="Título (inglés)">
              <Input value={editing.title_en || ''} onChange={e => update('title_en', e.target.value)} placeholder="Apartment in Madrid (Salamanca)" className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Slug (URL)" required>
                <Input value={editing.slug} onChange={e => update('slug', e.target.value)} placeholder="piso-madrid-salamanca" className={inputClass} />
              </Field>
              <Field label="Referencia">
                <Input value={editing.reference || ''} onChange={e => update('reference', e.target.value)} placeholder="V1050" className={inputClass} />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Tipo operación" required>
                <AdminSelect value={editing.type} onChange={v => update('type', v)}
                  options={[{ value: 'sale', label: 'Venta' }, { value: 'rent', label: 'Alquiler' }]} placeholder="Seleccionar" />
              </Field>
              <Field label="Tipo inmueble">
                <AdminSelect value={editing.property_type || ''} onChange={v => update('property_type', v)}
                  options={PROPERTY_TYPES} placeholder="Seleccionar" />
              </Field>
              {editing.type === 'rent' && (
                <Field label="Categoría alquiler">
                  <AdminSelect value={editing.rent_category || ''} onChange={v => update('rent_category', v)}
                    options={RENT_CATEGORIES} placeholder="Seleccionar" />
                </Field>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Precio" required>
                <Input value={editing.price} onChange={e => update('price', e.target.value)} placeholder="350.000 €" className={inputClass} />
              </Field>
              <Field label="Zona" required>
                <AdminSelect value={editing.zone} onChange={v => update('zone', v)} options={ZONES_MADRID} placeholder="Seleccionar zona" />
              </Field>
            </div>
          </div>
        )}

        {/* ── DETAILS ── */}
        {activeTab === 'details' && (
          <div className="space-y-5 max-w-3xl">
            <div className="grid grid-cols-3 gap-4">
              <Field label="M² construidos">
                <Input type="number" min="0" value={editing.sqm || ''} onChange={e => update('sqm', Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="M² útiles">
                <Input type="number" min="0" value={editing.sqm_useful || ''} onChange={e => update('sqm_useful', Number(e.target.value) || null)} className={inputClass} />
              </Field>
              <Field label="M² parcela">
                <Input type="number" min="0" value={editing.plot_size || ''} onChange={e => update('plot_size', Number(e.target.value) || null)} className={inputClass} />
              </Field>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Field label="Habitaciones">
                <Input type="number" min="0" value={editing.beds} onChange={e => update('beds', Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="Baños">
                <Input type="number" min="0" value={editing.baths} onChange={e => update('baths', Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="Planta">
                <Input value={editing.floor || ''} onChange={e => update('floor', e.target.value)} placeholder="3ª" className={inputClass} />
              </Field>
              <Field label="Año construcción">
                <Input type="number" value={editing.year_built || ''} onChange={e => update('year_built', Number(e.target.value) || null)} className={inputClass} />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Certificado energético">
                <AdminSelect value={editing.energy_cert || ''} onChange={v => update('energy_cert', v)}
                  options={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'En trámite', 'Exento']} placeholder="Seleccionar" />
              </Field>
              <Field label="Estado inmueble">
                <AdminSelect value={editing.status === 'active' ? '' : editing.status} onChange={v => update('status', v || 'active')}
                  options={CONDITIONS} placeholder="Estado" />
              </Field>
            </div>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" checked={editing.elevator} onChange={e => update('elevator', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600" />
                Ascensor
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input type="checkbox" checked={editing.garage} onChange={e => update('garage', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600" />
                Garaje
              </label>
            </div>
          </div>
        )}

        {/* ── DESCRIPTION ── */}
        {activeTab === 'description' && (
          <div className="space-y-5 max-w-3xl">
            <Field label="Descripción (español)">
              <Textarea value={editing.description_es || ''} onChange={e => update('description_es', e.target.value)}
                rows={8} placeholder="Describe la propiedad en español..." className={inputClass} />
            </Field>
            <Field label="Descripción (inglés)">
              <Textarea value={editing.description_en || ''} onChange={e => update('description_en', e.target.value)}
                rows={8} placeholder="Describe the property in English..." className={inputClass} />
            </Field>
          </div>
        )}

        {/* ── EXTRAS ── */}
        {activeTab === 'extras' && (
          <div>
            <p className="text-sm text-slate-400 mb-4">Selecciona las características de la propiedad</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {EXTRAS_LIST.map(extra => (
                <label key={extra}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all ${
                    editing.features.includes(extra)
                      ? 'border-blue-500 bg-blue-600/10 text-blue-400 font-medium'
                      : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                  }`}>
                  <input type="checkbox" checked={editing.features.includes(extra)}
                    onChange={() => toggleFeature(extra)} className="sr-only" />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    editing.features.includes(extra) ? 'bg-blue-600 border-blue-500' : 'border-slate-500'
                  }`}>
                    {editing.features.includes(extra) && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className="truncate">{extra}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── IMAGES ── */}
        {activeTab === 'images' && (
          <div className="space-y-5">
            <label className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              uploading ? 'border-blue-500 bg-blue-600/5' : 'border-slate-600 hover:border-blue-500/40 hover:bg-blue-600/5'
            }`}>
              <Camera className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-400">{uploading ? 'Subiendo y optimizando...' : 'Arrastra o haz clic para subir'}</span>
              <span className="text-xs text-slate-500 mt-1">Se optimizan automáticamente a WebP (máx. 1920px)</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="sr-only" disabled={uploading} />
            </label>

            {editing.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {editing.images.map((url, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-slate-700 border border-slate-600">
                    <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute top-1 left-1 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-medium">
                        Principal
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {i > 0 && (
                        <button onClick={() => moveImage(i, 0)} className="p-1.5 bg-white/20 rounded-full hover:bg-white/30" title="Hacer principal">
                          <Star className="h-4 w-4 text-white" />
                        </button>
                      )}
                      {i > 0 && (
                        <button onClick={() => moveImage(i, i - 1)} className="p-1.5 bg-white/20 rounded-full hover:bg-white/30" title="Mover izquierda">
                          <GripVertical className="h-4 w-4 text-white" />
                        </button>
                      )}
                      <button onClick={() => removeImage(i)} className="p-1.5 bg-red-600/80 rounded-full hover:bg-red-600" title="Eliminar">
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-5 max-w-lg">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div>
                <p className="text-sm font-medium text-white">Publicada</p>
                <p className="text-xs text-slate-400">Visible en la web pública</p>
              </div>
              <button onClick={() => update('published', !editing.published)}
                className={`w-12 h-7 rounded-full transition-colors relative ${editing.published ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${editing.published ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div>
                <p className="text-sm font-medium text-white">Destacada</p>
                <p className="text-xs text-slate-400">Aparece en la home</p>
              </div>
              <button onClick={() => update('featured', !editing.featured)}
                className={`w-12 h-7 rounded-full transition-colors relative ${editing.featured ? 'bg-amber-500' : 'bg-slate-600'}`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${editing.featured ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <Field label="Estado">
              <AdminSelect value={editing.status} onChange={v => update('status', v)}
                options={[
                  { value: 'active', label: 'Activa' },
                  { value: 'reserved', label: 'Reservada' },
                  { value: 'sold', label: 'Vendida' },
                  { value: 'rented', label: 'Alquilada' },
                ]} placeholder="Seleccionar" />
            </Field>
          </div>
        )}
      </div>

      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Historial de cambios</DialogTitle>
          </DialogHeader>
          {versions.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">No hay versiones anteriores.</p>
          ) : (
            <div className="space-y-3">
              {versions.map(v => (
                <div key={v.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div>
                    <p className="text-sm text-white">{new Date(v.edited_at).toLocaleString('es-ES')}</p>
                    <p className="text-xs text-slate-400">{(v.data_snapshot as any)?.title || 'Sin título'}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => restoreVersion(v)}
                    className="text-blue-400 hover:text-blue-300 gap-1">
                    <RotateCcw className="h-3 w-3" /> Restaurar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
