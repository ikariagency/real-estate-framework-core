import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const CLIENT_TYPES = ['buyer', 'seller', 'tenant', 'landlord'];
const TYPE_LABELS: Record<string, string> = { buyer: 'Comprador', seller: 'Vendedor', tenant: 'Inquilino', landlord: 'Propietario' };

const emptyClient = { full_name: '', email: '', phone: '', client_type: 'buyer', status: 'active', budget_min: '', budget_max: '', preferred_zones: '', notes: '' };

export default function AdminClients() {
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    setClients(data || []);
  };

  useEffect(() => { fetchClients(); }, []);

  const save = async () => {
    if (!editing.full_name.trim()) { toast({ title: 'Nombre requerido', variant: 'destructive' }); return; }
    const payload = {
      full_name: editing.full_name,
      email: editing.email || null,
      phone: editing.phone || null,
      client_type: editing.client_type,
      status: editing.status,
      budget_min: editing.budget_min ? Number(editing.budget_min) : null,
      budget_max: editing.budget_max ? Number(editing.budget_max) : null,
      preferred_zones: editing.preferred_zones || null,
      notes: editing.notes || null,
    };

    if (isNew) {
      await supabase.from('clients').insert(payload);
    } else {
      await supabase.from('clients').update(payload).eq('id', editing.id);
    }
    toast({ title: isNew ? 'Cliente creado' : 'Cliente actualizado' });
    setEditing(null);
    fetchClients();
  };

  const remove = async (id: string) => {
    await supabase.from('clients').delete().eq('id', id);
    toast({ title: 'Cliente eliminado' });
    fetchClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Clientes ({clients.length})</h1>
        <Button onClick={() => { setEditing({ ...emptyClient }); setIsNew(true); }} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Nuevo cliente
        </Button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-left">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Presupuesto</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{c.full_name}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">
                    <div>{c.email || '-'}</div>
                    <div>{c.phone || '-'}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{TYPE_LABELS[c.client_type] || c.client_type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      c.status === 'active' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-600/20 text-slate-400'
                    }`}>
                      {c.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-xs">
                    {c.budget_min || c.budget_max ? `${c.budget_min || '?'}€ - ${c.budget_max || '?'}€` : '-'}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => { setEditing(c); setIsNew(false); }} className="text-blue-400 hover:text-blue-300">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => remove(c.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No hay clientes aún</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Nuevo cliente' : 'Editar cliente'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Input placeholder="Nombre completo *" value={editing.full_name} onChange={e => setEditing({ ...editing, full_name: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
              <Input placeholder="Email" value={editing.email || ''} onChange={e => setEditing({ ...editing, email: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
              <Input placeholder="Teléfono" value={editing.phone || ''} onChange={e => setEditing({ ...editing, phone: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
              <select value={editing.client_type} onChange={e => setEditing({ ...editing, client_type: e.target.value })} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm">
                {CLIENT_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <Input type="number" placeholder="Presupuesto mín" value={editing.budget_min || ''} onChange={e => setEditing({ ...editing, budget_min: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
                <Input type="number" placeholder="Presupuesto máx" value={editing.budget_max || ''} onChange={e => setEditing({ ...editing, budget_max: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <Input placeholder="Zonas preferidas" value={editing.preferred_zones || ''} onChange={e => setEditing({ ...editing, preferred_zones: e.target.value })} className="bg-slate-700 border-slate-600 text-white" />
              <Textarea placeholder="Notas internas" value={editing.notes || ''} onChange={e => setEditing({ ...editing, notes: e.target.value })} className="bg-slate-700 border-slate-600 text-white" rows={3} />
              <Button onClick={save} className="w-full bg-blue-600 hover:bg-blue-700">
                {isNew ? 'Crear cliente' : 'Guardar cambios'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
