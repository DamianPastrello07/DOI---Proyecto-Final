-- Update profiles for test users (run after creating auth users)
-- This assumes the users have been created through Supabase Auth

-- Update Damian's profile to admin
update public.profiles
set 
  nombre = 'Damian',
  apellido = 'Pastrello',
  dni = '48099646',
  role = 'admin'
where email = 'damianpastrello@gmail.com';

-- Update Juan's profile to empleado
update public.profiles
set 
  nombre = 'Juan',
  apellido = 'Pablo',
  dni = '16161616',
  role = 'empleado'
where email = 'juanpablo@gmail.com';

-- Update Lautaro's profile to cliente
update public.profiles
set 
  nombre = 'Lautaro',
  apellido = 'Sanchez',
  dni = '23232323',
  role = 'cliente'
where email = 'lautarosanchez@gmail.com';
