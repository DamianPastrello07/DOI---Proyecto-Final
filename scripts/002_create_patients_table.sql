-- Create patients table for employee management
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  dni text not null unique,
  email text,
  telefono text,
  fecha_nacimiento date,
  direccion text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.patients enable row level security;

-- Admins and employees can view all patients
create policy "patients_select_staff"
  on public.patients for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Employees and admins can insert patients
create policy "patients_insert_staff"
  on public.patients for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Employees and admins can update patients
create policy "patients_update_staff"
  on public.patients for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Employees and admins can delete patients
create policy "patients_delete_staff"
  on public.patients for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );
