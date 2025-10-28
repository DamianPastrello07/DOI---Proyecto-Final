-- Create page content table for admin to manage website content
create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  page_name text not null unique,
  section_name text not null,
  content_key text not null,
  content_value text not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.page_content enable row level security;

-- Everyone can view page content
create policy "page_content_select_all"
  on public.page_content for select
  using (true);

-- Only admins can insert page content
create policy "page_content_insert_admin"
  on public.page_content for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update page content
create policy "page_content_update_admin"
  on public.page_content for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can delete page content
create policy "page_content_delete_admin"
  on public.page_content for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
