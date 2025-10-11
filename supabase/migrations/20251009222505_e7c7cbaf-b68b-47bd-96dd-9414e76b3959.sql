-- Crear tabla para estado de proyección
CREATE TABLE public.projection_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id TEXT,
  song_title TEXT,
  song_artist TEXT,
  verse_index INTEGER DEFAULT 0,
  lyrics JSONB,
  background_theme TEXT DEFAULT 'gradient-mobile',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar Row Level Security (permitir lectura pública para espectadores)
ALTER TABLE public.projection_state ENABLE ROW LEVEL SECURITY;

-- Política para que todos puedan leer (espectadores)
CREATE POLICY "Anyone can read projection state"
ON public.projection_state
FOR SELECT
TO public
USING (true);

-- Política para que cualquiera pueda actualizar (simplificado para prototipo)
-- En producción, esto debería estar restringido solo a administradores
CREATE POLICY "Anyone can update projection state"
ON public.projection_state
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Crear un único registro inicial
INSERT INTO public.projection_state (id) 
VALUES ('00000000-0000-0000-0000-000000000000');

-- Habilitar realtime en la tabla
ALTER PUBLICATION supabase_realtime ADD TABLE public.projection_state;