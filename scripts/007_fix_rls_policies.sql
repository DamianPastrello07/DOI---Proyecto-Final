-- Drop existing policies that cause infinite recursion
drop policy if exists "profiles_select_admin" on public.profiles;
drop policy if exists "profiles_update_admin" on public.profiles;

-- Create a security definer function to check user role (bypasses RLS)
create or replace function public.get_user_role(user_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = user_id;
  
  return user_role;
end;
$$;

-- Recreate admin policies using the security definer function
create policy "profiles_select_admin"
  on public.profiles for select
  using (public.get_user_role(auth.uid()) = 'admin');

create policy "profiles_update_admin"
  on public.profiles for update
  using (public.get_user_role(auth.uid()) = 'admin');

-- Add unique constraint on email
alter table public.profiles add constraint profiles_email_unique unique (email);
