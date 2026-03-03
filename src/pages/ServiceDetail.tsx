import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/data/services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ServiceDetail = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEs = language === 'es' || language === 'cat';

  const service = services.find((s) => s.slug === slug);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {isEs ? 'Servicio no encontrado' : 'Service not found'}
          </h1>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
            <ArrowLeft className="h-4 w-4" />
            {isEs ? 'Volver al inicio' : 'Back to home'}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const title = isEs ? service.titleEs : service.titleEn;
  const subtitle = isEs ? service.subtitleEs : service.subtitleEn;
  const description = isEs ? service.descriptionEs : service.descriptionEn;
  const steps = isEs ? service.stepsEs : service.stepsEn;
  const benefits = isEs ? service.benefitsEs : service.benefitsEn;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t.contact.success });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center pt-16">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm mb-4 sm:mb-6 transition-colors mx-auto min-h-[44px]">
            <ArrowLeft className="h-4 w-4" />
            {isEs ? 'Volver' : 'Back'}
          </button>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">{title}</h1>
          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="font-body text-muted-foreground leading-relaxed whitespace-pre-line text-base sm:text-lg">
            {description}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Nuestro proceso' : 'Our process'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center p-6">
                <span className="font-display text-5xl font-bold text-primary/15 block mb-2">0{i + 1}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 text-primary/30">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Beneficios' : 'Benefits'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-body text-sm text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.contact.title}</h2>
            <p className="font-body text-muted-foreground">{t.contact.subtitle}</p>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 bg-card rounded-lg border border-border p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.name}</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="font-body" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.phone}</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="font-body" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.email}</label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="font-body" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.message}</label>
              <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="font-body" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base">
              {t.contact.send}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
