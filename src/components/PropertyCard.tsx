import { useLanguage } from '@/i18n/LanguageContext';
import { propertyTranslations } from '@/i18n/propertyI18n';
import { Bed, Bath, Maximize } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import OptimizedImage from './OptimizedImage';

interface PropertyCardProps {
  image: string;
  price: string;
  zone: string;
  sqm: number;
  beds: number;
  baths: number;
  title: string;
  slug: string;
  tag?: 'vendido' | 'reservado';
}

const PropertyCard = memo(({ image, price, zone, sqm, beds, baths, title, slug, tag }: PropertyCardProps) => {
  const { t, language } = useLanguage();
  const pt = propertyTranslations[language];

  const tagLabel = tag === 'vendido' ? pt.sold : tag === 'reservado' ? pt.reserved : null;
  const tagColor = tag === 'vendido' ? 'bg-destructive text-destructive-foreground' : 'bg-amber-500 text-white';

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
      <Link to={`/propiedad/${slug}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <OptimizedImage
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-sm font-body font-semibold px-3 py-1 rounded">
            {price}
          </div>
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-body font-medium px-2.5 py-1 rounded">
            {zone}
          </div>
          {tagLabel && (
            <div className={`absolute bottom-3 left-3 text-xs font-body font-bold px-3 py-1 rounded uppercase tracking-wide ${tagColor}`}>
              {tagLabel}
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-1">{title}</h3>

        <div className="flex items-center gap-4 text-muted-foreground text-sm font-body mb-4">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4" />
            {sqm} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" />
            {beds} {t.properties.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" />
            {baths} {t.properties.baths}
          </span>
        </div>

        <Link to={`/propiedad/${slug}`}>
          <Button variant="outline" className="w-full font-body text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            {t.properties.viewDetails}
          </Button>
        </Link>
      </div>
    </div>
  );
});

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;
