
ALTER TABLE public.admin_properties ADD COLUMN IF NOT EXISTS legacy_id text;
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_properties_legacy_id ON public.admin_properties(legacy_id) WHERE legacy_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_properties_slug ON public.admin_properties(slug);
