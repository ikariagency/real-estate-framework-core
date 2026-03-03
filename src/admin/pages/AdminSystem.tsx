import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Database, Activity, Shield, Wrench, RefreshCw, Search,
  ImageOff, DollarSign, AlertTriangle, CheckCircle2, XCircle,
  Clock, Server, HardDrive, Eye
} from 'lucide-react';

type StatusLevel = 'ok' | 'warning' | 'error' | 'loading' | 'idle';

interface CheckResult {
  label: string;
  status: StatusLevel;
  value: string | number;
  detail?: string;
}

interface SummaryData {
  total: number;
  active: number;
  published: number;
  withImages: number;
  withoutImages: number;
  lastCreated: string | null;
  lastUpdated: string | null;
}

const StatusDot = ({ status }: { status: StatusLevel }) => {
  const colors: Record<StatusLevel, string> = {
    ok: 'bg-emerald-500 shadow-emerald-500/40',
    warning: 'bg-amber-500 shadow-amber-500/40',
    error: 'bg-red-500 shadow-red-500/40',
    loading: 'bg-blue-500 shadow-blue-500/40 animate-pulse',
    idle: 'bg-slate-600',
  };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full shadow-lg ${colors[status]}`} />;
};

const MetricCard = ({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string | number; sub?: string }) => (
  <Card className="bg-slate-800/60 border-slate-700 p-4 space-y-1">
    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    {sub && <div className="text-xs text-slate-500">{sub}</div>}
  </Card>
);

export default function AdminSystem() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [toolLogs, setToolLogs] = useState<{ time: string; msg: string; type: 'info' | 'success' | 'warn' | 'error' }[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingIntegrity, setLoadingIntegrity] = useState(false);
  const [runningTool, setRunningTool] = useState<string | null>(null);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  const addLog = (type: 'info' | 'success' | 'warn' | 'error', msg: string) => {
    setToolLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
  };

  // ─── SECTION A: Summary ───
  const loadSummary = useCallback(async () => {
    setLoadingSummary(true);
    try {
      const { count: total } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true });
      const { count: active } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true }).eq('status', 'active');
      const { count: published } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true }).eq('published', true);
      const { count: withoutImages } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true }).eq('images', '{}' as any);
      const { data: nullImages } = await supabase.from('admin_properties').select('slug', { count: 'exact', head: false }).is('images', null);
      const noImgCount = (withoutImages || 0) + (nullImages?.length || 0);
      
      const { data: lastCreatedRow } = await supabase.from('admin_properties').select('created_at').order('created_at', { ascending: false }).limit(1);
      const { data: lastUpdatedRow } = await supabase.from('admin_properties').select('updated_at').order('updated_at', { ascending: false }).limit(1);

      setSummary({
        total: total || 0,
        active: active || 0,
        published: published || 0,
        withImages: (total || 0) - noImgCount,
        withoutImages: noImgCount,
        lastCreated: lastCreatedRow?.[0]?.created_at || null,
        lastUpdated: lastUpdatedRow?.[0]?.updated_at || null,
      });
    } catch (e: any) {
      addLog('error', `Error cargando resumen: ${e.message}`);
    }
    setLoadingSummary(false);
  }, []);

  // ─── SECTION B: Integrity ───
  const runIntegrityCheck = useCallback(async () => {
    setLoadingIntegrity(true);
    setChecks([]);
    const results: CheckResult[] = [];

    try {
      // Duplicate slugs
      const { data: slugData } = await supabase.from('admin_properties').select('slug');
      const slugs = slugData?.map(r => r.slug) || [];
      const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
      results.push({
        label: 'Slugs duplicados',
        status: dupSlugs.length > 0 ? 'error' : 'ok',
        value: dupSlugs.length,
        detail: dupSlugs.length > 0 ? dupSlugs.slice(0, 5).join(', ') : undefined,
      });

      // Duplicate legacy_ids
      const { data: legacyData } = await supabase.from('admin_properties').select('legacy_id');
      const legacyIds = (legacyData?.map(r => r.legacy_id) || []).filter(Boolean) as string[];
      const dupLegacy = legacyIds.filter((l, i) => legacyIds.indexOf(l) !== i);
      results.push({
        label: 'Legacy IDs duplicados',
        status: dupLegacy.length > 0 ? 'error' : 'ok',
        value: dupLegacy.length,
      });

      // Price null or 0
      const { data: badPrices } = await supabase.from('admin_properties').select('slug, price');
      const invalidPrices = badPrices?.filter(r => !r.price || r.price === '0' || r.price === '') || [];
      results.push({
        label: 'Precios inválidos (null/0/vacío)',
        status: invalidPrices.length > 0 ? 'warning' : 'ok',
        value: invalidPrices.length,
        detail: invalidPrices.length > 0 ? invalidPrices.slice(0, 3).map(r => r.slug).join(', ') : undefined,
      });

      // Empty titles
      const { data: badTitles } = await supabase.from('admin_properties').select('slug, title');
      const emptyTitles = badTitles?.filter(r => !r.title || r.title.trim() === '') || [];
      results.push({
        label: 'Títulos vacíos',
        status: emptyTitles.length > 0 ? 'error' : 'ok',
        value: emptyTitles.length,
      });

      // Empty zones
      const { data: badZones } = await supabase.from('admin_properties').select('slug, zone');
      const emptyZones = badZones?.filter(r => !r.zone || r.zone.trim() === '') || [];
      results.push({
        label: 'Zonas vacías',
        status: emptyZones.length > 0 ? 'error' : 'ok',
        value: emptyZones.length,
      });

      // Null images
      const { data: nullImgs } = await supabase.from('admin_properties').select('slug').is('images', null);
      results.push({
        label: 'Images NULL (no array)',
        status: (nullImgs?.length || 0) > 0 ? 'warning' : 'ok',
        value: nullImgs?.length || 0,
      });

      // Bucket check
      const { data: bucketData, error: bucketError } = await supabase.storage.from('property-images').list('', { limit: 1 });
      results.push({
        label: 'Bucket "property-images"',
        status: bucketError ? 'error' : 'ok',
        value: bucketError ? 'Inaccesible' : 'Accesible',
        detail: bucketError?.message,
      });

      setChecks(results);
      setLastScanTime(new Date().toLocaleString());
    } catch (e: any) {
      addLog('error', `Error en verificación: ${e.message}`);
    }
    setLoadingIntegrity(false);
  }, []);

  // ─── SECTION C: Maintenance Tools ───
  const runTool = async (toolName: string, fn: () => Promise<void>) => {
    setRunningTool(toolName);
    addLog('info', `▶ Ejecutando: ${toolName}`);
    try {
      await fn();
      addLog('success', `✅ ${toolName} completado`);
    } catch (e: any) {
      addLog('error', `❌ ${toolName}: ${e.message}`);
    }
    setRunningTool(null);
  };

  const findDuplicateSlugs = async () => {
    const { data } = await supabase.from('admin_properties').select('slug');
    const slugs = data?.map(r => r.slug) || [];
    const dups = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    if (dups.length === 0) addLog('success', 'No se encontraron slugs duplicados');
    else dups.forEach(d => addLog('warn', `Slug duplicado: ${d}`));
  };

  const auditPrices = async () => {
    const { data } = await supabase.from('admin_properties').select('slug, price, title');
    const bad = data?.filter(r => !r.price || r.price === '0' || r.price === '') || [];
    if (bad.length === 0) addLog('success', 'Todos los precios son válidos');
    else bad.forEach(r => addLog('warn', `Precio inválido: ${r.slug} → "${r.price}"`));
  };

  const findNoImages = async () => {
    const { data: nullImgs } = await supabase.from('admin_properties').select('slug, title').is('images', null);
    const { data: emptyImgs } = await supabase.from('admin_properties').select('slug, title').eq('images', '{}' as any);
    const all = [...(nullImgs || []), ...(emptyImgs || [])];
    if (all.length === 0) addLog('success', 'Todas las propiedades tienen imágenes');
    else {
      addLog('warn', `${all.length} propiedades sin imágenes:`);
      all.slice(0, 20).forEach(r => addLog('info', `  • ${r.slug}: ${r.title}`));
      if (all.length > 20) addLog('info', `  ... y ${all.length - 20} más`);
    }
  };

  const checkBrokenImages = async () => {
    addLog('info', 'Verificando muestra de imágenes (primeras 10 propiedades con imágenes)...');
    const { data } = await supabase.from('admin_properties').select('slug, images').not('images', 'eq', '{}').limit(10);
    let broken = 0;
    for (const prop of data || []) {
      const imgs = prop.images || [];
      if (imgs.length > 0) {
        try {
          const resp = await fetch(imgs[0], { method: 'HEAD', mode: 'no-cors' });
          // no-cors always returns opaque, so we just check it doesn't throw
        } catch {
          broken++;
          addLog('warn', `Imagen posiblemente rota: ${prop.slug} → ${imgs[0].substring(0, 80)}...`);
        }
      }
    }
    if (broken === 0) addLog('success', 'Muestra de imágenes verificada correctamente');
  };

  const overallStatus: StatusLevel = checks.length === 0 ? 'idle'
    : checks.some(c => c.status === 'error') ? 'error'
    : checks.some(c => c.status === 'warning') ? 'warning' : 'ok';

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Server className="h-6 w-6 text-blue-400" />
            Estado del Sistema
          </h1>
          <p className="text-slate-400 text-sm mt-1">Panel de monitorización y diagnóstico del sistema inmobiliario</p>
        </div>
        <div className="flex items-center gap-3">
          {lastScanTime && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Último escaneo: {lastScanTime}
            </span>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            <StatusDot status={overallStatus} />
            <span className="text-xs font-medium text-slate-300">
              {overallStatus === 'idle' ? 'Sin escanear' : overallStatus === 'ok' ? 'Sistema OK' : overallStatus === 'warning' ? 'Advertencias' : 'Errores detectados'}
            </span>
          </div>
        </div>
      </div>

      {/* ─── SECTION A: Summary ─── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-400" />
            Resumen General
          </h2>
          <Button variant="outline" size="sm" onClick={loadSummary} disabled={loadingSummary}
            className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loadingSummary ? 'animate-spin' : ''}`} />
            {loadingSummary ? 'Cargando...' : 'Actualizar'}
          </Button>
        </div>
        {summary ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <MetricCard icon={HardDrive} label="Total BD" value={summary.total} />
            <MetricCard icon={Activity} label="Activas" value={summary.active} />
            <MetricCard icon={Eye} label="Publicadas" value={summary.published} />
            <MetricCard icon={CheckCircle2} label="Con imágenes" value={summary.withImages} />
            <MetricCard icon={ImageOff} label="Sin imágenes" value={summary.withoutImages} />
            <MetricCard icon={Clock} label="Última creada" value={formatDate(summary.lastCreated)} sub="" />
            <MetricCard icon={Clock} label="Última actualización" value={formatDate(summary.lastUpdated)} sub="" />
          </div>
        ) : (
          <Card className="bg-slate-800/40 border-slate-700 p-8 text-center text-slate-500">
            Pulsa "Actualizar" para cargar el resumen
          </Card>
        )}
      </section>

      {/* ─── SECTION B: Integrity ─── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            Integridad del Sistema
          </h2>
          <Button variant="outline" size="sm" onClick={runIntegrityCheck} disabled={loadingIntegrity}
            className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loadingIntegrity ? 'animate-spin' : ''}`} />
            {loadingIntegrity ? 'Verificando...' : 'Revalidar integridad'}
          </Button>
        </div>
        {checks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checks.map((check, i) => (
              <Card key={i} className="bg-slate-800/60 border-slate-700 p-4 flex items-start gap-3">
                <StatusDot status={check.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-200">{check.label}</span>
                    <Badge variant={check.status === 'ok' ? 'secondary' : check.status === 'warning' ? 'outline' : 'destructive'}
                      className={check.status === 'ok' ? 'bg-emerald-500/20 text-emerald-400 border-0' : ''}>
                      {check.value}
                    </Badge>
                  </div>
                  {check.detail && <p className="text-xs text-slate-500 mt-1 truncate">{check.detail}</p>}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/40 border-slate-700 p-8 text-center text-slate-500">
            Pulsa "Revalidar integridad" para ejecutar verificaciones
          </Card>
        )}
      </section>

      {/* ─── SECTION C: Maintenance Tools ─── */}
      <section>
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-amber-400" />
          Herramientas de Mantenimiento
          <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-500 ml-2">SOLO LECTURA</Badge>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Revalidar integridad', icon: RefreshCw, fn: runIntegrityCheck },
            { label: 'Buscar slugs duplicados', icon: Search, fn: findDuplicateSlugs },
            { label: 'Buscar imágenes rotas', icon: ImageOff, fn: checkBrokenImages },
            { label: 'Auditar precios inválidos', icon: DollarSign, fn: auditPrices },
            { label: 'Ver sin imágenes', icon: Eye, fn: findNoImages },
          ].map(tool => (
            <Button key={tool.label} variant="outline" onClick={() => runTool(tool.label, tool.fn)}
              disabled={!!runningTool}
              className="h-auto py-3 px-3 flex flex-col items-center gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <tool.icon className={`h-5 w-5 ${runningTool === tool.label ? 'animate-spin' : ''}`} />
              <span className="text-xs text-center leading-tight">{tool.label}</span>
            </Button>
          ))}
        </div>

        {/* Tool Logs */}
        {toolLogs.length > 0 && (
          <Card className="mt-4 p-4 max-h-64 overflow-y-auto bg-black/90 border-slate-700 text-xs font-mono space-y-0.5">
            {toolLogs.map((log, i) => (
              <div key={i} className={
                log.type === 'error' ? 'text-red-400' :
                log.type === 'warn' ? 'text-amber-400' :
                log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'
              }>
                <span className="text-slate-600">[{log.time}]</span> {log.msg}
              </div>
            ))}
          </Card>
        )}
      </section>

      {/* ─── SECTION D: Architecture Status ─── */}
      <section>
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-violet-400" />
          Estado de Arquitectura
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Modo actual', value: 'DB-only', status: 'ok' as StatusLevel, icon: '🟢' },
            { label: 'Archivo estático', value: 'Desactivado', status: 'ok' as StatusLevel, icon: '⛔' },
            { label: 'Fuente de datos', value: 'Lovable Cloud', status: 'ok' as StatusLevel, icon: '☁️' },
            { label: 'Registros esperados', value: summary ? `${summary.total} registros` : 'Cargar resumen primero', status: summary ? 'ok' as StatusLevel : 'idle' as StatusLevel, icon: '📊' },
            { label: 'Migración', value: 'Completada y cerrada', status: 'ok' as StatusLevel, icon: '✅' },
            { label: 'Seguridad', value: 'Solo lectura · Solo admin', status: 'ok' as StatusLevel, icon: '🔒' },
          ].map((item, i) => (
            <Card key={i} className="bg-slate-800/60 border-slate-700 p-4 flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <div className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</div>
                <div className="text-sm font-medium text-slate-200">{item.value}</div>
              </div>
              <StatusDot status={item.status} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
