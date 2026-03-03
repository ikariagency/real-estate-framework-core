import { useLanguage } from '@/i18n/LanguageContext';
import { propertyTranslations } from '@/i18n/propertyI18n';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublishedProperties } from '@/hooks/usePublishedProperties';

const glassInput = "w-full h-10 sm:h-10 rounded-md border border-white/15 bg-white/40 backdrop-blur-sm px-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none";

const SALE_PRICE_OPTIONS = [
  { value: '100000', label: '100.000 €' },
  { value: '200000', label: '200.000 €' },
  { value: '400000', label: '400.000 €' },
  { value: '600000', label: '600.000 €' },
  { value: '800000', label: '800.000 €' },
  { value: '1000000', label: '1.000.000 €' },
  { value: '1500000', label: '1.500.000 €' },
  { value: '2000000', label: '2.000.000 €' },
  { value: '3000000', label: '3.000.000 €' },
];

const RENT_PRICE_OPTIONS = [
  { value: '500', label: '500 €/mes' },
  { value: '800', label: '800 €/mes' },
  { value: '1000', label: '1.000 €/mes' },
  { value: '1500', label: '1.500 €/mes' },
  { value: '2000', label: '2.000 €/mes' },
  { value: '3000', label: '3.000 €/mes' },
  { value: '5000', label: '5.000 €/mes' },
];

const HeroSearch = () => {
  const { t, language } = useLanguage();
  const pt = propertyTranslations[language];
  const navigate = useNavigate();
  const { properties } = usePublishedProperties();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [operation, setOperation] = useState<string>('');
  const [rentType, setRentType] = useState<string>('');
  const [zone, setZone] = useState<string>('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [bedsMin, setBedsMin] = useState<string>('');

  const zones = useMemo(() => [...new Set(properties.map(p => p.zone))].sort(), [properties]);
  const priceOptions = operation === 'rent' ? RENT_PRICE_OPTIONS : SALE_PRICE_OPTIONS;

  const handleOperationChange = (value: string) => {
    setOperation(value);
    setPriceMin('');
    setPriceMax('');
    if (value !== 'rent') setRentType('');
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (operation) params.set('tipo', operation);
    if (operation === 'rent' && rentType) params.set('rentType', rentType);
    if (zone) params.set('zona', zone);
    if (priceMin) params.set('precioMin', priceMin);
    if (priceMax) params.set('precioMax', priceMax);
    if (bedsMin) params.set('habitaciones', bedsMin);
    navigate(`/propiedades?${params.toString()}`);
  };

  const clearFilters = () => {
    setOperation(''); setRentType(''); setZone(''); setPriceMin(''); setPriceMax(''); setBedsMin('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-0">
      <div
        className="rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-white/10"
        style={{
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4">
          <div>
            <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{t.hero.type}</label>
            <select className={glassInput} value={operation} onChange={(e) => handleOperationChange(e.target.value)}>
              <option value="">{t.hero.type}</option>
              <option value="sale">{t.hero.buy}</option>
              <option value="rent">{t.hero.rent}</option>
            </select>
          </div>

          {operation === 'rent' && (
            <div>
              <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{pt.rentType}</label>
              <select className={glassInput} value={rentType} onChange={(e) => setRentType(e.target.value)}>
                <option value="">{pt.allRentals}</option>
                <option value="temporary">{pt.temporary}</option>
                <option value="long_term">{pt.longTerm}</option>
                <option value="room">{pt.rooms}</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{t.hero.zone}</label>
            <select className={glassInput} value={zone} onChange={(e) => setZone(e.target.value)}>
              <option value="">{t.hero.zone}</option>
              {zones.map(z => (<option key={z} value={z}>{z}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{t.hero.priceMin}</label>
            <select className={glassInput} value={priceMin} onChange={(e) => setPriceMin(e.target.value)}>
              <option value="">{t.hero.priceMin}</option>
              {priceOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
          </div>

          <div className={`${operation === 'rent' ? 'hidden lg:hidden' : 'hidden lg:block'}`}>
            <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{t.hero.priceMax}</label>
            <select className={glassInput} value={priceMax} onChange={(e) => setPriceMax(e.target.value)}>
              <option value="">{t.hero.priceMax}</option>
              {priceOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-body gap-2">
              <Search className="h-4 w-4" />
              {t.hero.search}
            </Button>
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1.5 text-sm font-body font-medium text-white/70 hover:text-white transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            {pt.advancedSearch}
          </button>
        </div>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <div>
                <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{pt.minBedrooms}</label>
                <select className={glassInput} value={bedsMin} onChange={(e) => setBedsMin(e.target.value)}>
                  <option value="">{t.hero.bedrooms}</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="lg:hidden">
                <label className="block text-xs font-body font-medium text-white/80 mb-1.5">{t.hero.priceMax}</label>
                <select className={glassInput} value={priceMax} onChange={(e) => setPriceMax(e.target.value)}>
                  <option value="">{t.hero.priceMax}</option>
                  {priceOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-4 justify-end">
              <Button variant="outline" className="font-body text-sm border-white/15 text-white/80 hover:text-white hover:bg-white/10 bg-transparent" onClick={clearFilters}>
                {pt.clearFilters}
              </Button>
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm gap-2">
                <Search className="h-4 w-4" />
                {pt.applyFilters}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSearch;
