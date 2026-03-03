import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Search, Eye, EyeOff, Star, StarOff, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';




interface AdminProp {
  id: string;
  slug: string;
  title: string;
  zone: string;
  price: string;
  type: string;
  property_type: string | null;
  images: string[] | null;
  reference: string | null;
  published: boolean | null;
  featured: boolean | null;
  status: string | null;
  created_at: string | null;
  beds: number | null;
  baths: number | null;
  sqm: number | null;
  rent_category: string | null;
}

type SortOption = 'newest' | 'oldest' | 'price_asc' | 'price_desc';

export default function AdminProperties() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [publishedFilter, setPublishedFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [sort, setSort] = useState<SortOption | ''>('');
  const [dbProperties, setDbProperties] = useState<AdminProp[]>([]);

  const fetchDbProps = async () => {
    const { data } = await supabase.from('admin_properties').select('*').order('created_at', { ascending: false });
    if (data) setDbProperties(data as AdminProp[]);
  };

  useEffect(() => {
    fetchDbProps();

    const channel = supabase
      .channel('admin_properties_all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_properties' }, () => { fetchDbProps(); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // All properties from DB only
  const allProps = useMemo(() => {
    return dbProperties.map(p => ({
      slug: p.slug,
      title: p.title,
      zone: p.zone,
      price: p.price,
      type: p.type,
      propertyType: (p.property_type || '').toLowerCase(),
      image: p.images?.[0] || '/placeholder.svg',
      reference: p.reference || '',
      beds: p.beds || 0,
      baths: p.baths || 0,
      sqm: p.sqm || 0,
      rentCategory: p.rent_category,
      source: 'db' as const,
      createdAt: p.created_at,
      _dbPublished: p.published ?? true,
      _dbFeatured: p.featured ?? false,
      _dbStatus: p.status || 'active',
      _dbId: p.id,
    }));
  }, [dbProperties]);

  // Dynamic zone list
  const zones = useMemo(() => [...new Set(allProps.map(p => p.zone))].sort(), [allProps]);

  const toggleMeta = async (slug: string, field: 'published' | 'featured') => {
    const dbProp = dbProperties.find(p => p.slug === slug);
    if (!dbProp) return;
    const newValue = field === 'published' ? !(dbProp.published ?? true) : !(dbProp.featured ?? false);
    setDbProperties(prev => prev.map(p => p.id === dbProp.id ? { ...p, [field]: newValue } : p));
    await supabase.from('admin_properties').update({ [field]: newValue }).eq('id', dbProp.id);
    toast({ title: `Propiedad ${field === 'published' ? (newValue ? 'publicada' : 'despublicada') : (newValue ? 'destacada' : 'sin destacar')}` });
  };

  const toggleReserved = async (slug: string) => {
    const dbProp = dbProperties.find(p => p.slug === slug);
    if (!dbProp) return;
    const newStatus = dbProp.status === 'reserved' ? 'active' : 'reserved';
    setDbProperties(prev => prev.map(p => p.id === dbProp.id ? { ...p, status: newStatus } : p));
    await supabase.from('admin_properties').update({ status: newStatus }).eq('id', dbProp.id);
    toast({ title: newStatus === 'reserved' ? 'Propiedad reservada' : 'Propiedad disponible' });
  };

  const parsePrice = (price: string) => {
    const num = parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return isNaN(num) ? 0 : num;
  };

  const getIsPublished = (p: typeof allProps[0]) => p._dbPublished ?? true;
  const getIsFeatured = (p: typeof allProps[0]) => p._dbFeatured ?? false;
  const getStatus = (p: typeof allProps[0]) => p._dbStatus || 'active';

  const filtered = useMemo(() => {
    let result = allProps.filter(p => {
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.zone.toLowerCase().includes(search.toLowerCase()) ||
        (p.reference || '').toLowerCase().includes(search.toLowerCase());

      const matchType = typeFilter === 'all' || p.type === typeFilter;

      const matchPropertyType = propertyTypeFilter === 'all' ||
        p.propertyType === propertyTypeFilter.toLowerCase() ||
        (propertyTypeFilter === 'habitacion' && p.rentCategory === 'room');

      const status = getStatus(p);
      const matchStatus = statusFilter === 'all' ||
        (statusFilter === 'available' && status === 'active') ||
        (statusFilter === 'reserved' && status === 'reserved') ||
        (statusFilter === 'sold' && status === 'sold');

      const published = getIsPublished(p);
      const matchPublished = publishedFilter === 'all' ||
        (publishedFilter === 'published' && published) ||
        (publishedFilter === 'unpublished' && !published);

      const matchZone = zoneFilter === 'all' || p.zone === zoneFilter;

      return matchSearch && matchType && matchPropertyType && matchStatus && matchPublished && matchZone;
    });

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case 'newest':
            return (b.createdAt || '').localeCompare(a.createdAt || '');
          case 'oldest':
            return (a.createdAt || '').localeCompare(b.createdAt || '');
          case 'price_desc':
            return parsePrice(b.price) - parsePrice(a.price);
          case 'price_asc':
            return parsePrice(a.price) - parsePrice(b.price);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [allProps, search, typeFilter, propertyTypeFilter, statusFilter, publishedFilter, zoneFilter, sort]);

  const activeFilters = [typeFilter !== 'all', propertyTypeFilter !== 'all', statusFilter !== 'all', publishedFilter !== 'all', zoneFilter !== 'all', sort !== ''].filter(Boolean).length;

  const clearAllFilters = () => {
    setTypeFilter('all'); setPropertyTypeFilter('all'); setStatusFilter('all');
    setPublishedFilter('all'); setZoneFilter('all');
    setSort(''); setSearch('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Propiedades <span className="text-slate-400 text-lg font-normal">({allProps.length})</span>
        </h1>
      </div>

      {/* Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por título, zona o referencia..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>

        {/* Row 1: Operation + Property type chips */}
        <div className="flex flex-wrap gap-2">
          {['all', 'sale', 'rent'].map(v => (
            <button
              key={v}
              onClick={() => setTypeFilter(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === v ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {v === 'all' ? 'Todos' : v === 'sale' ? 'Venta' : 'Alquiler'}
            </button>
          ))}

          <div className="w-px bg-slate-700 mx-1" />

          {[
            { value: 'all', label: 'Tipo: Todos' },
            { value: 'piso', label: 'Pisos' },
            { value: 'casa', label: 'Casas' },
            { value: 'habitacion', label: 'Habitaciones' },
            { value: 'ático', label: 'Áticos' },
            { value: 'duplex', label: 'Dúplex' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPropertyTypeFilter(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                propertyTypeFilter === value ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Row 2: Dropdowns */}
        <div className="flex flex-wrap gap-2">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs">
            <option value="all">Estado: Todos</option>
            <option value="available">Disponibles</option>
            <option value="reserved">Reservados</option>
            <option value="sold">Vendidos</option>
          </select>

          <select value={publishedFilter} onChange={e => setPublishedFilter(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs">
            <option value="all">Visibilidad: Todas</option>
            <option value="published">Publicadas</option>
            <option value="unpublished">No publicadas</option>
          </select>

          <select value={zoneFilter} onChange={e => setZoneFilter(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs">
            <option value="all">Zona: Todas</option>
            {zones.map(z => <option key={z} value={z}>{z}</option>)}
          </select>


          <select value={sort} onChange={e => setSort(e.target.value as SortOption | '')} className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 text-xs">
            <option value="">Ordenar por...</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="price_desc">Precio ↓</option>
            <option value="price_asc">Precio ↑</option>
          </select>

          {activeFilters > 0 && (
            <button onClick={clearAllFilters} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors">
              Limpiar filtros ({activeFilters})
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500">{filtered.length} de {allProps.length} propiedades</p>

      {/* Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-left">
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Zona</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Tipo</th>
                
                <th className="px-4 py-3 text-center">Publicada</th>
                <th className="px-4 py-3 text-center">Destacada</th>
                <th className="px-4 py-3 text-center">Reservado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const published = getIsPublished(p);
                const featured = getIsFeatured(p);
                const reserved = getStatus(p) === 'reserved';
                return (
                  <tr key={p.slug} className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${!published ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-3">
                      <img src={p.image} alt="" className="w-16 h-10 object-cover rounded" />
                    </td>
                    <td className="px-4 py-3 text-white font-medium max-w-[200px] truncate">{p.title}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{p.reference}</td>
                    <td className="px-4 py-3 text-slate-300">{p.zone}</td>
                    <td className="px-4 py-3 text-white font-semibold">{p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.type === 'sale' ? 'bg-blue-600/20 text-blue-400' : 'bg-emerald-600/20 text-emerald-400'
                      }`}>
                        {p.type === 'sale' ? 'Venta' : 'Alquiler'}
                      </span>
                    </td>


                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleMeta(p.slug, 'published')} className="hover:scale-110 transition-transform" title={published ? 'Despublicar' : 'Publicar'}>
                        {published ? <Eye className="h-4 w-4 text-emerald-400 mx-auto" /> : <EyeOff className="h-4 w-4 text-slate-500 mx-auto" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleMeta(p.slug, 'featured')} className="hover:scale-110 transition-transform" title={featured ? 'Quitar destacado' : 'Destacar'}>
                        {featured ? <Star className="h-4 w-4 text-amber-400 mx-auto fill-amber-400" /> : <StarOff className="h-4 w-4 text-slate-500 mx-auto" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleReserved(p.slug)} className="hover:scale-110 transition-transform" title={reserved ? 'Marcar disponible' : 'Marcar reservado'}>
                        {reserved ? <ShieldAlert className="h-4 w-4 text-amber-400 mx-auto" /> : <ShieldCheck className="h-4 w-4 text-slate-500 mx-auto" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-slate-500">
                    No se encontraron propiedades con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
