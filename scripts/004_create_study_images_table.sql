-- Create study images table for storing image URLs
create table if not exists public.study_images (
  id uuid primary key default gen_random_uuid(),
  study_id uuid references public.studies(id) on delete cascade,
  image_url text not null,
  image_name text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.study_images enable row level security;

-- Admins and employees can view all study images
create policy "study_images_select_staff"
  on public.study_images for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Clients can view images of their own studies
create policy "study_images_select_client"
  on public.study_images for select
  using (
    exists (
      select 1 from public.studies s
      join public.profiles p on p.dni = s.patient_dni
      where s.id = study_images.study_id
        and p.id = auth.uid()
        and p.role = 'cliente'
    )
  );

-- Employees and admins can insert study images
create policy "study_images_insert_staff"
  on public.study_images for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );

-- Employees and admins can delete study images
create policy "study_images_delete_staff"
  on public.study_images for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'empleado')
    )
  );
