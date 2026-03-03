import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Property } from '@/data/properties';

export function usePublishedProperties() {
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const { data: adminProps } = await supabase
      .from('admin_properties')
      .select('slug,title,title_en,price,zone,type,property_type,rent_category,sqm,sqm_useful,beds,baths,floor,elevator,garage,status,year_built,energy_cert,reference,description_es,description_en,features,features_en,images,plot_size,published,featured,created_at');
    
    if (adminProps) {
      const mapped: Property[] = (adminProps as any[]).map(p => ({
        slug: p.slug,
        image: p.images?.[0] || '/placeholder.svg',
        images: p.images || [],
        price: p.price,
        zone: p.zone,
        sqm: Number(p.sqm) || 0,
        sqmUseful: p.sqm_useful ? Number(p.sqm_useful) : undefined,
        beds: p.beds || 0,
        baths: p.baths || 0,
        title: p.title,
        titleEn: p.title_en || p.title,
        type: p.type as 'sale' | 'rent',
        propertyType: p.property_type?.toLowerCase() as any,
        rentCategory: p.rent_category as any,
        reference: p.reference || '',
        floor: p.floor || undefined,
        elevator: p.elevator || false,
        garage: p.garage || false,
        status: p.status || undefined,
        tag: p.status === 'reserved' ? 'reservado' as const : p.status === 'sold' ? 'vendido' as const : undefined,
        yearBuilt: p.year_built || undefined,
        energyCert: p.energy_cert || 'En trámite',
        descriptionEs: p.description_es || '',
        descriptionEn: p.description_en || '',
        features: p.features || [],
        featuresEn: p.features_en || [],
        plotSize: p.plot_size ? Number(p.plot_size) : undefined,
        _published: p.published,
        _featured: p.featured,
        _dbStatus: p.status,
        _createdAt: p.created_at,
      }));
      setDbProperties(mapped);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel('properties_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_properties' }, () => { fetchAll(); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchAll]);

  const publishedProperties = useMemo(
    () => loading ? [] : dbProperties.filter(p => (p as any)._published !== false),
    [dbProperties, loading]
  );

  const reservedSlugs = useMemo(
    () => new Set(dbProperties.filter(p => (p as any)._dbStatus === 'reserved').map(p => p.slug)),
    [dbProperties]
  );
  
  const soldSlugs = useMemo(
    () => new Set(dbProperties.filter(p => (p as any)._dbStatus === 'sold').map(p => p.slug)),
    [dbProperties]
  );

  const isReserved = useCallback((slug: string) => reservedSlugs.has(slug), [reservedSlugs]);
  const isSold = useCallback((slug: string) => soldSlugs.has(slug), [soldSlugs]);
  
  const isPublished = useCallback((slug: string) => {
    const prop = dbProperties.find(p => p.slug === slug);
    if (prop) return (prop as any)._published !== false;
    return false;
  }, [dbProperties]);

  const getEffectiveTag = useCallback((slug: string): 'reservado' | 'vendido' | undefined => {
    if (reservedSlugs.has(slug)) return 'reservado';
    if (soldSlugs.has(slug)) return 'vendido';
    return undefined;
  }, [reservedSlugs, soldSlugs]);

  return {
    properties: publishedProperties,
    allProperties: dbProperties,
    reservedSlugs,
    soldSlugs,
    loading,
    isReserved,
    isSold,
    isPublished,
    getEffectiveTag,
  };
}
