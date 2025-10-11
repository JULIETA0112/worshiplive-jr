import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, X } from "lucide-react";
import { Song } from "@/types/media";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type BackgroundTheme = 'gradient-mobile' | 'black' | 'white' | 'blue' | 'purple' | 'gradient-warm' | 'gradient-cool' | 'gradient-sunset' | 'gradient-ocean' | 'gradient-forest';

const backgrounds: Record<BackgroundTheme, string> = {
  'gradient-mobile': 'bg-gradient-mobile',
  black: 'bg-black',
  white: 'bg-white',
  blue: 'bg-gradient-to-br from-blue-900 to-blue-700',
  purple: 'bg-gradient-to-br from-purple-900 to-purple-700',
  'gradient-warm': 'bg-gradient-warm',
  'gradient-cool': 'bg-gradient-cool',
  'gradient-sunset': 'bg-gradient-sunset',
  'gradient-ocean': 'bg-gradient-ocean',
  'gradient-forest': 'bg-gradient-forest',
};

const textColors: Record<BackgroundTheme, string> = {
  'gradient-mobile': 'text-white',
  black: 'text-white',
  white: 'text-gray-900',
  blue: 'text-white',
  purple: 'text-white',
  'gradient-warm': 'text-white',
  'gradient-cool': 'text-white',
  'gradient-sunset': 'text-white',
  'gradient-ocean': 'text-white',
  'gradient-forest': 'text-white',
};

interface SongUploadProps {
  onSongCreate: (song: Song) => void;
  onSongsImported: (songs: Song[]) => void;
  onClose: () => void;
  editingSong?: Song;
}

export const SongUpload = ({ onSongCreate, onSongsImported, onClose, editingSong }: SongUploadProps) => {
  const [title, setTitle] = useState(editingSong?.title || "");
  const [artist, setArtist] = useState(editingSong?.artist || "");
  const [lyrics, setLyrics] = useState(editingSong?.lyrics?.join('\n\n') || "");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('gradient-mobile');
  
  // Separar las estrofas para la vista previa
  const verses = lyrics.split('\n\n').filter(l => l.trim());

  const handleSave = () => {
    if (!lyrics.trim()) return;

    const songData: Song = {
      id: editingSong?.id || Date.now(),
      title: title.trim() || "Sin título",
      artist: artist.trim() || "Desconocido",
      lyrics: lyrics.split('\n\n').filter(l => l.trim()),
      mediaFiles,
      isFavorite: editingSong?.isFavorite || false,
    };

    onSongCreate(songData);
    setTitle("");
    setArtist("");
    setLyrics("");
    setMediaFiles([]);
    onClose();
  };

  return (
    <div className="flex h-full gap-4">
      {/* Panel de entrada - 50% */}
      <Card className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{editingSong ? 'Editar Canción' : 'Agregar Canción'}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre de la canción"
              />
            </div>
            <div className="space-y-2">
              <Label>Artista</Label>
              <Input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Nombre del artista"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fondo de proyección</Label>
            <Select value={backgroundTheme} onValueChange={(value) => setBackgroundTheme(value as BackgroundTheme)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gradient-mobile">🌌 Fondo Móvil Elegante</SelectItem>
                <SelectItem value="black">⚫ Negro</SelectItem>
                <SelectItem value="white">⚪ Blanco</SelectItem>
                <SelectItem value="blue">🔵 Azul</SelectItem>
                <SelectItem value="purple">🟣 Púrpura</SelectItem>
                <SelectItem value="gradient-warm">🔥 Degradado Cálido</SelectItem>
                <SelectItem value="gradient-cool">❄️ Degradado Frío</SelectItem>
                <SelectItem value="gradient-sunset">🌅 Atardecer</SelectItem>
                <SelectItem value="gradient-ocean">🌊 Océano</SelectItem>
                <SelectItem value="gradient-forest">🌲 Bosque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Letra</Label>
            <Textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Escribe la letra de la canción separando las estrofas con una línea en blanco..."
              rows={12}
            />
          </div>

          <Button onClick={handleSave} disabled={!lyrics.trim()} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {editingSong ? 'Actualizar Canción' : 'Guardar en Biblioteca'}
          </Button>
        </div>
      </Card>

      {/* Vista previa - 50% */}
      <div className={`flex-1 ${backgrounds[backgroundTheme]} ${textColors[backgroundTheme]} rounded-lg flex items-center justify-center p-8 overflow-y-auto`}>
        {verses.length > 0 ? (
          <div className="space-y-8 max-w-4xl w-full">
            {verses.map((verse, index) => (
              <div key={index} className="text-center">
                <div className="text-xs opacity-50 mb-2">Estrofa {index + 1}</div>
                <div className="text-3xl md:text-4xl leading-relaxed font-bold drop-shadow-2xl">
                  {verse.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className="mb-4">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center opacity-50">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl">Escribe la letra para ver la vista previa</p>
          </div>
        )}
      </div>
    </div>
  );
};