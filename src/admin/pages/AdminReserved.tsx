import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Search, Eye, EyeOff, Star, StarOff, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AdminProp {
  id: string;
  slug: string;
  title: string;
  zone: string;
  price: string;
  type: string;
  images: string[] | null;
  reference: string | null;
  published: boolean | null;
  featured: boolean | null;
  status: string | null;
}

export default function AdminReserved() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [dbProperties, setDbProperties] = useState<AdminProp[]>([]);

  const fetchProps = async () => {
    const { data } = await supabase.from('admin_properties').select('*').eq('status', 'reserved');
    if (data) setDbProperties(data as AdminProp[]);
  };

  useEffect(() => {
    fetchProps();
    const channel = supabase
      .channel('admin_reserved')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_properties' }, () => { fetchProps(); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const toggleField = async (id: string, field: 'published' | 'featured') => {
    const prop = dbProperties.find(p => p.id === id);
    if (!prop) return;
    const newValue = field === 'published' ? !(prop.published ?? true) : !(prop.featured ?? false);
    setDbProperties(prev => prev.map(p => p.id === id ? { ...p, [field]: newValue } : p));
    await supabase.from('admin_properties').update({ [field]: newValue }).eq('id', id);
    toast({ title: `Propiedad ${field === 'published' ? (newValue ? 'publicada' : 'despublicada') : (newValue ? 'destacada' : 'sin destacar')}` });
  };

  const toggleReserved = async (id: string) => {
    const prop = dbProperties.find(p => p.id === id);
    if (!prop) return;
    const newStatus = prop.status === 'reserved' ? 'active' : 'reserved';
    await supabase.from('admin_properties').update({ status: newStatus }).eq('id', id);
    toast({ title: newStatus === 'reserved' ? 'Propiedad reservada' : 'Propiedad disponible' });
    fetchProps();
  };

  const filtered = dbProperties.filter(p => {
    return p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.zone.toLowerCase().includes(search.toLowerCase()) ||
      (p.reference || '').toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Propiedades Reservadas ({filtered.length})</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar por título, zona o referencia..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

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
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-500">No hay propiedades reservadas</td></tr>
              ) : filtered.map(p => {
                const isPublished = p.published ?? true;
                const isFeatured = p.featured ?? false;
                return (
                  <tr key={p.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <img src={p.images?.[0] || '/placeholder.svg'} alt="" className="w-16 h-10 object-cover rounded" />
                    </td>
                    <td className="px-4 py-3 text-white font-medium max-w-[200px] truncate">{p.title}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{p.reference || '-'}</td>
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
                      <button onClick={() => toggleField(p.id, 'published')} className="hover:scale-110 transition-transform" title={isPublished ? 'Despublicar' : 'Publicar'}>
                        {isPublished ? <Eye className="h-4 w-4 text-emerald-400 mx-auto" /> : <EyeOff className="h-4 w-4 text-slate-500 mx-auto" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleField(p.id, 'featured')} className="hover:scale-110 transition-transform" title={isFeatured ? 'Quitar destacado' : 'Destacar'}>
                        {isFeatured ? <Star className="h-4 w-4 text-amber-400 mx-auto fill-amber-400" /> : <StarOff className="h-4 w-4 text-slate-500 mx-auto" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleReserved(p.id)} className="hover:scale-110 transition-transform" title="Marcar disponible">
                        <ShieldAlert className="h-4 w-4 text-amber-400 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
