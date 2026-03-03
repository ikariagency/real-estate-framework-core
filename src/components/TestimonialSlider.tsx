import { useState, memo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos & María López',
    zone: 'Salamanca',
    es: 'VIANCASA nos encontró el piso perfecto en Salamanca. Su conocimiento del barrio y profesionalidad hicieron que todo el proceso fuera sencillo y sin estrés.',
    en: 'VIANCASA found us the perfect apartment in Salamanca. Their knowledge of the neighborhood made the entire process smooth and stress-free.',
  },
  {
    name: 'James & Sarah Thompson',
    zone: 'Chamberí',
    es: 'Como extranjeros buscando vivienda en Madrid, VIANCASA fue nuestro mejor aliado. Trato exquisito y total transparencia en cada paso.',
    en: 'As foreigners looking for a home in Madrid, VIANCASA was our best ally. Exquisite treatment and total transparency every step of the way.',
  },
  {
    name: 'Ana García Fernández',
    zone: 'Retiro',
    es: 'Vendí mi propiedad en Retiro en tiempo récord y al precio que esperaba. El equipo de VIANCASA es excepcional, recomendados al 100%.',
    en: 'I sold my property in Retiro in record time and at the price I expected. The VIANCASA team is exceptional, 100% recommended.',
  },
];

const TestimonialSlider = memo(() => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];
  const text = language === 'es' || language === 'cat' ? t.es : t.en;

  return (
    <div className="max-w-3xl mx-auto text-center px-2">
      <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-primary/30 mx-auto mb-4 sm:mb-6" />
      <blockquote className="text-base sm:text-lg lg:text-xl font-body text-foreground leading-relaxed mb-5 sm:mb-6 italic min-h-[60px] sm:min-h-[80px]">
        "{text}"
      </blockquote>
      <p className="font-display text-sm sm:text-base font-semibold text-foreground">{t.name}</p>
      <p className="text-xs sm:text-sm font-body text-muted-foreground">{t.zone}, Madrid</p>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
});

TestimonialSlider.displayName = 'TestimonialSlider';

export default TestimonialSlider;
