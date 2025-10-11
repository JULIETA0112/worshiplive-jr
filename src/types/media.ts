export interface Song {
  id: number;
  title: string;
  artist: string;
  lyrics: string[];
  category?: string;
  duration?: string;
  isFavorite?: boolean;
  mediaFiles?: File[];
}