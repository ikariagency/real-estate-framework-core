import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';


const STATUS_OPTIONS = ['scheduled', 'completed', 'cancelled', 'no_show'];
const STATUS_LABELS: Record<string, string> = { scheduled: 'Programada', completed: 'Completada', cancelled: 'Cancelada', no_show: 'No presentado' };
const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-600/20 text-blue-400', completed: 'bg-emerald-600/20 text-emerald-400',
  cancelled: 'bg-slate-600/20 text-slate-400', no_show: 'bg-red-600/20 text-red-400',
};

export default function AdminVisits() {
  const { toast } = useToast();
  const [visits, setVisits] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchVisits = async () => {
    const { data } = await supabase.from('visits').select('*').order('visit_date', { ascending: false });
    setVisits(data || []);
  };

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('id, full_name');
    setClients(data || []);
  };

  const fetchProperties = async () => {
    const { data } = await supabase.from('admin_properties').select('slug, title, reference');
    setAllProperties(data || []);
  };

  useEffect(() => { fetchVisits(); fetchClients(); fetchProperties(); }, []);

  const save = async () => {
    if (!editing.visit_date) { toast({ title: 'Fecha requerida', variant: 'destructive' }); return; }
    const prop = allProperties.find(p => p.slug === editing.property_slug);
    const payload = {
      client_id: editing.client_id || null,
      property_slug: editing.property_slug || null,
      property_title: prop?.title || editing.property_title || null,
      visit_date: editing.visit_date,
      status: editing.status || 'scheduled',
      notes: editing.notes || null,
    };

    if (isNew) {
      await supabase.from('visits').insert(payload);
    } else {
      await supabase.from('visits').update(payload).eq('id', editing.id);
    }
    toast({ title: isNew ? 'Visita creada' : 'Visita actualizada' });
    setEditing(null);
    fetchVisits();
  };

  const remove = async (id: string) => {
    await supabase.from('visits').delete().eq('id', id);
    toast({ title: 'Visita eliminada' });
    fetchVisits();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('visits').update({ status }).eq('id', id);
    fetchVisits();
  };

  const getClientName = (id: string) => clients.find(c => c.id === id)?.full_name || '-';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Visitas ({visits.length})</h1>
        <Button onClick={() => { setEditing({ visit_date: '', property_slug: '', client_id: '', status: 'scheduled', notes: '' }); setIsNew(true); }} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Nueva visita
        </Button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-left">
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Propiedad</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Notas</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {visits.map(v => (
                <tr key={v.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-white">
                    {new Date(v.visit_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{v.client_id ? getClientName(v.client_id) : '-'}</td>
                  <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate">{v.property_title || '-'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={v.status}
                      onChange={e => updateStatus(v.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${STATUS_COLORS[v.status]}`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs max-w-[150px] truncate">{v.notes || '-'}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(v.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {visits.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No hay visitas aún</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Nueva visita' : 'Editar visita'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Fecha y hora *</label>
                <Input type="datetime-local" value={editing.visit_date?.slice(0, 16) || ''} onChange={e => setEditing({ ...editing, visit_date: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Cliente</label>
                <select value={editing.client_id || ''} onChange={e => setEditing({ ...editing, client_id: e.target.value || null })} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm">
                  <option value="">Sin asignar</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Propiedad</label>
                <select value={editing.property_slug || ''} onChange={e => setEditing({ ...editing, property_slug: e.target.value })} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm">
                  <option value="">Seleccionar propiedad</option>
                  {allProperties.map(p => <option key={p.slug} value={p.slug}>{p.title} ({p.reference})</option>)}
                </select>
              </div>
              <Textarea placeholder="Notas" value={editing.notes || ''} onChange={e => setEditing({ ...editing, notes: e.target.value })} className="bg-slate-700 border-slate-600 text-white" rows={3} />
              <Button onClick={save} className="w-full bg-blue-600 hover:bg-blue-700">
                {isNew ? 'Crear visita' : 'Guardar'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
