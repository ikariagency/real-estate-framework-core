
-- Create roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'agent');

-- User roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Property submissions (leads from publish form)
CREATE TABLE public.property_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text,
  contact_email text,
  contact_phone text,
  contact_mobile text,
  property_type text,
  operation_type text,
  province text,
  city text,
  zone text,
  postal_code text,
  address text,
  address_number text,
  floor text,
  door text,
  bedrooms int,
  double_bedrooms int,
  bathrooms int,
  toilets int,
  net_area numeric,
  built_area numeric,
  plot_area numeric,
  property_condition text,
  interior_carpentry text,
  exterior_carpentry text,
  views text,
  description text,
  sale_price text,
  rental_price text,
  community_fees text,
  community_included boolean DEFAULT false,
  option_to_buy boolean DEFAULT false,
  extras text[],
  photos text[],
  status text DEFAULT 'new',
  assigned_agent uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.property_submissions ENABLE ROW LEVEL SECURITY;

-- Clients table
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  phone text,
  client_type text DEFAULT 'buyer',
  status text DEFAULT 'active',
  budget_min numeric,
  budget_max numeric,
  preferred_zones text,
  notes text,
  assigned_agent uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Visits table
CREATE TABLE public.visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  property_slug text,
  property_title text,
  visit_date timestamptz NOT NULL,
  status text DEFAULT 'scheduled',
  agent_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

-- CRM Notes table
CREATE TABLE public.crm_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_notes ENABLE ROW LEVEL SECURITY;

-- Properties meta (CRM overlay for static properties)
CREATE TABLE public.properties_meta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_slug text UNIQUE NOT NULL,
  status text DEFAULT 'active',
  published boolean DEFAULT true,
  featured boolean DEFAULT false,
  assigned_agent uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  internal_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.properties_meta ENABLE ROW LEVEL SECURITY;

-- Security definer functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_agent(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'agent')
  )
$$;

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies

-- user_roles
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- profiles
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.is_admin_or_agent(auth.uid()));
CREATE POLICY "Auto-create profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

-- property_submissions
CREATE POLICY "Anyone can submit property" ON public.property_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin/agent can read submissions" ON public.property_submissions
  FOR SELECT TO authenticated USING (public.is_admin_or_agent(auth.uid()));
CREATE POLICY "Admin/agent can update submissions" ON public.property_submissions
  FOR UPDATE TO authenticated USING (public.is_admin_or_agent(auth.uid()));
CREATE POLICY "Admin can delete submissions" ON public.property_submissions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- clients
CREATE POLICY "Admin/agent can manage clients" ON public.clients
  FOR ALL TO authenticated USING (public.is_admin_or_agent(auth.uid()));

-- visits
CREATE POLICY "Admin/agent can manage visits" ON public.visits
  FOR ALL TO authenticated USING (public.is_admin_or_agent(auth.uid()));

-- crm_notes
CREATE POLICY "Admin/agent can manage notes" ON public.crm_notes
  FOR ALL TO authenticated USING (public.is_admin_or_agent(auth.uid()));

-- properties_meta
CREATE POLICY "Admin/agent can manage properties_meta" ON public.properties_meta
  FOR ALL TO authenticated USING (public.is_admin_or_agent(auth.uid()));
