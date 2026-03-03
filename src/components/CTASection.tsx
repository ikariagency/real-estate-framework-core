import { memo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface CTASectionProps {
  variant?: 'default' | 'compact';
}

const CTASection = memo(({ variant = 'default' }: CTASectionProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          const headerOffset = 80;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const el = document.getElementById('contact');
      if (el) {
        const headerOffset = 80;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: 'smooth' });
      }
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-primary py-6 sm:py-8">
        <div className="container mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-base sm:text-lg text-primary-foreground text-center sm:text-left">{t.cta.title}</p>
          <Button
            onClick={scrollToContact}
            className="bg-card text-primary hover:bg-card/90 font-body px-6 transition-all duration-200 hover:shadow-lg min-h-[44px]"
          >
            {t.cta.button}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-primary py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-5 sm:px-6 text-center">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
          {t.cta.title}
        </h2>
        <p className="font-body text-primary-foreground/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
          {t.cta.subtitle}
        </p>
        <Button
          onClick={scrollToContact}
          size="lg"
          className="bg-card text-primary hover:bg-card/90 font-body text-base px-8 transition-all duration-200 hover:shadow-lg min-h-[48px]"
        >
          {t.cta.button}
        </Button>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;

