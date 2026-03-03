import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { propertyTranslations, getPropertyTitle, getPropertyDescription, getPropertyFeatures } from '@/i18n/propertyI18n';
import { usePublishedProperties } from '@/hooks/usePublishedProperties';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bed, Bath, Maximize, MapPin, ArrowLeft,
  CheckCircle2, ChevronLeft, ChevronRight, X,
  Building2, Layers, Car, ArrowUpDown, CalendarDays,
  Phone
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const PropertyDetail = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const pt = propertyTranslations[language];
  const { allProperties, isPublished, isReserved, loading: metaLoading } = usePublishedProperties();

  const property = allProperties.find((p) => p.slug === slug);
  
  const isUnpublished = slug ? !isPublished(slug) : false;
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  // Show loading while meta is being fetched
  if (metaLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
            <div className="h-4 bg-muted rounded w-1/4 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property || isUnpublished) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {pt.notFound}
          </h1>
          <Button onClick={() => navigate('/propiedades')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
            <ArrowLeft className="h-4 w-4" />
            {pt.viewProperties}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const reserved = isReserved(slug!);
  const title = getPropertyTitle(property, language);
  const description = getPropertyDescription(property, language);
  const features = getPropertyFeatures(property, language);
  const operationType = property.type === 'sale' ? pt.sale : pt.rent;
  const defaultMessage = language === 'es' || language === 'cat'
    ? `Hola, me interesa la propiedad "${property.title}" (Ref: ${property.reference}). Me gustaría recibir más información.`
    : `Hello, I'm interested in the property "${property.titleEn}" (Ref: ${property.reference}). I would like to receive more information.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t.contact.success });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const nextImage = () => setCurrentImage((c) => (c + 1) % property.images.length);
  const prevImage = () => setCurrentImage((c) => (c === 0 ? property.images.length - 1 : c - 1));

  const basicChars = [
    { icon: Maximize, label: pt.builtArea, value: `${property.sqm} m²`, show: true },
    { icon: Maximize, label: pt.usefulArea, value: property.sqmUseful ? `${property.sqmUseful} m²` : null, show: !!property.sqmUseful },
    { icon: Bed, label: pt.bedrooms, value: String(property.beds), show: true },
    { icon: Bath, label: pt.bathrooms, value: String(property.baths), show: true },
    { icon: Layers, label: pt.floor, value: property.floor, show: !!property.floor },
    { icon: Building2, label: pt.condition, value: property.status, show: !!property.status },
    { icon: CalendarDays, label: pt.yearBuilt, value: property.yearBuilt ? String(property.yearBuilt) : null, show: !!property.yearBuilt },
  ].filter(c => c.show);

  const equipmentChars = [
    { icon: ArrowUpDown, label: pt.elevator, value: property.elevator ? pt.yes : pt.no, show: property.elevator !== undefined },
    { icon: Car, label: pt.garage, value: property.garage ? pt.yes : pt.no, show: property.garage !== undefined },
  ].filter(c => c.show);

  const energyColors: Record<string, string> = {
    A: 'bg-green-600', B: 'bg-green-500', C: 'bg-lime-500', D: 'bg-yellow-500',
    E: 'bg-orange-400', F: 'bg-orange-500', G: 'bg-red-500',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Gallery */}
      <section className="pt-[72px]">
        <div className="bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {pt.backToProperties}
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="relative rounded-xl overflow-hidden bg-muted aspect-[16/9] md:aspect-[2/1] lg:aspect-[5/2]">
            <img src={property.images[currentImage]} alt={title} className="w-full h-full object-cover cursor-pointer" onClick={() => setFullscreen(true)} loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute bottom-4 right-4 bg-foreground/70 text-card text-xs font-body px-3 py-1.5 rounded-full backdrop-blur-sm">
              {currentImage + 1} / {property.images.length}
            </div>
            {property.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-sm">
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-sm">
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
          </div>

          {property.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImage(i)} className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === currentImage ? 'border-primary shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-0">

              {/* Summary */}
              <div className="pb-10 border-b border-border">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-3 py-1 rounded-full">{operationType}</span>
                  <span className="bg-secondary text-muted-foreground text-xs font-body font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {property.zone}, Madrid
                  </span>
                  <span className="text-xs font-body text-muted-foreground">Ref: {property.reference}</span>
                  {reserved && (
                    <span className="bg-amber-500 text-white text-xs font-body font-bold px-3 py-1 rounded-full uppercase tracking-wide">{pt.reserved}</span>
                  )}
                </div>

                <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">{title}</h1>
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6 sm:mb-8">{property.price}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  <div className="flex items-center gap-3 bg-secondary rounded-lg px-4 py-3">
                    <Maximize className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-display text-lg font-bold text-foreground leading-none">{property.sqm} m²</p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">{pt.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary rounded-lg px-4 py-3">
                    <Bed className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-display text-lg font-bold text-foreground leading-none">{property.beds}</p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">{pt.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary rounded-lg px-4 py-3">
                    <Bath className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-display text-lg font-bold text-foreground leading-none">{property.baths}</p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">{pt.bathrooms}</p>
                    </div>
                  </div>
                  {property.floor && (
                    <div className="flex items-center gap-3 bg-secondary rounded-lg px-4 py-3">
                      <Layers className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-display text-lg font-bold text-foreground leading-none">{property.floor}</p>
                        <p className="text-xs font-body text-muted-foreground mt-0.5">{pt.floor}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Characteristics */}
              <div className="py-10 border-b border-border">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-6">{pt.features}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{pt.basicFeatures}</h3>
                    <div className="space-y-0">
                      {basicChars.map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-2.5">
                            <c.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-body text-sm text-foreground">{c.label}</span>
                          </div>
                          <span className="font-body text-sm font-semibold text-foreground">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{pt.equipment}</h3>
                    <div className="space-y-0">
                      {equipmentChars.map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-2.5">
                            <c.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-body text-sm text-foreground">{c.label}</span>
                          </div>
                          <span className="font-body text-sm font-semibold text-foreground">{c.value}</span>
                        </div>
                      ))}
                    </div>

                    {features.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{pt.extras}</h3>
                        <div className="flex flex-wrap gap-2">
                          {features.map((feat, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-secondary text-foreground text-xs font-body px-3 py-1.5 rounded-full">
                              <CheckCircle2 className="h-3 w-3 text-primary" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {property.energyCert && (
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <h3 className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{pt.energyCert}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-0.5">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter) => (
                          <div key={letter} className={`w-8 h-8 flex items-center justify-center text-xs font-body font-bold rounded-sm transition-all ${letter === property.energyCert ? `${energyColors[letter]} text-card scale-110 shadow-sm` : 'bg-muted text-muted-foreground/40'}`}>
                            {letter}
                          </div>
                        ))}
                      </div>
                      <span className="font-body text-sm text-muted-foreground">
                        {pt.energyConsumption}: <strong className="text-foreground">{property.energyCert}</strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="py-10 border-b border-border">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">{pt.description}</h2>
                <div className="font-body text-muted-foreground leading-7 whitespace-pre-line text-[15px]">{description}</div>
              </div>

              {/* Location */}
              <div className="py-10">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">{pt.location}</h2>
                <div className="bg-secondary rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">{property.zone}</p>
                    <p className="font-body text-sm text-muted-foreground mt-0.5">Madrid, España</p>
                    <p className="font-body text-sm text-muted-foreground mt-2">
                      {pt.propertyLocatedIn} {property.zone}, {pt.soughtAfterArea}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile-only contact form */}
              <div className="lg:hidden pt-6">
                <ContactForm
                  pt={pt}
                  t={t}
                  reference={property.reference}
                  formData={formData}
                  setFormData={setFormData}
                  defaultMessage={defaultMessage}
                  onSubmit={handleSubmit}
                  reserved={reserved}
                />
              </div>
            </div>

            {/* Right Column — Sticky Form */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ContactForm
                  pt={pt}
                  t={t}
                  reference={property.reference}
                  formData={formData}
                  setFormData={setFormData}
                  defaultMessage={defaultMessage}
                  onSubmit={handleSubmit}
                  reserved={reserved}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 lg:hidden">
        <div className="flex items-center justify-between gap-3 container mx-auto">
          <div>
            <p className="font-display text-lg font-bold text-primary leading-none">{property.price}</p>
            <p className="text-xs font-body text-muted-foreground mt-0.5">{property.zone} · {property.sqm} m²</p>
          </div>
          <div className="flex gap-2">
            <a href="tel:+34917263178">
              <Button variant="outline" size="sm" className="border-primary text-primary font-body gap-1.5">
                <Phone className="h-4 w-4" />
                {pt.call}
              </Button>
            </a>
            {!reserved && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body"
                onClick={() => {
                  const el = document.getElementById('mobile-contact-form');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {pt.contact}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setFullscreen(false)}>
          <button onClick={() => setFullscreen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white z-10 transition-colors">
            <X className="h-8 w-8" />
          </button>
          {property.images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
          <img src={property.images[currentImage]} alt={title} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-6 text-white/50 font-body text-sm">
            {currentImage + 1} / {property.images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

/* Contact Form Component */
interface ContactFormProps {
  pt: any;
  t: any;
  reference: string;
  formData: { name: string; phone: string; email: string; message: string };
  setFormData: (data: any) => void;
  defaultMessage: string;
  onSubmit: (e: React.FormEvent) => void;
  reserved?: boolean;
}

const ContactForm = ({ pt, t, reference, formData, setFormData, defaultMessage, onSubmit, reserved }: ContactFormProps) => (
  <div id="mobile-contact-form" className="bg-card rounded-xl border border-border p-6 shadow-sm">
    {reserved ? (
      <div className="text-center py-4">
        <span className="inline-block bg-amber-500 text-white text-sm font-body font-bold px-4 py-2 rounded-full uppercase tracking-wide mb-3">{pt.reserved}</span>
        <p className="font-body text-sm text-muted-foreground">{pt.reserved}</p>
      </div>
    ) : (
      <>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">{pt.requestInfo}</h3>
        <p className="font-body text-xs text-muted-foreground mb-5">Ref: {reference}</p>
        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-body font-medium text-foreground mb-1">{t.contact.name}</label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="font-body h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-body font-medium text-foreground mb-1">{t.contact.phone}</label>
            <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="font-body h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-body font-medium text-foreground mb-1">{t.contact.email}</label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="font-body h-9 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-body font-medium text-foreground mb-1">{t.contact.message}</label>
            <Textarea value={formData.message || defaultMessage} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="font-body text-sm" />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm transition-all duration-200 hover:shadow-lg">
            {pt.contact}
          </Button>
        </form>
      </>
    )}
    <div className="mt-4 pt-4 border-t border-border">
      <a href="tel:+34917263178" className="flex items-center justify-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors">
        <Phone className="h-4 w-4" />
        +34 917 263 178
      </a>
    </div>
  </div>
);

export default PropertyDetail;
