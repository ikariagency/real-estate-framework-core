import { useState, useEffect, memo, useCallback } from 'react';
import logoViancasa from '@/assets/logo-viancasa-transparent.png';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, Phone, Home, ShoppingCart, Key, TrendingUp, ArrowRight, MapPin, Users, BookOpen, Mail, GraduationCap, Euro, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isEs = language === 'es';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href: string, isRoute?: boolean) => {
    setMenuOpen(false);

    if (isRoute || href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = href.replace('#', '');
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
        }
      }, 300);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    }
  };

  const isTransparent = isHome && !scrolled && !menuOpen;

  const serviceCategories = [
    {
      title: isEs ? 'Comprar' : 'Buy',
      description: isEs ? 'Encuentra tu propiedad ideal en Madrid' : 'Find your ideal property in Madrid',
      icon: ShoppingCart,
      href: '/propiedades?tipo=sale',
      isRoute: true,
    },
    {
      title: isEs ? 'Vender' : 'Sell',
      description: isEs ? 'Maximiza el valor de tu inmueble' : 'Maximize your property value',
      icon: Home,
      href: '/publica-tu-propiedad',
      isRoute: true,
    },
    {
      title: isEs ? 'Alquilar' : 'Rent',
      description: isEs ? 'Gestión integral de alquileres' : 'Comprehensive rental management',
      icon: Key,
      href: '/propiedades?tipo=rent',
      isRoute: true,
    },
    {
      title: isEs ? 'Inversión' : 'Investment',
      description: isEs ? 'Asesoramiento para inversores' : 'Advisory for investors',
      icon: TrendingUp,
      href: '/servicios/inversion',
      isRoute: true,
    },
    {
      title: isEs ? 'Alquiler Estudiantes' : 'Student Rentals',
      description: isEs ? 'Alojamiento para estudiantes en Madrid' : 'Student accommodation in Madrid',
      icon: GraduationCap,
      href: '/alquiler-estudiantes',
      isRoute: true,
    },
    {
      title: isEs ? 'Financiación' : 'Financing',
      description: isEs ? 'Consulta tu hipoteca y financiación' : 'Check your mortgage and financing',
      icon: Euro,
      href: '/financiacion',
      isRoute: true,
    },
  ];

  const quickLinks = [
    { label: isEs ? 'Propiedades' : 'Properties', icon: MapPin, href: '/propiedades', isRoute: true },
    { label: isEs ? 'Alquileres temporales y habitaciones' : 'Temporary rentals & rooms', icon: Clock, href: '/propiedades?tipo=rent&rentType=temporary,room', isRoute: true },
    { label: isEs ? 'Nosotros' : 'About Us', icon: Users, href: '#about' },
    { label: 'Blog', icon: BookOpen, href: '#blog' },
    { label: isEs ? 'Contacto' : 'Contact', icon: Mail, href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as const } },
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-card/95 backdrop-blur-md shadow-md'
      }`}>
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
          {/* Logo */}
          <button onClick={() => handleNav('/', true)} className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm z-10">
            <img
              src={logoViancasa}
              alt="VIANCASA Grupo Inmobiliario"
              className={`h-10 lg:h-12 w-auto object-contain transition-all duration-300 ${
                isTransparent ? 'drop-shadow-md' : ''
              }`}
            />
          </button>

          {/* Right side */}
          <div className="flex items-center gap-3 lg:gap-4">
            <a href="tel:+34917263178" className={`hidden lg:flex items-center gap-1.5 text-sm font-body font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${
              isTransparent ? 'text-white' : 'text-foreground'
            }`}>
              <Phone className="h-4 w-4 text-primary" />
              +34 917 263 178
            </a>
            <Button
              onClick={() => handleNav('#contact')}
              className="hidden lg:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm px-5 transition-all duration-200 hover:shadow-lg"
            >
              {t.nav.letsChat}
            </Button>
            <LanguageSwitcher />
            {/* Menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative z-10 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                menuOpen
                  ? 'bg-muted text-foreground'
                  : isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-foreground hover:bg-muted'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`text-sm font-body font-medium hidden sm:inline ${menuOpen ? 'text-foreground' : ''}`}>
                {menuOpen ? (isEs ? 'Cerrar' : 'Close') : 'Menu'}
              </span>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-card overflow-y-auto"
          >
            <div className="min-h-screen pt-24 pb-12">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="container mx-auto px-4 lg:px-8"
              >
                {/* Services grid */}
                <motion.div variants={itemVariants}>
                  <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    {isEs ? 'Servicios' : 'Services'}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                  {serviceCategories.map((cat) => (
                    <motion.button
                      key={cat.title}
                      variants={itemVariants}
                      onClick={() => handleNav(cat.href, cat.isRoute)}
                      className="group text-left p-5 rounded-xl border border-border/50 hover:border-primary/30 bg-card/50 hover:bg-primary/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <cat.icon className="h-6 w-6 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-body text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                      <ArrowRight className="h-4 w-4 text-primary mt-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </motion.button>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-border/30 mb-10" />

                {/* Bottom section: Quick links + CTA + Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                  {/* Quick links */}
                  <motion.div variants={itemVariants}>
                    <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                      {isEs ? 'Explorar' : 'Explore'}
                    </p>
                    <nav className="flex flex-col gap-1">
                      {quickLinks.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => handleNav(link.href, link.isRoute)}
                          className="group flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg text-foreground hover:bg-muted transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="font-body text-sm font-medium group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </motion.div>

                  {/* Publish CTA */}
                  <motion.div variants={itemVariants}>
                    <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                      {isEs ? 'Propietarios' : 'Owners'}
                    </p>
                    <button
                      onClick={() => handleNav('/publica-tu-propiedad', true)}
                      className="group w-full text-left p-5 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {t.nav.publish}
                      </h3>
                      <p className="text-sm font-body text-muted-foreground mb-3 leading-relaxed">
                        {isEs
                          ? 'Solicita una valoración gratuita y vende tu propiedad con expertos.'
                          : 'Request a free valuation and sell your property with experts.'}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-body font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                        {isEs ? 'Empezar' : 'Get started'}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  </motion.div>

                  {/* Contact info */}
                  <motion.div variants={itemVariants}>
                    <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                      {isEs ? 'Contacto' : 'Contact'}
                    </p>
                    <div className="space-y-4">
                      <a
                        href="tel:+34917263178"
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-body text-sm"
                      >
                        <Phone className="h-4 w-4 text-primary" />
                        +34 917 263 178
                      </a>
                      <a
                        href="mailto:info@viancasa.com"
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-body text-sm"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        info@viancasa.com
                      </a>
                      <div className="flex items-start gap-3 text-muted-foreground font-body text-sm">
                        <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>Calle Bocángel, 48 Local<br />28028 Madrid</span>
                      </div>
                      <div className="pt-2">
                        <Button
                          onClick={() => handleNav('#contact')}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm px-6 transition-all duration-200 hover:shadow-lg w-full sm:w-auto"
                        >
                          {t.nav.letsChat}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
