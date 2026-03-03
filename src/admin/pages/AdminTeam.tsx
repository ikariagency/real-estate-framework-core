import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/admin/hooks/useAdminAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Shield, UserCog } from 'lucide-react';

export default function AdminTeam() {
  const { toast } = useToast();
  const { isAdmin } = useAdminAuth();
  const [members, setMembers] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'agent'>('agent');
  const [creating, setCreating] = useState(false);

  const fetchMembers = async () => {
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');
    if (roles?.length) {
      const ids = [...new Set(roles.map(r => r.user_id))];
      const { data: profiles } = await supabase.from('profiles').select('*').in('id', ids);
      const merged = ids.map(id => {
        const profile = profiles?.find(p => p.id === id);
        const userRoles = roles.filter(r => r.user_id === id).map(r => r.role);
        return { id, ...profile, roles: userRoles };
      });
      setMembers(merged);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const createAgent = async () => {
    if (!newEmail || !newPassword || newPassword.length < 6) {
      toast({ title: 'Email y contraseña (mín. 6 chars) requeridos', variant: 'destructive' });
      return;
    }
    setCreating(true);

    // Use edge function to create user
    const { data, error } = await supabase.functions.invoke('create-team-member', {
      body: { email: newEmail, password: newPassword, full_name: newName, role: newRole },
    });

    if (error) {
      toast({ title: 'Error al crear usuario', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Miembro creado correctamente' });
      setShowAdd(false);
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      fetchMembers();
    }
    setCreating(false);
  };

  const removeRole = async (userId: string) => {
    await supabase.from('user_roles').delete().eq('user_id', userId);
    toast({ title: 'Rol eliminado' });
    fetchMembers();
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-20">
        <Shield className="h-12 w-12 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">Solo los administradores pueden gestionar el equipo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Equipo ({members.length})</h1>
        <Button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Nuevo miembro
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <div key={m.id} className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  {(m.full_name || m.email || '?')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{m.full_name || 'Sin nombre'}</p>
                  <p className="text-xs text-slate-400">{m.email}</p>
                </div>
              </div>
              <button onClick={() => removeRole(m.id)} className="text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              {m.roles?.map((r: string) => (
                <span key={r} className={`text-xs px-2 py-1 rounded-full font-medium ${
                  r === 'admin' ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'
                }`}>
                  {r === 'admin' ? 'Administrador' : 'Agente'}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Nuevo miembro del equipo</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nombre completo" value={newName} onChange={e => setNewName(e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
            <Input placeholder="Email *" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
            <Input placeholder="Contraseña *" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
            <select value={newRole} onChange={e => setNewRole(e.target.value as any)} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm">
              <option value="agent">Agente</option>
              <option value="admin">Administrador</option>
            </select>
            <Button onClick={createAgent} disabled={creating} className="w-full bg-blue-600 hover:bg-blue-700">
              {creating ? 'Creando...' : 'Crear miembro'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
