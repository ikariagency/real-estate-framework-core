import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Building2, UserPlus, Users, CalendarDays, ShieldAlert, Inbox } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProps: 0, saleProps: 0, rentProps: 0, leads: 0, clients: 0, visits: 0, visitsPending: 0, submissions: 0, reserved: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  const fetchAll = async () => {
    const [totalProps, saleProps, rentProps, leads, clients, visits, visitsPending, submissions, reservedDb] = await Promise.all([
      supabase.from('admin_properties').select('id', { count: 'exact', head: true }),
      supabase.from('admin_properties').select('id', { count: 'exact', head: true }).eq('type', 'sale'),
      supabase.from('admin_properties').select('id', { count: 'exact', head: true }).eq('type', 'rent'),
      supabase.from('property_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('clients').select('id', { count: 'exact', head: true }),
      supabase.from('visits').select('id', { count: 'exact', head: true }),
      supabase.from('visits').select('id', { count: 'exact', head: true }).eq('status', 'scheduled'),
      supabase.from('property_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('admin_properties').select('id', { count: 'exact', head: true }).eq('status', 'reserved'),
    ]);
    setStats({
      totalProps: totalProps.count || 0,
      saleProps: saleProps.count || 0,
      rentProps: rentProps.count || 0,
      leads: leads.count || 0,
      clients: clients.count || 0,
      visits: visits.count || 0,
      visitsPending: visitsPending.count || 0,
      submissions: submissions.count || 0,
      reserved: reservedDb.count || 0,
    });

    const { data } = await supabase
      .from('property_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    setRecentLeads(data || []);
  };

  useEffect(() => {
    fetchAll();
    const channels = [
      supabase.channel('dash_submissions').on('postgres_changes', { event: '*', schema: 'public', table: 'property_submissions' }, fetchAll).subscribe(),
      supabase.channel('dash_clients').on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, fetchAll).subscribe(),
      supabase.channel('dash_visits').on('postgres_changes', { event: '*', schema: 'public', table: 'visits' }, fetchAll).subscribe(),
      supabase.channel('dash_props').on('postgres_changes', { event: '*', schema: 'public', table: 'admin_properties' }, fetchAll).subscribe(),
    ];
    return () => { channels.forEach(ch => supabase.removeChannel(ch)); };
  }, []);

  const cards = [
    { label: 'Propiedades', value: stats.totalProps, sub: `${stats.saleProps} venta · ${stats.rentProps} alquiler`, icon: Building2, color: 'bg-blue-600/20 text-blue-400' },
    { label: 'Solicitudes nuevas', value: stats.submissions, sub: `${stats.leads} totales`, icon: Inbox, color: 'bg-emerald-600/20 text-emerald-400' },
    { label: 'Reservadas', value: stats.reserved, sub: 'Propiedades reservadas', icon: ShieldAlert, color: 'bg-amber-600/20 text-amber-400' },
    { label: 'Clientes', value: stats.clients, sub: 'Registrados', icon: Users, color: 'bg-purple-600/20 text-purple-400' },
    { label: 'Visitas pendientes', value: stats.visitsPending, sub: `${stats.visits} totales`, icon: CalendarDays, color: 'bg-cyan-600/20 text-cyan-400' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-400">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Últimas solicitudes</h2>
        {recentLeads.length === 0 ? (
          <p className="text-slate-400 text-sm">No hay solicitudes aún.</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                <div>
                  <p className="text-sm font-medium text-white">{lead.contact_name}</p>
                  <p className="text-xs text-slate-400">{lead.contact_email} · {lead.property_type}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  lead.status === 'new' ? 'bg-emerald-600/20 text-emerald-400' :
                  lead.status === 'contacted' ? 'bg-blue-600/20 text-blue-400' :
                  lead.status === 'converted' ? 'bg-purple-600/20 text-purple-400' :
                  'bg-slate-600/20 text-slate-400'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
