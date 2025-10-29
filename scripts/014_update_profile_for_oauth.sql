-- Allow DNI to be nullable for OAuth users
ALTER TABLE public.profiles ALTER COLUMN dni DROP NOT NULL;

-- Update the profile trigger to handle OAuth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre, apellido, dni, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'apellido', ''),
    COALESCE(new.raw_user_meta_data->>'dni', ''),
    'cliente'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
