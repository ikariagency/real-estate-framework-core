import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail, AlertCircle, Home } from 'lucide-react';
import logoViancasa from '@/assets/logo-viancasa.png';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<{ error: any }>;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await onLogin(email, password);
    if (error) setError(error.message || 'Credenciales incorrectas');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src={logoViancasa} alt="VIANCASA" className="h-10 mx-auto mb-4 brightness-200" />
            <h1 className="text-xl font-semibold text-white">Panel Interno</h1>
            <p className="text-sm text-slate-400 mt-1">Acceso restringido</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Accediendo...' : 'Acceder'}
            </Button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-full"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
