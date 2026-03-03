import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const email = 'info@viancasa.com';
    const password = 'Viancasa2024!CRM';

    // Check if user already exists
    const { data: existing } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existing?.users?.find(u => u.email === email);

    // Also check old admin email and update it
    const oldAdmin = existing?.users?.find(u => u.email === 'admin@viancasa.com');
    if (oldAdmin) {
      await supabaseAdmin.auth.admin.updateUserById(oldAdmin.id, { email });
      await supabaseAdmin.from('user_roles').upsert({
        user_id: oldAdmin.id,
        role: 'admin',
      }, { onConflict: 'user_id,role' });
      return new Response(JSON.stringify({
        message: 'Admin email updated successfully',
        email,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
    }

    if (existingUser) {
      await supabaseAdmin.from('user_roles').upsert({
        user_id: existingUser.id,
        role: 'admin',
      }, { onConflict: 'user_id,role' });

      return new Response(JSON.stringify({
        message: 'Admin user already exists, role ensured',
        email,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
    }

    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: 'Administrador VIANCASA' },
    });

    if (error) throw error;

    // Assign admin role
    await supabaseAdmin.from('user_roles').insert({
      user_id: user.user.id,
      role: 'admin',
    });

    return new Response(JSON.stringify({
      message: 'Admin user created successfully',
      email,
      password,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
