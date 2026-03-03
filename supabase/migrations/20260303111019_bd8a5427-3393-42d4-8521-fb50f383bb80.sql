
-- Allow public read access to properties_meta for filtering published properties on frontend
CREATE POLICY "Public can read properties_meta"
ON public.properties_meta
FOR SELECT
TO anon, authenticated
USING (true);
