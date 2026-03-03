import { memo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import logoViancasa from '@/assets/logo-viancasa-transparent.png';
import LanguageSwitcher from './LanguageSwitcher';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = memo(() => {
  const { t, language } = useLanguage();
  const isEs = language === 'es' || language === 'cat';
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-foreground text-muted pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <button onClick={() => handleNav('/')} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              <img src={logoViancasa} alt="VIANCASA" className="h-10 w-auto object-contain" />
            </button>
            <p className="font-body text-sm text-muted-foreground mt-3 italic">
              "{t.footer.slogan}"
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/grupoviancasa/' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/viancasa/' },
                { Icon: Facebook, href: 'https://www.facebook.com/viancasa/' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200" aria-label={Icon.displayName}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-card mb-4">{t.footer.links}</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: t.nav.home, href: '/' },
                { label: t.nav.properties, href: '#properties' },
                { label: t.nav.about, href: '#about' },
                { label: t.nav.blog, href: '#blog' },
                { label: t.nav.contact, href: '#contact' },
                { label: t.nav.publish, href: '/publica-tu-propiedad' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm font-body text-muted-foreground hover:text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-card mb-4">{isEs ? 'Servicios' : 'Services'}</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: isEs ? 'Comprar' : 'Buy', href: '/servicios/compra' },
                { label: isEs ? 'Vender' : 'Sell', href: '/servicios/venta' },
                { label: isEs ? 'Alquilar' : 'Rent', href: '/servicios/alquiler' },
                { label: isEs ? 'Inversión' : 'Investment', href: '/servicios/inversion' },
                { label: isEs ? 'Alquiler Estudiantes' : 'Student Rentals', href: '/alquiler-estudiantes' },
                { label: isEs ? 'Financiación' : 'Financing', href: '/financiacion' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm font-body text-muted-foreground hover:text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-card mb-4">{t.footer.contactTitle}</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+34917263178" className="flex items-center gap-2.5 text-sm font-body text-muted-foreground hover:text-primary transition-all duration-200">
                <Phone className="h-4 w-4 shrink-0" />
                +34 917 263 178
              </a>
              <a href="tel:+34638454910" className="flex items-center gap-2.5 text-sm font-body text-muted-foreground hover:text-primary transition-all duration-200">
                <Phone className="h-4 w-4 shrink-0" />
                +34 638 454 910
              </a>
              <a href="mailto:info@viancasa.net" className="flex items-center gap-2.5 text-sm font-body text-muted-foreground hover:text-primary transition-all duration-200">
                <Mail className="h-4 w-4 shrink-0" />
                info@viancasa.net
              </a>
              <div className="flex items-start gap-2.5 text-sm font-body text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                {t.footer.address}
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <h4 className="font-display text-base font-semibold text-card mb-4">Idioma / Language</h4>
            <LanguageSwitcher variant="footer" />
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-6 flex items-center justify-between">
          <p className="text-xs font-body text-muted-foreground">
            © {new Date().getFullYear()} VIANCASA. {t.footer.rights}
          </p>
          <button
            onClick={() => handleNav('/admin')}
            className="text-xs font-body font-medium text-muted-foreground/70 hover:text-primary border border-muted-foreground/30 hover:border-primary px-3 py-1.5 rounded-md transition-all duration-200"
          >
            Panel
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
