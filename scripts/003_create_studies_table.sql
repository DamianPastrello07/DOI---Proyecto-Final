-- Create studies table for radiology studies
create table if not exists public.studies (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references public.patients(id) on delete cascade,
  patient_dni text not null,
  patient_nombre text not null,
  patient_apellido text not null,
  tipo_estudio text not null,
  descripcion text,
  fecha_estudio date not null default current_date,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.studies enable row level security;

-- Admins and employees can view all studies
create policy "studies_select_staff"
  on public.studies for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Clients can view their own studies by DNI
create policy "studies_select_client"
  on public.studies for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() 
        and role = 'cliente' 
        and dni = studies.patient_dni
    )
  );

-- Employees and admins can insert studies
create policy "studies_insert_staff"
  on public.studies for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Employees and admins can update studies
create policy "studies_update_staff"
  on public.studies for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Employees and admins can delete studies
create policy "studies_delete_staff"
  on public.studies for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );
