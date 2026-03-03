import { memo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const MapSection = memo(() => {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-body font-semibold text-primary tracking-widest uppercase mb-3">{t.map.subtitle}</p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.map.title}</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg border border-border mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5!2d-3.6685!3d40.4298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f25c8ee6f87%3A0x0!2sCalle%20de%20Boc%C3%A1ngel%2C%2048%2C%2028028%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VIANCASA ubicación"
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 border border-border">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-sm font-semibold text-foreground">VIANCASA Grupo Inmobiliario</p>
                <p className="font-body text-sm text-muted-foreground">{t.footer.address}</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir//Calle+de+Boc%C3%A1ngel,+48,+28028+Madrid"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="font-body text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                {t.map.directions}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

MapSection.displayName = 'MapSection';

export default MapSection;
