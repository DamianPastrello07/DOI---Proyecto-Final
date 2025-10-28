-- Insert test users
-- Note: Passwords need to be set through Supabase Auth, not directly in profiles table
-- This script only creates the profiles after users are created via auth

-- First, we need to ensure the auth.users exist
-- These will be created through the registration process or manually in Supabase dashboard

-- For now, let's create a function to help with user creation
create or replace function public.create_user_with_profile(
  p_email text,
  p_password text,
  p_nombre text,
  p_apellido text,
  p_dni text,
  p_role text
)
returns json
language plpgsql
security definer
as $$
declare
  new_user_id uuid;
begin
  -- Note: This function should be called from a secure context
  -- In production, use Supabase Admin API to create users
  
  -- For now, return instructions
  return json_build_object(
    'message', 'Please create users through Supabase Auth Dashboard or use the registration page',
    'email', p_email,
    'nombre', p_nombre,
    'apellido', p_apellido,
    'dni', p_dni,
    'role', p_role
  );
end;
$$;

-- Instructions for manual user creation:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" and create:
--    - Email: damianpastrello@gmail.com, Password: hola12345
--    - Email: juanpablo@gmail.com, Password: hola12345
--    - Email: lautarosanchez@gmail.com, Password: hola12345
-- 3. Then run the following to update their profiles:

-- This will be executed after users are created via auth
-- You can run these updates manually after creating the auth users
