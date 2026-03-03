import { useLanguage } from '@/i18n/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import PublishPropertyForm from '@/components/PublishPropertyForm';
import {
  ArrowRight, TrendingUp, Users, BarChart3, Shield,
  Megaphone, Handshake, Home, Star, Clock, Award,
  CheckCircle2, ChevronRight, Quote, Phone, MapPin
} from 'lucide-react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08 }
  }),
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className={className}>
      {inView ? children : <div className="opacity-0">{children}</div>}
    </div>
  );
}

const PublishProperty = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: BarChart3, title: t.publish.benefit1Title, text: t.publish.benefit1Text },
    { icon: Megaphone, title: t.publish.benefit2Title, text: t.publish.benefit2Text },
    { icon: Users, title: t.publish.benefit3Title, text: t.publish.benefit3Text },
    { icon: Shield, title: t.publish.benefit4Title, text: t.publish.benefit4Text },
  ];

  const steps = [
    { num: '01', title: t.publish.step1Title, text: t.publish.step1Text },
    { num: '02', title: t.publish.step2Title, text: t.publish.step2Text },
    { num: '03', title: t.publish.step3Title, text: t.publish.step3Text },
    { num: '04', title: t.publish.step4Title, text: t.publish.step4Text },
  ];

  const whyUs = [
    { icon: Award, value: '10+', label: t.publishPage?.whyYears || 'Años de experiencia' },
    { icon: Home, value: '600+', label: t.publishPage?.whyProperties || 'Propiedades gestionadas' },
    { icon: Handshake, value: '98%', label: t.publishPage?.whySatisfaction || 'Satisfacción del cliente' },
    { icon: Clock, value: '<45', label: t.publishPage?.whyDays || 'Días tiempo medio de venta' },
  ];

  const ownerTestimonials = [
    {
      name: 'Miguel Ángel R.',
      zone: 'Salamanca',
      text: t.publishPage?.testimonial1 || 'Vendimos nuestro piso en Salamanca en menos de un mes. VIANCASA gestionó todo de forma impecable, desde la valoración hasta el cierre.',
      rating: 5,
    },
    {
      name: 'Pilar & Enrique G.',
      zone: 'Chamberí',
      text: t.publishPage?.testimonial2 || 'El equipo de VIANCASA nos consiguió un precio por encima de lo esperado. Su estrategia de marketing premium marcó la diferencia.',
      rating: 5,
    },
    {
      name: 'Laura Sánchez M.',
      zone: 'Retiro',
      text: t.publishPage?.testimonial3 || 'Profesionalidad absoluta. Me acompañaron durante todo el proceso y resolvieron cada duda al instante. 100% recomendados.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/55 to-foreground/85" />
        <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-4 sm:mb-6 leading-tight"
          >
            {t.publish.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-body text-base sm:text-lg lg:text-xl text-card/80 max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            {t.publish.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              onClick={() => document.getElementById('publish-form')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base px-8 gap-2 min-h-[48px] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.publish.heroCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US — STATS ═══════ */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {whyUs.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-primary-foreground/70 mx-auto mb-3" />
                  <div className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-primary-foreground/80 leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ BENEFITS ═══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t.publish.benefitsTitle}
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </motion.div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <b.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS STEPS ═══════ */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t.publish.processTitle}
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </motion.div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative text-center p-6"
              >
                <span className="font-display text-5xl font-bold text-primary/15 block mb-2">{step.num}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 text-primary/30">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ OWNER TESTIMONIALS ═══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t.publishPage?.testimonialsTitle || 'Propietarios que ya confiaron en nosotros'}
              </h2>
              <p className="font-body text-muted-foreground max-w-xl mx-auto">
                {t.publishPage?.testimonialsSubtitle || 'Resultados reales de propietarios en Madrid'}
              </p>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </motion.div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {ownerTestimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-card rounded-lg border border-border p-8 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <Quote className="h-8 w-8 text-primary/25 mb-4 shrink-0" />
                <p className="font-body text-sm text-foreground leading-relaxed italic flex-1 mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-display text-sm font-semibold text-foreground">{testimonial.name}</p>
                <p className="font-body text-xs text-muted-foreground">{testimonial.zone}, Madrid</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FORM ═══════ */}
      <section id="publish-form" className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t.publish.formTitle}
              </h2>
              <p className="font-body text-muted-foreground max-w-xl mx-auto">
                {t.publish.formSubtitle}
              </p>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </motion.div>
          </AnimatedSection>
          <PublishPropertyForm />
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-20 lg:py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-card mb-4">
                {t.publishPage?.ctaTitle || '¿Listo para vender su propiedad al mejor precio?'}
              </h2>
              <p className="font-body text-card/70 max-w-xl mx-auto mb-8">
                {t.publishPage?.ctaSubtitle || 'Contacte con nuestro equipo y reciba una valoración gratuita sin compromiso.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => document.getElementById('publish-form')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base px-8 gap-2 min-h-[48px]"
                >
                  {t.publish.heroCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <a
                  href="tel:+34917263178"
                  className="flex items-center gap-2 font-body text-card/80 hover:text-card transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  +34 917 263 178
                </a>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublishProperty;
