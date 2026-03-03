import { memo } from 'react';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceBlockProps {
  icon: LucideIcon;
  title: string;
  text: string;
  slug: string;
}

const ServiceBlock = memo(({ icon: Icon, title, text, slug }: ServiceBlockProps) => {
  const { t } = useLanguage();

  return (
    <div className="group p-6 lg:p-8 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">{text}</p>
      <Link to={`/servicios/${slug}`} className="flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:gap-2.5 transition-all">
        {t.services.moreInfo}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
});

ServiceBlock.displayName = 'ServiceBlock';

export default ServiceBlock;
