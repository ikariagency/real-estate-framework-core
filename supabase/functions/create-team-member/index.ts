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
    // Verify caller is admin
    const authHeader = req.headers.get('Authorization');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader! } } }
    );

    const { data: { user: caller } } = await supabaseClient.auth.getUser();
    if (!caller) throw new Error('Not authenticated');

    const { data: callerRoles } = await supabaseClient.from('user_roles').select('role').eq('user_id', caller.id);
    const isAdmin = callerRoles?.some(r => r.role === 'admin');
    if (!isAdmin) throw new Error('Only admins can create team members');

    const { email, password, full_name, role } = await req.json();
    if (!email || !password) throw new Error('Email and password required');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || email },
    });

    if (error) throw error;

    // Assign role
    await supabaseAdmin.from('user_roles').insert({
      user_id: user.user.id,
      role: role || 'agent',
    });

    return new Response(JSON.stringify({
      message: 'Team member created',
      user_id: user.user.id,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
