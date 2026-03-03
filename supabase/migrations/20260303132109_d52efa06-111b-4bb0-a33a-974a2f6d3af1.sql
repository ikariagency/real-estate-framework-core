CREATE INDEX IF NOT EXISTS idx_properties_meta_published ON public.properties_meta(published);
CREATE INDEX IF NOT EXISTS idx_properties_meta_status ON public.properties_meta(status);
CREATE INDEX IF NOT EXISTS idx_properties_meta_published_status ON public.properties_meta(published, status);