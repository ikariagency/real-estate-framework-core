
-- Table for admin-created properties
CREATE TABLE public.admin_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  title_en text,
  type text NOT NULL DEFAULT 'sale',
  property_type text,
  rent_category text,
  price text NOT NULL,
  zone text NOT NULL,
  sqm numeric DEFAULT 0,
  sqm_useful numeric,
  beds integer DEFAULT 0,
  baths integer DEFAULT 0,
  floor text,
  elevator boolean DEFAULT false,
  garage boolean DEFAULT false,
  year_built integer,
  energy_cert text DEFAULT 'En trámite',
  description_es text,
  description_en text,
  features text[] DEFAULT '{}',
  features_en text[] DEFAULT '{}',
  plot_size numeric,
  reference text,
  images text[] DEFAULT '{}',
  published boolean DEFAULT true,
  featured boolean DEFAULT false,
  status text DEFAULT 'active',
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/agent can manage admin_properties"
  ON public.admin_properties FOR ALL
  TO authenticated
  USING (is_admin_or_agent(auth.uid()));

CREATE POLICY "Public can read published admin_properties"
  ON public.admin_properties FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE INDEX idx_admin_properties_published ON public.admin_properties(published);
CREATE INDEX idx_admin_properties_type ON public.admin_properties(type);
CREATE INDEX idx_admin_properties_slug ON public.admin_properties(slug);

-- Table for property version history
CREATE TABLE public.property_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.admin_properties(id) ON DELETE CASCADE,
  data_snapshot jsonb NOT NULL,
  edited_by uuid,
  edited_at timestamptz DEFAULT now()
);

ALTER TABLE public.property_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/agent can manage property_versions"
  ON public.property_versions FOR ALL
  TO authenticated
  USING (is_admin_or_agent(auth.uid()));

-- Storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

CREATE POLICY "Admin/agent can upload property images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-images' AND is_admin_or_agent(auth.uid()));

CREATE POLICY "Admin/agent can delete property images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-images' AND is_admin_or_agent(auth.uid()));

CREATE POLICY "Public can read property images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'property-images');
