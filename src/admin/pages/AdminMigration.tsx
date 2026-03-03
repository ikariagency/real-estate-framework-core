import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { properties as staticProperties } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface MigrationLog {
  time: string;
  type: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

interface MigrationStats {
  total: number;
  processed: number;
  inserted: number;
  skipped: number;
  errors: number;
  errorDetails: string[];
}

export default function AdminMigration() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<MigrationLog[]>([]);
  const [stats, setStats] = useState<MigrationStats | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('');
  const [done, setDone] = useState(false);
  const abortRef = useRef(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (type: MigrationLog['type'], message: string) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), type, message }]);
    setTimeout(() => logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const runMigration = async () => {
    setRunning(true);
    setDone(false);
    setLogs([]);
    abortRef.current = false;
    const startTime = Date.now();

    const s: MigrationStats = { total: staticProperties.length, processed: 0, inserted: 0, skipped: 0, errors: 0, errorDetails: [] };
    setStats(s);

    // ─── PHASE 0: PRE-CHECK ───
    setPhase('0️⃣ Pre-check');
    addLog('info', `Total propiedades estáticas: ${staticProperties.length}`);

    // Check for duplicate slugs in static data
    const slugSet = new Set<string>();
    const dupSlugs: string[] = [];
    staticProperties.forEach(p => {
      if (slugSet.has(p.slug)) dupSlugs.push(p.slug);
      slugSet.add(p.slug);
    });
    if (dupSlugs.length > 0) {
      addLog('warn', `⚠️ Slugs duplicados en archivo estático: ${dupSlugs.join(', ')}`);
    } else {
      addLog('success', '✅ Sin slugs duplicados en archivo estático');
    }

    // Check existing DB state
    const { count: dbCount } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true });
    addLog('info', `Propiedades actuales en DB: ${dbCount ?? 0}`);

    // Get existing legacy_ids and slugs to avoid duplicates
    const { data: existingData } = await supabase.from('admin_properties').select('legacy_id, slug');
    const existingLegacyIds = new Set((existingData || []).map((r: any) => r.legacy_id).filter(Boolean));
    const existingSlugs = new Set((existingData || []).map((r: any) => r.slug));
    addLog('info', `Legacy IDs existentes: ${existingLegacyIds.size}, Slugs existentes: ${existingSlugs.size}`);
    addLog('success', '✅ Pre-check completado');

    // ─── PHASE 1: PREPARE DATA ───
    setPhase('1️⃣ Preparando datos');
    addLog('info', 'Normalizando propiedades...');

    const prepared = staticProperties.map(p => {
      // Determine tag-based status
      let dbStatus = 'active';
      if (p.tag === 'reservado') dbStatus = 'reserved';
      else if (p.tag === 'vendido') dbStatus = 'sold';

      return {
        slug: p.slug,
        legacy_id: p.slug, // Use slug as legacy_id since static properties don't have a separate id
        title: p.title,
        title_en: p.titleEn || p.title,
        price: p.price,
        zone: p.zone,
        type: p.type,
        property_type: p.propertyType || null,
        rent_category: p.rentCategory || null,
        sqm: p.sqm || 0,
        sqm_useful: p.sqmUseful || null,
        beds: p.beds || 0,
        baths: p.baths || 0,
        floor: p.floor || null,
        elevator: p.elevator || false,
        garage: p.garage || false,
        year_built: p.yearBuilt || null,
        energy_cert: p.energyCert || 'En trámite',
        reference: p.reference || '',
        description_es: p.descriptionEs || '',
        description_en: p.descriptionEn || '',
        features: p.features || [],
        features_en: p.featuresEn || [],
        images: p.images || [],
        plot_size: p.plotSize || null,
        status: dbStatus,
        published: true,
        featured: false,
      };
    });

    // Validate
    let invalidCount = 0;
    prepared.forEach((p, i) => {
      if (!p.title) { addLog('warn', `⚠️ Prop #${i}: sin título`); invalidCount++; }
      if (!p.price) { addLog('warn', `⚠️ Prop #${i} (${p.slug}): sin precio`); invalidCount++; }
      if (!p.zone) { addLog('warn', `⚠️ Prop #${i} (${p.slug}): sin zona`); invalidCount++; }
    });
    addLog('success', `✅ ${prepared.length} propiedades preparadas (${invalidCount} avisos)`);

    // ─── PHASE 2: BATCH INSERT ───
    setPhase('2️⃣ Migración por lotes');
    const BATCH_SIZE = 100;
    const totalBatches = Math.ceil(prepared.length / BATCH_SIZE);
    addLog('info', `Iniciando migración: ${totalBatches} lotes de ${BATCH_SIZE}`);

    for (let batchIdx = 0; batchIdx < totalBatches; batchIdx++) {
      if (abortRef.current) {
        addLog('error', '❌ Migración abortada por el usuario');
        break;
      }

      const start = batchIdx * BATCH_SIZE;
      const batch = prepared.slice(start, start + BATCH_SIZE);
      addLog('info', `── Lote ${batchIdx + 1}/${totalBatches} (${batch.length} props, índice ${start}-${start + batch.length - 1})`);

      // Filter out already existing
      const toInsert = batch.filter(p => {
        if (existingLegacyIds.has(p.legacy_id)) {
          s.skipped++;
          return false;
        }
        // Handle slug collision
        if (existingSlugs.has(p.slug)) {
          // Generate unique slug
          let counter = 2;
          let newSlug = `${p.slug}-${counter}`;
          while (existingSlugs.has(newSlug)) { counter++; newSlug = `${p.slug}-${counter}`; }
          addLog('warn', `⚠️ Slug colisión: "${p.slug}" → "${newSlug}"`);
          p.slug = newSlug;
        }
        return true;
      });

      if (toInsert.length === 0) {
        addLog('info', `  Lote ${batchIdx + 1}: todas omitidas (ya existen)`);
        s.processed += batch.length;
        setStats({ ...s });
        setProgress(((batchIdx + 1) / totalBatches) * 100);
        continue;
      }

      const { data: insertedData, error } = await supabase.from('admin_properties').insert(toInsert as any).select('slug, legacy_id');

      if (error) {
        addLog('error', `❌ Error lote ${batchIdx + 1}: ${error.message}`);
        // Try one by one
        addLog('info', `  Reintentando individualmente...`);
        for (const prop of toInsert) {
          const { error: singleErr } = await supabase.from('admin_properties').insert(prop as any);
          if (singleErr) {
            s.errors++;
            s.errorDetails.push(`${prop.slug}: ${singleErr.message}`);
            addLog('error', `  ❌ ${prop.slug}: ${singleErr.message}`);
          } else {
            s.inserted++;
            existingSlugs.add(prop.slug);
            existingLegacyIds.add(prop.legacy_id);
          }
        }
      } else {
        s.inserted += (insertedData?.length || toInsert.length);
        toInsert.forEach(p => { existingSlugs.add(p.slug); existingLegacyIds.add(p.legacy_id); });
        addLog('success', `  ✅ Lote ${batchIdx + 1}: ${insertedData?.length || toInsert.length} insertadas`);
      }

      s.processed += batch.length;
      setStats({ ...s });
      setProgress(((batchIdx + 1) / totalBatches) * 100);

      // Post-batch verification
      const { count: currentCount } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true });
      const expectedCount = (dbCount || 0) + s.inserted;
      if (currentCount !== expectedCount) {
        addLog('warn', `⚠️ Conteo post-lote: esperado ${expectedCount}, actual ${currentCount}`);
      }
    }

    // ─── PHASE 3: POST-MIGRATION VERIFICATION ───
    setPhase('3️⃣ Verificación post-migración');
    addLog('info', 'Verificando integridad...');

    const { count: finalCount } = await supabase.from('admin_properties').select('*', { count: 'exact', head: true });
    addLog('info', `Total en DB: ${finalCount}`);

    // Check duplicate slugs
    const { data: slugCheck } = await supabase.from('admin_properties').select('slug');
    const allSlugs = slugCheck?.map((r: any) => r.slug) || [];
    const slugDups = allSlugs.filter((s: string, i: number) => allSlugs.indexOf(s) !== i);
    if (slugDups.length > 0) {
      addLog('error', `❌ Slugs duplicados en DB: ${slugDups.join(', ')}`);
    } else {
      addLog('success', '✅ 0 slugs duplicados en DB');
    }

    // Check duplicate legacy_ids
    const { data: legacyCheck } = await supabase.from('admin_properties').select('legacy_id');
    const allLegacy = (legacyCheck?.map((r: any) => r.legacy_id) || []).filter(Boolean);
    const legacyDups = allLegacy.filter((l: string, i: number) => allLegacy.indexOf(l) !== i);
    if (legacyDups.length > 0) {
      addLog('error', `❌ Legacy IDs duplicados: ${legacyDups.join(', ')}`);
    } else {
      addLog('success', '✅ 0 legacy_id duplicados');
    }

    // Check null images
    const { data: nullImgs } = await supabase.from('admin_properties').select('slug').is('images', null);
    if (nullImgs && nullImgs.length > 0) {
      addLog('warn', `⚠️ ${nullImgs.length} propiedades con images NULL`);
    } else {
      addLog('success', '✅ 0 images null');
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    addLog('success', `\n📊 RESUMEN FINAL:`);
    addLog('info', `  Total procesadas: ${s.processed}`);
    addLog('info', `  Insertadas: ${s.inserted}`);
    addLog('info', `  Omitidas (ya existían): ${s.skipped}`);
    addLog('info', `  Errores: ${s.errors}`);
    addLog('info', `  Tiempo total: ${elapsed}s`);

    if (s.errors === 0 && slugDups.length === 0 && legacyDups.length === 0) {
      addLog('success', '🎉 MIGRACIÓN COMPLETADA EXITOSAMENTE - LISTO PARA ACTIVACIÓN');
      setDone(true);
    } else {
      addLog('warn', '⚠️ Migración completada con advertencias. Revisar antes de activar.');
      setDone(true);
    }

    setStats({ ...s });
    setPhase('Completado');
    setRunning(false);
  };

  const abort = () => { abortRef.current = true; };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">🔄 Migración Masiva de Propiedades</h1>
      <p className="text-muted-foreground">
        Migra las {staticProperties.length} propiedades del archivo estático a la base de datos.
      </p>

      <Card className="p-4 space-y-4">
        <div className="flex gap-3">
          <Button onClick={runMigration} disabled={running} size="lg">
            {running ? '⏳ Migrando...' : '🚀 Iniciar Migración'}
          </Button>
          {running && (
            <Button onClick={abort} variant="destructive" size="lg">
              ⛔ Abortar
            </Button>
          )}
        </div>

        {stats && (
          <div className="space-y-2">
            <div className="flex gap-2 text-sm">
              <Badge variant="outline">Fase: {phase}</Badge>
              <Badge variant="secondary">{stats.processed}/{stats.total}</Badge>
              <Badge className="bg-green-600">{stats.inserted} insertadas</Badge>
              <Badge variant="outline">{stats.skipped} omitidas</Badge>
              {stats.errors > 0 && <Badge variant="destructive">{stats.errors} errores</Badge>}
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        )}
      </Card>

      {/* Log output */}
      <Card className="p-4 max-h-[500px] overflow-y-auto bg-black/95 text-xs font-mono">
        {logs.map((log, i) => (
          <div key={i} className={`py-0.5 ${
            log.type === 'error' ? 'text-red-400' :
            log.type === 'warn' ? 'text-yellow-400' :
            log.type === 'success' ? 'text-green-400' : 'text-gray-300'
          }`}>
            <span className="text-gray-500">[{log.time}]</span> {log.message}
          </div>
        ))}
        <div ref={logsEndRef} />
      </Card>

      {done && (
        <Card className="p-4 border-green-500 bg-green-500/10">
          <p className="font-semibold text-green-600">
            ✅ Migración finalizada. Puedes proceder a la activación (cambio a modo DB-only) cuando estés listo.
          </p>
        </Card>
      )}
    </div>
  );
}
