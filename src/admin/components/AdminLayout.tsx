import { Outlet, Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/admin/hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const { user, loading, signIn, signOut, updatePassword, isAdmin, hasAccess } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={signIn} />;
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-center p-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Acceso denegado</h1>
          <p className="text-slate-400 mb-4">No tienes permisos para acceder a este panel.</p>
          <button onClick={signOut} className="text-blue-400 hover:underline text-sm">Cerrar sesión</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar
        userEmail={user.email}
        isAdmin={isAdmin}
        onSignOut={signOut}
        onUpdatePassword={updatePassword}
      />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
