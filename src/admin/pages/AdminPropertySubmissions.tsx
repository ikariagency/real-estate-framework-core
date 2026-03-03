import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Eye, RefreshCw, ArrowRightCircle } from 'lucide-react';

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'rejected'];
const STATUS_LABELS: Record<string, string> = {
  new: 'Nuevo', contacted: 'Contactado', converted: 'Convertido', rejected: 'Rechazado',
};
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-emerald-600/20 text-emerald-400',
  contacted: 'bg-blue-600/20 text-blue-400',
  converted: 'bg-purple-600/20 text-purple-400',
  rejected: 'bg-red-600/20 text-red-400',
};

export default function AdminPropertySubmissions() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [converting, setConverting] = useState(false);

  const fetchSubmissions = async () => {
    const { data } = await supabase
      .from('property_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    setSubmissions(data || []);
  };

  const fetchAgents = async () => {
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');
    if (roles?.length) {
      const ids = roles.map(r => r.user_id);
      const { data: profiles } = await supabase.from('profiles').select('*').in('id', ids);
      setAgents(profiles || []);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchAgents();

    const channel = supabase
      .channel('submissions_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'property_submissions' }, () => {
        fetchSubmissions();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateSubmission = async (id: string, updates: any) => {
    await supabase.from('property_submissions').update(updates).eq('id', id);
    toast({ title: 'Solicitud actualizada' });
    fetchSubmissions();
    if (selected?.id === id) setSelected((prev: any) => ({ ...prev, ...updates }));
  };

  const convertToProperty = async (submission: any) => {
    setConverting(true);
    try {
      // Create a slug from the submission data
      const slug = `submission-${submission.id.slice(0, 8)}`;
      
      // Create properties_meta entry as draft (unpublished)
      await supabase.from('properties_meta').insert({
        property_slug: slug,
        published: false,
        featured: false,
        status: 'draft',
        submission_id: submission.id,
        assigned_agent: submission.assigned_agent,
        internal_notes: `Convertido desde solicitud de ${submission.contact_name}. ${submission.description || ''}`,
      } as any);

      // Update submission status
      await supabase.from('property_submissions').update({ status: 'converted' }).eq('id', submission.id);

      toast({ title: 'Propiedad creada como borrador', description: 'La propiedad se ha creado sin publicar. Edítala desde la sección de propiedades.' });
      fetchSubmissions();
      setSelected(null);
    } catch (e) {
      toast({ title: 'Error al convertir', variant: 'destructive' });
    }
    setConverting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Propiedades Recibidas ({submissions.length})</h1>
        <Button variant="outline" size="sm" onClick={fetchSubmissions} className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <RefreshCw className="h-4 w-4 mr-2" /> Actualizar
        </Button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-left">
                <th className="px-4 py-3">Propietario</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Tipo inmueble</th>
                <th className="px-4 py-3">Ubicación</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Agente</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr key={sub.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{sub.contact_name}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">
                    <div>{sub.contact_email}</div>
                    <div>{sub.contact_phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{sub.property_type || '-'}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">
                    {[sub.zone, sub.city, sub.province].filter(Boolean).join(', ') || '-'}
                  </td>
                  <td className="px-4 py-3 text-white text-xs">
                    {sub.sale_price ? `V: ${sub.sale_price}` : ''}
                    {sub.sale_price && sub.rental_price ? ' / ' : ''}
                    {sub.rental_price ? `A: ${sub.rental_price}` : ''}
                    {!sub.sale_price && !sub.rental_price ? '-' : ''}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={sub.status}
                      onChange={e => updateSubmission(sub.id, { status: e.target.value })}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${STATUS_COLORS[sub.status] || STATUS_COLORS.new}`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={sub.assigned_agent || ''}
                      onChange={e => updateSubmission(sub.id, { assigned_agent: e.target.value || null })}
                      className="bg-slate-700 border border-slate-600 text-white rounded px-2 py-1 text-xs w-28"
                    >
                      <option value="">Sin asignar</option>
                      {agents.map(a => (
                        <option key={a.id} value={a.id}>{a.full_name || a.email}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {new Date(sub.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => setSelected(sub)} className="text-blue-400 hover:text-blue-300">
                      <Eye className="h-4 w-4" />
                    </button>
                    {sub.status !== 'converted' && (
                      <button
                        onClick={() => convertToProperty(sub)}
                        className="text-purple-400 hover:text-purple-300"
                        title="Convertir en propiedad"
                      >
                        <ArrowRightCircle className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-400">No hay solicitudes aún</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solicitud de: {selected?.contact_name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-slate-400">Email:</span> <span className="text-white ml-1">{selected.contact_email}</span></div>
                <div><span className="text-slate-400">Teléfono:</span> <span className="text-white ml-1">{selected.contact_phone}</span></div>
                <div><span className="text-slate-400">Móvil:</span> <span className="text-white ml-1">{selected.contact_mobile || '-'}</span></div>
                <div><span className="text-slate-400">Tipo:</span> <span className="text-white ml-1">{selected.property_type || '-'}</span></div>
                <div><span className="text-slate-400">Provincia:</span> <span className="text-white ml-1">{selected.province || '-'}</span></div>
                <div><span className="text-slate-400">Ciudad:</span> <span className="text-white ml-1">{selected.city || '-'}</span></div>
                <div><span className="text-slate-400">Zona:</span> <span className="text-white ml-1">{selected.zone || '-'}</span></div>
                <div><span className="text-slate-400">Dirección:</span> <span className="text-white ml-1">{selected.address || '-'}</span></div>
                <div><span className="text-slate-400">Habitaciones:</span> <span className="text-white ml-1">{selected.bedrooms ?? '-'}</span></div>
                <div><span className="text-slate-400">Baños:</span> <span className="text-white ml-1">{selected.bathrooms ?? '-'}</span></div>
                <div><span className="text-slate-400">Sup. construida:</span> <span className="text-white ml-1">{selected.built_area ? `${selected.built_area} m²` : '-'}</span></div>
                <div><span className="text-slate-400">Sup. útil:</span> <span className="text-white ml-1">{selected.net_area ? `${selected.net_area} m²` : '-'}</span></div>
                <div><span className="text-slate-400">Precio venta:</span> <span className="text-white ml-1">{selected.sale_price || '-'}</span></div>
                <div><span className="text-slate-400">Precio alquiler:</span> <span className="text-white ml-1">{selected.rental_price || '-'}</span></div>
                <div><span className="text-slate-400">Estado inmueble:</span> <span className="text-white ml-1">{selected.property_condition || '-'}</span></div>
                <div><span className="text-slate-400">Vistas:</span> <span className="text-white ml-1">{selected.views || '-'}</span></div>
              </div>

              {selected.extras?.length > 0 && (
                <div>
                  <span className="text-slate-400 block mb-1">Extras:</span>
                  <div className="flex flex-wrap gap-1">
                    {selected.extras.map((e: string) => (
                      <span key={e} className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">{e}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.description && (
                <div>
                  <span className="text-slate-400">Descripción:</span>
                  <p className="text-white mt-1 whitespace-pre-line">{selected.description}</p>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-1">Notas internas:</span>
                <Textarea
                  value={selected.notes || ''}
                  onChange={e => setSelected((prev: any) => ({ ...prev, notes: e.target.value }))}
                  onBlur={() => updateSubmission(selected.id, { notes: selected.notes })}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              {selected.status !== 'converted' && (
                <Button
                  onClick={() => convertToProperty(selected)}
                  disabled={converting}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ArrowRightCircle className="h-4 w-4 mr-2" />
                  Convertir en propiedad (borrador)
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
