import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Eye, RefreshCw } from 'lucide-react';

const STATUS_OPTIONS = ['new', 'contacted', 'visiting', 'converted', 'rejected'];
const STATUS_LABELS: Record<string, string> = {
  new: 'Nuevo', contacted: 'Contactado', visiting: 'En visita', converted: 'Convertido', rejected: 'Rechazado',
};
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-emerald-600/20 text-emerald-400',
  contacted: 'bg-blue-600/20 text-blue-400',
  visiting: 'bg-amber-600/20 text-amber-400',
  converted: 'bg-purple-600/20 text-purple-400',
  rejected: 'bg-red-600/20 text-red-400',
};

export default function AdminLeads() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('property_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    setLeads(data || []);
  };

  const fetchAgents = async () => {
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');
    if (roles?.length) {
      const ids = roles.map(r => r.user_id);
      const { data: profiles } = await supabase.from('profiles').select('*').in('id', ids);
      setAgents(profiles || []);
    }
  };

  useEffect(() => { fetchLeads(); fetchAgents(); }, []);

  const updateLead = async (id: string, updates: any) => {
    await supabase.from('property_submissions').update(updates).eq('id', id);
    toast({ title: 'Lead actualizado' });
    fetchLeads();
    if (selected?.id === id) setSelected((prev: any) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Leads ({leads.length})</h1>
        <Button variant="outline" size="sm" onClick={fetchLeads} className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <RefreshCw className="h-4 w-4 mr-2" /> Actualizar
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
                <th className="px-4 py-3">Ubicación</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{lead.contact_name}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">
                    <div>{lead.contact_email}</div>
                    <div>{lead.contact_phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{lead.property_type}</td>
                  <td className="px-4 py-3 text-slate-300">{lead.province} {lead.city && `· ${lead.city}`}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={e => updateLead(lead.id, { status: e.target.value })}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {new Date(lead.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(lead)} className="text-blue-400 hover:text-blue-300">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No hay leads aún</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead: {selected?.contact_name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-slate-400">Email:</span> <span className="text-white ml-1">{selected.contact_email}</span></div>
                <div><span className="text-slate-400">Teléfono:</span> <span className="text-white ml-1">{selected.contact_phone}</span></div>
                <div><span className="text-slate-400">Tipo:</span> <span className="text-white ml-1">{selected.property_type}</span></div>
                <div><span className="text-slate-400">Provincia:</span> <span className="text-white ml-1">{selected.province}</span></div>
                <div><span className="text-slate-400">Dirección:</span> <span className="text-white ml-1">{selected.address}</span></div>
                <div><span className="text-slate-400">Precio venta:</span> <span className="text-white ml-1">{selected.sale_price || '-'}</span></div>
                <div><span className="text-slate-400">Precio alquiler:</span> <span className="text-white ml-1">{selected.rental_price || '-'}</span></div>
              </div>
              {selected.description && (
                <div>
                  <span className="text-slate-400">Descripción:</span>
                  <p className="text-white mt-1">{selected.description}</p>
                </div>
              )}
              <div>
                <span className="text-slate-400 block mb-1">Asignar agente:</span>
                <select
                  value={selected.assigned_agent || ''}
                  onChange={e => updateLead(selected.id, { assigned_agent: e.target.value || null })}
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm w-full"
                >
                  <option value="">Sin asignar</option>
                  {agents.map(a => (
                    <option key={a.id} value={a.id}>{a.full_name || a.email}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Notas internas:</span>
                <Textarea
                  value={selected.notes || ''}
                  onChange={e => setSelected((prev: any) => ({ ...prev, notes: e.target.value }))}
                  onBlur={() => updateLead(selected.id, { notes: selected.notes })}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
