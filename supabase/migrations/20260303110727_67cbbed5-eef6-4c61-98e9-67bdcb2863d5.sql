
-- Add source column to clients for tracking where the client came from
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';

-- Add operation_type to property_submissions if not exists (for "Publica tu propiedad" form)
-- Already exists per schema, skip

-- Add submission_id to track which submission a property was converted from (in properties_meta)
ALTER TABLE public.properties_meta ADD COLUMN IF NOT EXISTS submission_id uuid REFERENCES public.property_submissions(id) ON DELETE SET NULL;
