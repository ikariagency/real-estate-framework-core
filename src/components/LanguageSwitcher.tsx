import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languages } from '@/i18n/translations';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer';
}

const LanguageSwitcher = ({ variant = 'header' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = languages.find(l => l.code === language)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-sm font-body transition-colors ${
          variant === 'footer'
            ? 'text-muted-foreground hover:text-primary-foreground'
            : 'text-primary-foreground hover:text-primary-foreground/80'
        }`}
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={`absolute z-50 mt-2 w-44 rounded-md border bg-card shadow-lg ${
            variant === 'footer' ? 'bottom-full mb-2' : 'top-full'
          } right-0`}>
            <div className="max-h-64 overflow-y-auto py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setOpen(false); }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm font-body transition-colors hover:bg-muted ${
                    lang.code === language ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
