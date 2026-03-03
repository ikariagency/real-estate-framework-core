import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { GraduationCap, MapPin, Shield, Headphones, Home, CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentRentals = () => {
  const { language } = useLanguage();
  const isEs = language === 'es' || language === 'cat';

  const benefits = [
    {
      icon: Home,
      title: isEs ? 'Alojamiento de Calidad' : 'Quality Accommodation',
      text: isEs
        ? 'Contamos con una amplia selección de apartamentos y habitaciones completamente amuebladas y equipadas para garantizar tu comodidad.'
        : 'We have a wide selection of fully furnished and equipped apartments and rooms to guarantee your comfort.',
    },
    {
      icon: Shield,
      title: isEs ? 'Facilidades de Gestión' : 'Easy Management',
      text: isEs
        ? 'Ofrecemos una plataforma en línea donde podrás gestionar todo lo relacionado con tu alquiler, desde la firma del contrato hasta el pago mensual.'
        : 'We offer an online platform where you can manage everything related to your rental, from contract signing to monthly payments.',
    },
    {
      icon: Headphones,
      title: isEs ? 'Soporte Integral' : 'Full Support',
      text: isEs
        ? 'Nuestro equipo de atención al cliente está disponible para asistirte en cualquier momento, asegurando una experiencia sencilla y agradable.'
        : 'Our customer service team is available to assist you at any time, ensuring a simple and pleasant experience.',
    },
    {
      icon: MapPin,
      title: isEs ? 'Ubicaciones Estratégicas' : 'Strategic Locations',
      text: isEs
        ? 'Nuestras propiedades están situadas cerca de las universidades de Madrid, facilitando tu desplazamiento diario y permitiéndote disfrutar de las mejores zonas.'
        : 'Our properties are located near Madrid universities, making your daily commute easy and letting you enjoy the best areas.',
    },
  ];

  const steps = [
    { num: '01', title: isEs ? 'Cuéntanos tus necesidades' : 'Tell us your needs', text: isEs ? 'Universidad, presupuesto, fechas y preferencias de zona.' : 'University, budget, dates and area preferences.' },
    { num: '02', title: isEs ? 'Te enviamos opciones' : 'We send you options', text: isEs ? 'Seleccionamos propiedades que se adaptan a tu perfil.' : 'We select properties that match your profile.' },
    { num: '03', title: isEs ? 'Visita y elige' : 'Visit and choose', text: isEs ? 'Organizamos visitas presenciales o virtuales.' : 'We arrange in-person or virtual visits.' },
    { num: '04', title: isEs ? 'Firma y disfruta' : 'Sign and enjoy', text: isEs ? 'Gestionamos todo el papeleo para que solo te preocupes de estudiar.' : 'We handle all the paperwork so you can focus on studying.' },
  ];

  const universities = [
    'Universidad Complutense de Madrid',
    'Universidad Politécnica de Madrid',
    'IE University',
    'Universidad Carlos III',
    'Universidad Autónoma de Madrid',
    'ESADE Madrid',
    'Universidad Pontificia Comillas (ICADE)',
    'CEU San Pablo',
  ];

  const scrollToContact = () => {
    const el = document.getElementById('student-contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <GraduationCap className="h-5 w-5" />
              <span className="font-body text-sm font-medium">
                {isEs ? 'Alquiler para Estudiantes' : 'Student Rentals'}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {isEs ? 'Disfruta de la vida de estudiante en Madrid' : 'Enjoy student life in Madrid'}
            </h1>
            <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {isEs
                ? 'VIANCASA te ofrece una oportunidad única de gestionar tu alojamiento de forma fácil, segura y eficiente mientras cursas tus estudios.'
                : 'VIANCASA offers you a unique opportunity to manage your accommodation easily, safely and efficiently while you study.'}
            </p>
            <Button onClick={scrollToContact} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base px-8 py-3 min-h-[48px] gap-2">
              {isEs ? 'Encuentra tu alojamiento' : 'Find your accommodation'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why VIANCASA */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
              {isEs ? 'Ventajas' : 'Benefits'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? '¿Por qué elegir VIANCASA?' : 'Why choose VIANCASA?'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
              {isEs ? 'Cómo funciona' : 'How it works'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Tu alojamiento en 4 pasos' : 'Your accommodation in 4 steps'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-4xl font-bold text-primary/20">{s.num}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
                {isEs ? 'Cerca de tu universidad' : 'Near your university'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {isEs ? 'Propiedades cerca de las principales universidades' : 'Properties near top universities'}
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                {isEs
                  ? 'Disponemos de alojamientos estratégicamente ubicados cerca de las principales universidades y escuelas de negocio de Madrid.'
                  : 'We have accommodations strategically located near the main universities and business schools in Madrid.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {universities.map((u) => (
                  <div key={u} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-body text-sm text-foreground">{u}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                alt={isEs ? 'Estudiantes en Madrid' : 'Students in Madrid'}
                className="rounded-xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-5 py-3 rounded-lg shadow-lg hidden lg:block">
                <span className="font-display text-xl font-bold">+500</span>
                <span className="font-body text-sm ml-1">{isEs ? 'estudiantes alojados' : 'students housed'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA highlight */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            {isEs
              ? 'No pierdas la oportunidad de vivir en un lugar que se adapta a tus necesidades'
              : "Don't miss the opportunity to live in a place that fits your needs"}
          </h2>
          <p className="font-body text-base text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {isEs
              ? 'Enfócate en lo que realmente importa: tu educación. Nosotros nos encargamos de tu alojamiento.'
              : 'Focus on what really matters: your education. We take care of your accommodation.'}
          </p>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-body text-base px-8 min-h-[48px] gap-2"
          >
            {isEs ? 'Contáctanos ahora' : 'Contact us now'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Contact form */}
      <section id="student-contact" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">
              {isEs ? 'Contacto' : 'Contact'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEs ? 'Encuentra tu hogar ideal' : 'Find your ideal home'}
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Nombre' : 'Name'}</label>
                <input className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Universidad' : 'University'}</label>
                <input className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email</label>
                <input type="email" className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Teléfono' : 'Phone'}</label>
                <input className="w-full h-11 rounded-md border border-input bg-background px-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">{isEs ? 'Cuéntanos tus necesidades' : 'Tell us your needs'}</label>
              <textarea rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-base min-h-[48px]">
              {isEs ? 'Enviar solicitud' : 'Send request'}
            </Button>
          </form>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a href="tel:+34917263178" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body text-sm">
              <Phone className="h-4 w-4 text-primary" /> +34 917 263 178
            </a>
            <a href="mailto:info@viancasa.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body text-sm">
              <Mail className="h-4 w-4 text-primary" /> info@viancasa.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentRentals;
