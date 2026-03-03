import { useLanguage } from '@/i18n/LanguageContext';
import { propertyTranslations, getPropertyTitle } from '@/i18n/propertyI18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import CTASection from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Home, ShoppingCart, Key, TrendingUp, Briefcase,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { useState, useMemo, lazy, Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { usePublishedProperties } from '@/hooks/usePublishedProperties';
import { blogPosts } from '@/data/blog';
import OptimizedImage from '@/components/OptimizedImage';

const HeroSearch = lazy(() => import('@/components/HeroSearch'));
const TestimonialSlider = lazy(() => import('@/components/TestimonialSlider'));
const MapSection = lazy(() => import('@/components/MapSection'));
const ServiceBlock = lazy(() => import('@/components/ServiceBlock'));

const teamMembers = [
  { name: 'Elena Martínez', role: 'Directora General', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Javier Rodríguez', role: 'Director Comercial', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Laura Sánchez', role: 'Asesora Inmobiliaria', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Pablo García', role: 'Asesor de Inversión', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
];

const servicesSlugs = ['venta', 'compra', 'alquiler', 'inversion', 'home-staging'];

const Index = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const pt = propertyTranslations[language];
  const { properties, getEffectiveTag: getTag } = usePublishedProperties();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t.contact.success });
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const serviceIcons = [Home, ShoppingCart, Key, TrendingUp, Briefcase];
  const serviceKeys = ['sale', 'purchase', 'rental', 'investment', 'advisory'] as const;

  const saleProperties = useMemo(() => properties.filter(p => p.type === 'sale').slice(0, 6), [properties]);
  const rentProperties = useMemo(() => properties.filter(p => p.type === 'rent').slice(0, 6), [properties]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Madrid luxury real estate"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-16">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-3 sm:mb-6 tracking-tight">
            VIANCASA
          </h1>
          <p className="font-body text-sm sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
            {t.hero.subtitle}
          </p>
          <Suspense fallback={<div className="h-32" />}>
            <HeroSearch />
          </Suspense>
          <button
            onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-white/70 hover:text-white font-body text-sm transition-colors"
          >
            {t.hero.featuredBtn}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Properties for Sale */}
      <section id="properties" className="py-14 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{pt.ourCatalog}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{pt.propertiesForSale}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {saleProperties.map((p) => (
              <PropertyCard key={p.slug} slug={p.slug} image={p.image} price={p.price} zone={p.zone} sqm={p.sqm} beds={p.beds} baths={p.baths} title={getPropertyTitle(p, language)} tag={getTag(p.slug)} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Link to="/propiedades?tipo=sale">
              <Button variant="outline" size="lg" className="font-body text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors min-h-[48px] px-8 gap-2">
                {pt.viewAllSale}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Properties for Rent */}
      <section className="py-14 sm:py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{pt.rental}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{pt.propertiesForRent}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rentProperties.map((p) => (
              <PropertyCard key={p.slug} slug={p.slug} image={p.image} price={p.price} zone={p.zone} sqm={p.sqm} beds={p.beds} baths={p.baths} title={getPropertyTitle(p, language)} tag={getTag(p.slug)} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Link to="/propiedades?tipo=rent">
              <Button variant="outline" size="lg" className="font-body text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors min-h-[48px] px-8 gap-2">
                {pt.viewAllRent}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-14 sm:py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="relative">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90"
                alt="VIANCASA Grupo Inmobiliario"
                className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
                width={800}
                height={600}
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hidden lg:block">
                <span className="font-display text-2xl font-bold">+10</span>
                <span className="font-body text-sm ml-1">{pt.years}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.about.subtitle}</p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">{t.about.title}</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">{t.about.text1}</p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 sm:mb-8">{t.about.text2}</p>
              <Button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    const headerOffset = 80;
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: 'smooth' });
                  }
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2 px-6 transition-all duration-200 hover:shadow-lg min-h-[44px]"
              >
                {t.about.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-14 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.services.subtitle}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.services.title}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            <Suspense fallback={null}>
              {serviceKeys.map((key, i) => (
                <ServiceBlock
                  key={key}
                  icon={serviceIcons[i]}
                  title={t.services[key].title}
                  text={t.services[key].text}
                  slug={servicesSlugs[i]}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      <CTASection variant="compact" />

      {/* Why Us */}
      <section className="py-14 sm:py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.whyUs.subtitle}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.whyUs.title}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {t.whyUs.items.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <p className="font-body text-xs sm:text-sm font-medium text-foreground leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.testimonials.subtitle}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.testimonials.title}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <Suspense fallback={<div className="h-48" />}>
            <TestimonialSlider />
          </Suspense>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 sm:py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.team.subtitle}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.team.title}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden mb-3 sm:mb-4 border-2 border-border group-hover:border-primary transition-colors">
                  <OptimizedImage src={member.image} alt={member.name} className="w-full h-full object-cover" width={128} height={128} />
                </div>
                <h3 className="font-display text-sm sm:text-base font-semibold text-foreground">{member.name}</h3>
                <p className="font-body text-xs sm:text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-14 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.blog.subtitle}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.blog.title}</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {blogPosts.map((post) => {
              const blogIsEs = language === 'es' || language === 'cat';
              return (
                <article key={post.slug} className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="overflow-hidden aspect-[16/10]">
                      <OptimizedImage src={post.image} alt={blogIsEs ? post.titleEs : post.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={250} />
                    </div>
                  </Link>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display text-sm sm:text-base font-semibold text-foreground mb-2 line-clamp-2">
                      {blogIsEs ? post.titleEs : post.titleEn}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      {blogIsEs ? post.excerptEs : post.excerptEn}
                    </p>
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:gap-2.5 transition-all min-h-[44px]">
                      {t.blog.readMore}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />

      {/* Contact */}
      <section id="contact" className="py-14 sm:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.contact.title}</h2>
            <p className="font-body text-sm sm:text-base text-muted-foreground">{t.contact.subtitle}</p>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.name}</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="font-body min-h-[44px]" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.phone}</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="font-body min-h-[44px]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.email}</label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="font-body min-h-[44px]" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{t.contact.message}</label>
              <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} className="font-body" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base min-h-[48px]">
              {t.contact.send}
            </Button>
          </form>
        </div>
      </section>

      {/* Map */}
      <Suspense fallback={<div className="h-96 bg-secondary" />}>
        <MapSection />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Index;
