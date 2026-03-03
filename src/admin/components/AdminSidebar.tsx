import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, UserPlus, Users, CalendarDays,
  UsersRound, LogOut, KeyRound, Home, Inbox, ShieldAlert, PenSquare, Database
} from 'lucide-react';
import logoViancasa from '@/assets/logo-viancasa-transparent.png';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/properties', icon: Building2, label: 'Propiedades' },
  { to: '/admin/reserved', icon: ShieldAlert, label: 'Reservadas' },
  { to: '/admin/property-submissions', icon: Inbox, label: 'Recibidas' },
  { to: '/admin/leads', icon: UserPlus, label: 'Leads' },
  { to: '/admin/clients', icon: Users, label: 'Clientes' },
  { to: '/admin/visits', icon: CalendarDays, label: 'Visitas' },
  { to: '/admin/team', icon: UsersRound, label: 'Equipo' },
  { to: '/admin/property-editor', icon: PenSquare, label: 'Publicar / Editar' },
  { to: '/admin/system', icon: Database, label: 'Sistema' },
];

interface AdminSidebarProps {
  userEmail?: string;
  isAdmin: boolean;
  onSignOut: () => void;
  onUpdatePassword: (pw: string) => Promise<{ error: any }>;
}

export default function AdminSidebar({ userEmail, isAdmin, onSignOut, onUpdatePassword }: AdminSidebarProps) {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  const handlePwChange = async () => {
    if (newPw.length < 6) { setPwMsg('Mínimo 6 caracteres'); return; }
    const { error } = await onUpdatePassword(newPw);
    setPwMsg(error ? error.message : '¡Contraseña actualizada!');
    if (!error) setTimeout(() => { setShowPw(false); setNewPw(''); setPwMsg(''); }, 1500);
  };

  return (
    <>
      <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-slate-800">
          <img src={logoViancasa} alt="VIANCASA" className="h-8 brightness-200" />
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">CRM Interno</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-1">
          <div className="px-3 py-2 text-xs text-slate-500 truncate">{userEmail}</div>
          <div className="px-3 py-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-600/20 text-blue-400">
              {isAdmin ? 'Admin' : 'Agente'}
            </span>
          </div>
          <button
            onClick={() => setShowPw(true)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 w-full transition-colors"
          >
            <KeyRound className="h-4 w-4" /> Cambiar contraseña
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 w-full transition-colors"
          >
            <Home className="h-4 w-4" /> Ir al inicio
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 w-full transition-colors"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      <Dialog open={showPw} onOpenChange={setShowPw}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Cambiar contraseña</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Nueva contraseña"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
            {pwMsg && <p className="text-sm text-blue-400">{pwMsg}</p>}
            <Button onClick={handlePwChange} className="w-full bg-blue-600 hover:bg-blue-700">
              Actualizar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
