import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Song } from '@/types/media';

const PROJECTION_ID = '00000000-0000-0000-0000-000000000000';

export interface ProjectionData {
  songId?: string;
  songTitle?: string;
  songArtist?: string;
  verseIndex: number;
  lyrics?: string[];
  backgroundTheme: string;
}

export const useProjectionSync = () => {
  const [projectionData, setProjectionData] = useState<ProjectionData | null>(null);

  useEffect(() => {
    // Cargar datos iniciales
    const loadInitialData = async () => {
      const { data, error } = await supabase
        .from('projection_state')
        .select('*')
        .eq('id', PROJECTION_ID)
        .single();

      if (error) {
        console.error('Error loading projection state:', error);
        return;
      }

      if (data) {
        setProjectionData({
          songId: data.song_id || undefined,
          songTitle: data.song_title || undefined,
          songArtist: data.song_artist || undefined,
          verseIndex: data.verse_index || 0,
          lyrics: data.lyrics as string[] || undefined,
          backgroundTheme: data.background_theme || 'gradient-mobile',
        });
      }
    };

    loadInitialData();

    // Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel('projection-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projection_state',
          filter: `id=eq.${PROJECTION_ID}`,
        },
        (payload) => {
          console.log('Projection updated:', payload);
          const data = payload.new as any;
          setProjectionData({
            songId: data.song_id || undefined,
            songTitle: data.song_title || undefined,
            songArtist: data.song_artist || undefined,
            verseIndex: data.verse_index || 0,
            lyrics: data.lyrics as string[] || undefined,
            backgroundTheme: data.background_theme || 'gradient-mobile',
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateProjection = async (
    song: Song | null,
    verseIndex: number,
    backgroundTheme: string
  ) => {
    const { error } = await supabase
      .from('projection_state')
      .update({
        song_id: song?.id?.toString() || null,
        song_title: song?.title || null,
        song_artist: song?.artist || null,
        verse_index: verseIndex,
        lyrics: song?.lyrics || null,
        background_theme: backgroundTheme,
        updated_at: new Date().toISOString(),
      })
      .eq('id', PROJECTION_ID);

    if (error) {
      console.error('Error updating projection:', error);
    }
  };

  return { projectionData, updateProjection };
};
