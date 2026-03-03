import { useState, useMemo, useEffect, useCallback, useRef, memo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { propertyTranslations, getPropertyTitle, getPropertyTypeLabel } from '@/i18n/propertyI18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { usePublishedProperties } from '@/hooks/usePublishedProperties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Home as HomeIcon, LayoutGrid, MapIcon } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyMap = React.lazy(() => import('@/components/PropertyMap'));

const PAGE_SIZE_OPTIONS = [9, 24, 48];

const STORAGE_KEY = 'propertiesFilters';
const SCROLL_KEY = 'propertiesScrollY';

function loadFilters() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveFilters(filters: Record<string, any>) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
}

const Properties = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const pt = propertyTranslations[language];
  const { properties, getEffectiveTag } = usePublishedProperties();

  const saved = useMemo(() => loadFilters(), []);

  // Check if URL has params (from hero search) - those take priority over saved
  const hasUrlParams = searchParams.get('tipo') || searchParams.get('zona') || searchParams.get('precioMin') || searchParams.get('precioMax') || searchParams.get('habitaciones') || searchParams.get('rentType');

  // Filters - restore from sessionStorage or URL params
  const [operation, setOperation] = useState<string>(() => hasUrlParams ? (searchParams.get('tipo') || 'all') : (saved?.operation || 'all'));
  const [rentType, setRentType] = useState<string>(() => hasUrlParams ? (searchParams.get('rentType') || 'all') : (saved?.rentType || 'all'));
  const [propertyType, setPropertyType] = useState<string>(() => saved?.propertyType || 'all');
  const [zone, setZone] = useState<string>(() => hasUrlParams ? (searchParams.get('zona') || 'all') : (saved?.zone || 'all'));
  const [priceMin, setPriceMin] = useState(() => hasUrlParams ? (searchParams.get('precioMin') || '') : (saved?.priceMin || ''));
  const [priceMax, setPriceMax] = useState(() => hasUrlParams ? (searchParams.get('precioMax') || '') : (saved?.priceMax || ''));
  const [bedsMin, setBedsMin] = useState<string>(() => hasUrlParams ? (searchParams.get('habitaciones') || 'all') : (saved?.bedsMin || 'all'));
  const [bathsMin, setBathsMin] = useState<string>(() => saved?.bathsMin || 'all');
  const [sqmMin, setSqmMin] = useState(() => saved?.sqmMin || '');
  const [sqmMax, setSqmMax] = useState(() => saved?.sqmMax || '');
  const [featureFilters, setFeatureFilters] = useState<string[]>(() => saved?.featureFilters || []);
  const [statusFilter, setStatusFilter] = useState<string>(() => saved?.statusFilter || 'all');
  const [sortBy, setSortBy] = useState<string>(() => saved?.sortBy || 'default');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>(() => (saved?.viewMode as 'grid' | 'map') || 'grid');
  const [page, setPage] = useState(() => saved?.page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const v = saved?.itemsPerPage;
    if (v && PAGE_SIZE_OPTIONS.includes(v)) return v;
    return 9;
  });

  // Persist filters on every change
  useEffect(() => {
    saveFilters({ operation, rentType, propertyType, zone, priceMin, priceMax, bedsMin, bathsMin, sqmMin, sqmMax, featureFilters, statusFilter, sortBy, viewMode, page, itemsPerPage });
  }, [operation, rentType, propertyType, zone, priceMin, priceMax, bedsMin, bathsMin, sqmMin, sqmMax, featureFilters, statusFilter, sortBy, viewMode, page, itemsPerPage]);

  // Restore scroll position after render
  const hasRestoredScroll = useRef(false);
  useEffect(() => {
    if (!hasRestoredScroll.current) {
      hasRestoredScroll.current = true;
      const savedScroll = sessionStorage.getItem(SCROLL_KEY);
      if (savedScroll) {
        const y = parseInt(savedScroll);
        // Small delay to let the grid render
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
        });
      }
    }
  }, []);

  // Save scroll position before navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
    // Save on every scroll (debounced via the browser)
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const rt = searchParams.get('rentType');
    if (rt) {
      setRentType(rt);
      if (!searchParams.get('tipo') || searchParams.get('tipo') === 'all') {
        setOperation('rent');
      }
    }
  }, [searchParams]);

  const zones = useMemo(() => [...new Set(properties.map(p => p.zone))].sort(), [properties]);
  const propertyTypes = useMemo(() => {
    const types = new Set<string>();
    properties.forEach(p => { if (p.propertyType) types.add(p.propertyType); });
    return [...types].sort();
  }, [properties]);

  const parsePrice = (priceStr: string): number => parseFloat(priceStr.replace(/[^\d]/g, '')) || 0;

  const filtered = useMemo(() => {
    let result = [...properties];
    if (statusFilter === 'reserved') result = result.filter(p => getTag(p) === 'reservado');
    else if (statusFilter === 'available') result = result.filter(p => !getTag(p) || getTag(p) === undefined);
    if (operation !== 'all') result = result.filter(p => p.type === operation);
    if (operation === 'rent' && rentType !== 'all') {
      const rentTypes = rentType.split(',');
      result = result.filter(p => p.rentCategory && rentTypes.includes(p.rentCategory));
    }
    if (propertyType !== 'all') result = result.filter(p => p.propertyType === propertyType);
    if (zone !== 'all') result = result.filter(p => p.zone === zone);
    if (priceMin) { const min = parseFloat(priceMin); result = result.filter(p => parsePrice(p.price) >= min); }
    if (priceMax) { const max = parseFloat(priceMax); result = result.filter(p => parsePrice(p.price) <= max); }
    if (bedsMin !== 'all') { const min = parseInt(bedsMin); result = result.filter(p => p.beds >= min); }
    if (bathsMin !== 'all') { const min = parseInt(bathsMin); result = result.filter(p => p.baths >= min); }
    if (featureFilters.length > 0) {
      result = result.filter(p => {
        const allFeatures = p.features.map(f => f.toLowerCase());
        return featureFilters.every(ff => {
          if (ff === 'amueblado') return allFeatures.some(f => f.includes('amueblado') || f.includes('muebles'));
          if (ff === 'piscina') return allFeatures.some(f => f.includes('piscina'));
          if (ff === 'parking') return allFeatures.some(f => f.includes('parking') || f.includes('garaje') || f.includes('plaza de garaje'));
          if (ff === 'ascensor') return allFeatures.some(f => f.includes('ascensor'));
          if (ff === 'terraza') return allFeatures.some(f => f.includes('terraza'));
          if (ff === 'urbanizacion') return allFeatures.some(f => f.includes('urbanización') || f.includes('urbanizacion'));
          if (ff === 'obra_nueva') return p.status?.toLowerCase().includes('obra nueva') || p.status?.toLowerCase().includes('a estrenar') || false;
          if (ff === 'vistas') return allFeatures.some(f => f.includes('vistas'));
          return false;
        });
      });
    }
    if (sqmMin) { const min = parseFloat(sqmMin); result = result.filter(p => p.sqm >= min); }
    if (sqmMax) { const max = parseFloat(sqmMax); result = result.filter(p => p.sqm <= max); }
    
    // Sorting
    if (sortBy === 'price-asc') result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === 'price-desc') result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (sortBy === 'sqm-desc') result.sort((a, b) => b.sqm - a.sqm);
    else if (sortBy === 'newest') {
      result.sort((a, b) => {
        const aDate = (a as any)._createdAt || '';
        const bDate = (b as any)._createdAt || '';
        return bDate.localeCompare(aDate);
      });
    }
    else if (sortBy === 'oldest') {
      result.sort((a, b) => {
        const aDate = (a as any)._createdAt || '';
        const bDate = (b as any)._createdAt || '';
        return aDate.localeCompare(bDate);
      });
    }
    return result;
  }, [operation, rentType, propertyType, zone, priceMin, priceMax, bedsMin, bathsMin, featureFilters, sqmMin, sqmMax, sortBy, statusFilter, properties]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const clearFilters = () => {
    setOperation('all'); setRentType('all'); setPropertyType('all'); setZone('all');
    setPriceMin(''); setPriceMax(''); setBedsMin('all'); setBathsMin('all');
    setFeatureFilters([]); setSqmMin(''); setSqmMax(''); setSortBy('default'); setStatusFilter('all'); setPage(1);
  };

  const hasActiveFilters = operation !== 'all' || rentType !== 'all' || propertyType !== 'all' || zone !== 'all' || priceMin || priceMax || bedsMin !== 'all' || bathsMin !== 'all' || featureFilters.length > 0 || sqmMin || sqmMax || statusFilter !== 'all';

  const getTag = (p: { slug: string; tag?: 'vendido' | 'reservado' }) => {
    return getEffectiveTag(p.slug);
  };

  const featureOptions = [
    { key: 'piscina', label: pt.pool },
    { key: 'parking', label: pt.parking },
    { key: 'ascensor', label: pt.elevator },
    { key: 'terraza', label: pt.terrace },
    { key: 'amueblado', label: pt.furnished },
    { key: 'urbanizacion', label: pt.gatedCommunity },
    { key: 'obra_nueva', label: pt.newBuild },
    { key: 'vistas', label: pt.views },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero minimal */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-14 bg-secondary">
        <div className="container mx-auto px-5 sm:px-6">
          <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <HomeIcon className="h-3.5 w-3.5" />
              {pt.home}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{pt.properties}</span>
          </nav>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {pt.propertiesInMadrid}
          </h1>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl">
            {pt.findNext}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-30 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-5 sm:px-6 py-4">
          <div className="flex items-center justify-between lg:hidden mb-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-sm font-body font-medium text-foreground"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {pt.filters}
              {hasActiveFilters && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>
              )}
              {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <span className="text-sm font-body text-muted-foreground">
              {filtered.length} {pt.properties.toLowerCase()}
            </span>
          </div>

          <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 items-end">
              {/* Operation */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.operation}</label>
                <Select value={operation} onValueChange={(v) => { setOperation(v); if (v !== 'rent') setRentType('all'); setPage(1); }}>
                  <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="all">{pt.allOperations}</SelectItem>
                    <SelectItem value="sale">{pt.sale}</SelectItem>
                    <SelectItem value="rent">{pt.rent}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {operation === 'rent' && (
                <div>
                  <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.rentType}</label>
                  <Select value={rentType} onValueChange={(v) => { setRentType(v); setPage(1); }}>
                    <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover border border-border shadow-lg z-50">
                      <SelectItem value="all">{pt.allRentals}</SelectItem>
                      <SelectItem value="temporary">{pt.temporary}</SelectItem>
                      <SelectItem value="long_term">{pt.longTerm}</SelectItem>
                      <SelectItem value="room">{pt.rooms}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.type}</label>
                <Select value={propertyType} onValueChange={(v) => { setPropertyType(v); setPage(1); }}>
                  <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="all">{pt.allTypes}</SelectItem>
                    {propertyTypes.map(t => (
                      <SelectItem key={t} value={t}>{getPropertyTypeLabel(t, language)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.zone}</label>
                <Select value={zone} onValueChange={(v) => { setZone(v); setPage(1); }}>
                  <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="all">{pt.allZones}</SelectItem>
                    {zones.map(z => (<SelectItem key={z} value={z}>{z}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.statusFilter}</label>
                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                  <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="all">{pt.allStatuses}</SelectItem>
                    <SelectItem value="available">{pt.available}</SelectItem>
                    <SelectItem value="reserved">{pt.reserved}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.minPrice}</label>
                <Input type="number" placeholder="0 €" value={priceMin} onChange={(e) => { setPriceMin(e.target.value); setPage(1); }} className="min-h-[44px] font-body text-sm bg-background" />
              </div>

              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.maxPrice}</label>
                <Input type="number" placeholder="∞ €" value={priceMax} onChange={(e) => { setPriceMax(e.target.value); setPage(1); }} className="min-h-[44px] font-body text-sm bg-background" />
              </div>

              <div className="flex gap-2">
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="min-h-[44px] font-body text-sm text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4 mr-1" />
                    {pt.clear}
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <button onClick={() => setAdvancedOpen(!advancedOpen)} className="flex items-center gap-1.5 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors">
                <SlidersHorizontal className="h-4 w-4" />
                {pt.advancedSearch}
                {advancedOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            </div>

            <AnimatePresence>
              {advancedOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
                      <div>
                        <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.bedrooms}</label>
                        <Select value={bedsMin} onValueChange={(v) => { setBedsMin(v); setPage(1); }}>
                          <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-popover border border-border shadow-lg z-50">
                            <SelectItem value="all">{pt.allBedrooms}</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.bathrooms}</label>
                        <Select value={bathsMin} onValueChange={(v) => { setBathsMin(v); setPage(1); }}>
                          <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-popover border border-border shadow-lg z-50">
                            <SelectItem value="all">{pt.allBathrooms}</SelectItem>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.areaFrom}</label>
                        <div className="flex items-center gap-1">
                          <Input type="number" placeholder="0" value={sqmMin} onChange={(e) => { setSqmMin(e.target.value); setPage(1); }} className="min-h-[44px] font-body text-sm bg-background" />
                          <span className="text-xs font-body text-muted-foreground shrink-0">m²</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.areaTo}</label>
                        <div className="flex items-center gap-1">
                          <Input type="number" placeholder="∞" value={sqmMax} onChange={(e) => { setSqmMax(e.target.value); setPage(1); }} className="min-h-[44px] font-body text-sm bg-background" />
                          <span className="text-xs font-body text-muted-foreground shrink-0">m²</span>
                        </div>
                      </div>

                      {operation !== 'rent' && (
                        <div>
                          <label className="block text-xs font-body font-medium text-muted-foreground mb-1">{pt.rentType}</label>
                          <Select value={rentType} onValueChange={(v) => { setRentType(v); if (v !== 'all') setOperation('rent'); setPage(1); }}>
                            <SelectTrigger className="min-h-[44px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-popover border border-border shadow-lg z-50">
                              <SelectItem value="all">{pt.allRentals}</SelectItem>
                              <SelectItem value="temporary">{pt.temporary}</SelectItem>
                              <SelectItem value="long_term">{pt.longTerm}</SelectItem>
                              <SelectItem value="room">{pt.rooms}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {featureOptions.map(feat => {
                        const isActive = featureFilters.includes(feat.key);
                        return (
                          <button
                            key={feat.key}
                            onClick={() => { setFeatureFilters(prev => isActive ? prev.filter(f => f !== feat.key) : [...prev, feat.key]); setPage(1); }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-body font-medium transition-all duration-200 ${
                              isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-primary-foreground border-primary-foreground' : 'border-muted-foreground/40'}`}>
                              {isActive && (
                                <svg className="w-3 h-3 text-primary" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </span>
                            {feat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop counter + sort + view toggle */}
          <div className="hidden lg:flex items-center justify-between mt-4 pt-3 border-t border-border">
            <p className="text-sm font-body text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
              {pt.propertiesFound}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-secondary rounded-md p-0.5 border border-border">
                <button onClick={() => setViewMode('grid')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-body font-medium transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  <LayoutGrid className="h-3.5 w-3.5" />
                  {pt.list}
                </button>
                <button onClick={() => setViewMode('map')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-body font-medium transition-colors ${viewMode === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  <MapIcon className="h-3.5 w-3.5" />
                  {pt.map}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-body text-muted-foreground">{pt.show}</span>
                <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setPage(1); }}>
                  <SelectTrigger className="w-[80px] min-h-[36px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    {PAGE_SIZE_OPTIONS.map(n => (<SelectItem key={n} value={String(n)}>{n}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-body text-muted-foreground">{pt.sort}</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] min-h-[36px] font-body text-sm bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    <SelectItem value="default">{pt.sortDefault}</SelectItem>
                    <SelectItem value="newest">{pt.sortNewest}</SelectItem>
                    <SelectItem value="oldest">{pt.sortOldest}</SelectItem>
                    <SelectItem value="price-asc">{pt.sortPriceAsc}</SelectItem>
                    <SelectItem value="price-desc">{pt.sortPriceDesc}</SelectItem>
                    <SelectItem value="sqm-desc">{pt.sortAreaDesc}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Mobile view toggle + sort */}
          <div className="flex lg:hidden items-center justify-between gap-2 mt-3">
            <div className="flex items-center bg-secondary rounded-md p-0.5 border border-border">
              <button onClick={() => setViewMode('grid')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-body font-medium transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <LayoutGrid className="h-3.5 w-3.5" />
                {pt.list}
              </button>
              <button onClick={() => setViewMode('map')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-body font-medium transition-colors ${viewMode === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <MapIcon className="h-3.5 w-3.5" />
                {pt.map}
              </button>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] min-h-[36px] font-body text-xs bg-background"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50">
                <SelectItem value="default">{pt.sortDefault}</SelectItem>
                <SelectItem value="newest">{pt.sortNewest}</SelectItem>
                <SelectItem value="oldest">{pt.sortOldest}</SelectItem>
                <SelectItem value="price-asc">{pt.sortPriceAsc}</SelectItem>
                <SelectItem value="price-desc">{pt.sortPriceDesc}</SelectItem>
                <SelectItem value="sqm-desc">{pt.sortAreaDesc}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          {viewMode === 'map' ? (
            <React.Suspense fallback={
              <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground font-body text-sm">{pt.loadingMap}</p>
              </div>
            }>
              <PropertyMap properties={filtered} />
            </React.Suspense>
          ) : (
            <>
              {paginated.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {paginated.map((p) => (
                      <PropertyCard
                        key={p.slug}
                        slug={p.slug}
                        image={p.image}
                        price={p.price}
                        zone={p.zone}
                        sqm={p.sqm}
                        beds={p.beds}
                        baths={p.baths}
                        title={getPropertyTitle(p, language)}
                        tag={getTag(p)}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button
                          key={n}
                          onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className={`min-w-[44px] min-h-[44px] rounded-md font-body text-sm font-medium transition-colors ${
                            n === page ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-primary/10'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="font-display text-xl text-foreground mb-2">{pt.noProperties}</p>
                  <p className="font-body text-sm text-muted-foreground mb-6">{pt.adjustFilters}</p>
                  <Button variant="outline" onClick={clearFilters} className="font-body min-h-[44px] border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    {pt.clearFilters}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
