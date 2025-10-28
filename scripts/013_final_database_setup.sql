-- Complete database setup script
-- This script can be run multiple times safely

-- ============================================
-- STEP 1: Create helper functions
-- ============================================

-- Drop existing functions with CASCADE to remove dependencies
DROP FUNCTION IF EXISTS public.get_user_role(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- Function to get user role without causing infinite recursion
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN COALESCE(user_role, 'cliente');
END;
$$;

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (SELECT get_user_role(auth.uid()) = 'admin');
END;
$$;

-- ============================================
-- STEP 2: Fix profiles table structure
-- ============================================

-- Add unique constraints if they don't exist
DO $$ 
BEGIN
  -- Add unique constraint on email
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_email_key'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
  END IF;

  -- Add unique constraint on dni
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_dni_key'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_dni_key UNIQUE (dni);
  END IF;
END $$;

-- ============================================
-- STEP 3: Fix page_content table structure
-- ============================================

-- Drop the old unique constraint on page_name only
ALTER TABLE public.page_content DROP CONSTRAINT IF EXISTS page_content_page_name_key;

-- Add composite unique constraint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'page_content_unique_key'
  ) THEN
    ALTER TABLE public.page_content 
    ADD CONSTRAINT page_content_unique_key 
    UNIQUE (page_name, section_name, content_key);
  END IF;
END $$;

-- ============================================
-- STEP 4: Recreate RLS policies for profiles
-- ============================================

-- Drop all existing policies
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

-- Users can update their own profile (except role)
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Admins can update any profile
CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE
  USING (get_user_role(auth.uid()) = 'admin');

-- Allow profile creation during signup
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- STEP 5: Recreate RLS policies for patients
-- ============================================

DROP POLICY IF EXISTS "patients_select_employee" ON public.patients;
DROP POLICY IF EXISTS "patients_select_admin" ON public.patients;
DROP POLICY IF EXISTS "patients_insert_employee" ON public.patients;
DROP POLICY IF EXISTS "patients_update_employee" ON public.patients;
DROP POLICY IF EXISTS "patients_delete_employee" ON public.patients;

CREATE POLICY "patients_select_employee"
  ON public.patients FOR SELECT
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "patients_select_admin"
  ON public.patients FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "patients_insert_employee"
  ON public.patients FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "patients_update_employee"
  ON public.patients FOR UPDATE
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "patients_delete_employee"
  ON public.patients FOR DELETE
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

-- ============================================
-- STEP 6: Recreate RLS policies for studies
-- ============================================

DROP POLICY IF EXISTS "studies_select_employee" ON public.studies;
DROP POLICY IF EXISTS "studies_select_client" ON public.studies;
DROP POLICY IF EXISTS "studies_insert_employee" ON public.studies;
DROP POLICY IF EXISTS "studies_update_employee" ON public.studies;
DROP POLICY IF EXISTS "studies_delete_employee" ON public.studies;

CREATE POLICY "studies_select_employee"
  ON public.studies FOR SELECT
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "studies_select_client"
  ON public.studies FOR SELECT
  USING (
    get_user_role(auth.uid()) = 'cliente' AND
    patient_dni = (SELECT dni FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "studies_insert_employee"
  ON public.studies FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "studies_update_employee"
  ON public.studies FOR UPDATE
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "studies_delete_employee"
  ON public.studies FOR DELETE
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

-- ============================================
-- STEP 7: Recreate RLS policies for study_images
-- ============================================

DROP POLICY IF EXISTS "study_images_select_employee" ON public.study_images;
DROP POLICY IF EXISTS "study_images_select_client" ON public.study_images;
DROP POLICY IF EXISTS "study_images_insert_employee" ON public.study_images;
DROP POLICY IF EXISTS "study_images_delete_employee" ON public.study_images;

CREATE POLICY "study_images_select_employee"
  ON public.study_images FOR SELECT
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "study_images_select_client"
  ON public.study_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.studies s
      WHERE s.id = study_images.study_id
      AND s.patient_dni = (SELECT dni FROM public.profiles WHERE id = auth.uid())
      AND get_user_role(auth.uid()) = 'cliente'
    )
  );

CREATE POLICY "study_images_insert_employee"
  ON public.study_images FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) IN ('empleado', 'admin'));

CREATE POLICY "study_images_delete_employee"
  ON public.study_images FOR DELETE
  USING (get_user_role(auth.uid()) IN ('empleado', 'admin'));

-- ============================================
-- STEP 8: Recreate RLS policies for page_content
-- ============================================

DROP POLICY IF EXISTS "page_content_select_all" ON public.page_content;
DROP POLICY IF EXISTS "page_content_insert_admin" ON public.page_content;
DROP POLICY IF EXISTS "page_content_update_admin" ON public.page_content;
DROP POLICY IF EXISTS "page_content_delete_admin" ON public.page_content;

CREATE POLICY "page_content_select_all"
  ON public.page_content FOR SELECT
  USING (true);

CREATE POLICY "page_content_insert_admin"
  ON public.page_content FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "page_content_update_admin"
  ON public.page_content FOR UPDATE
  USING (is_admin());

CREATE POLICY "page_content_delete_admin"
  ON public.page_content FOR DELETE
  USING (is_admin());

-- ============================================
-- STEP 9: Insert default page content
-- ============================================

INSERT INTO public.page_content (page_name, section_name, content_key, content_value)
VALUES 
  ('home', 'hero', 'title', 'Diagnóstico Odontológico por Imagen'),
  ('home', 'hero', 'subtitle', 'Tecnología de vanguardia en radiología dental desde 1992'),
  ('home', 'about', 'title', 'Sobre Nosotros'),
  ('home', 'about', 'description', 'Con más de 30 años de experiencia, DOI es líder en diagnóstico por imagen dental y maxilofacial.')
ON CONFLICT (page_name, section_name, content_key) 
DO UPDATE SET 
  content_value = EXCLUDED.content_value,
  updated_at = now();

-- ============================================
-- DONE
-- ============================================
