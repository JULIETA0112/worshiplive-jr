import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SongLibrary } from "@/components/SongLibrary";
import { LyricsDisplay } from "@/components/LyricsDisplay";
import { SongUpload } from "@/components/SongUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Heart, QrCode } from "lucide-react";
import { Song } from "@/types/media";
import { useToast } from "@/hooks/use-toast";
import { QRCodeModal } from "@/components/QRCodeModal";

const STORAGE_KEY = 'worshiplive_custom_songs';

const Index = () => {
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();
  const [showUpload, setShowUpload] = useState(false);
  const [customSongs, setCustomSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSong, setEditingSong] = useState<Song | undefined>();
  const [showQRModal, setShowQRModal] = useState(false);
  const { toast } = useToast();

  // Cargar canciones guardadas al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomSongs(parsed);
      }
    } catch (error) {
      console.error('Error al cargar canciones guardadas:', error);
    }
  }, []);

  // Guardar canciones cuando cambien
  useEffect(() => {
    if (customSongs.length > 0) {
      try {
        // No guardamos los File objects, solo la metadata
        const songsToSave = customSongs.map(song => ({
          ...song,
          mediaFiles: [] // Los archivos no se pueden persistir en localStorage
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(songsToSave));
      } catch (error) {
        console.error('Error al guardar canciones:', error);
      }
    }
  }, [customSongs]);

  // Filtrar canciones según la búsqueda
  const filteredSongs = customSongs.filter(song => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.category?.toLowerCase().includes(query)
    );
  });

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
  };

  const handleSongCreate = (song: Song) => {
    setCustomSongs(prev => [song, ...prev]);
    setSelectedSong(song);
  };

  const handleSongsImported = (songs: Song[]) => {
    setCustomSongs(prev => [...songs, ...prev]);
    if (songs.length > 0) {
      setSelectedSong(songs[0]);
    }
  };

  const handleToggleFavorite = (songId: number) => {
    setCustomSongs(prev => prev.map(song => 
      song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
    ));
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setShowUpload(true);
  };

  const handleUpdateSong = (updatedSong: Song) => {
    setCustomSongs(prev => prev.map(song => 
      song.id === updatedSong.id ? updatedSong : song
    ));
    setSelectedSong(updatedSong);
    setEditingSong(undefined);
    toast({
      title: "Canción actualizada",
      description: `"${updatedSong.title}" se ha actualizado correctamente.`,
    });
  };

  const handleDeleteSong = (songId: number) => {
    const songToDelete = customSongs.find(s => s.id === songId);
    if (songToDelete && window.confirm(`¿Estás seguro de eliminar "${songToDelete.title}"?`)) {
      setCustomSongs(prev => prev.filter(song => song.id !== songId));
      if (selectedSong?.id === songId) {
        setSelectedSong(undefined);
      }
      toast({
        title: "Canción eliminada",
        description: `"${songToDelete.title}" se ha eliminado de la biblioteca.`,
      });
    }
  };

  const handleCloseSong = () => {
    setSelectedSong(undefined);
  };

  const favoriteSongs = customSongs.filter(song => song.isFavorite);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-bg)' }}>
      {/* Floating delicate particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-soft-blue rounded-full animate-bounce opacity-30" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-soft-rose rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-soft-lavender rounded-full animate-bounce opacity-20" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-soft-peach rounded-full animate-bounce opacity-25" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>
      
      <Header />
      
      <div className="flex h-[calc(100vh-80px)] relative">
        {/* Left Sidebar - Song Library */}
        <div className="w-80 glass-effect border-r border-soft-blue/20 p-6 overflow-y-auto">
          <div className="mb-6 space-y-3">
            <Button 
              onClick={() => setShowQRModal(true)}
              className="w-full"
              variant="default"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Modo Espectador
            </Button>
            <Button 
              onClick={() => {
                setEditingSong(undefined);
                setShowUpload(true);
              }}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cargar Canción
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-soft-blue" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar canciones..." 
                className="pl-10 w-full glass-effect border-soft-blue/30 focus:border-soft-rose focus:ring-soft-rose/50"
              />
            </div>
          </div>

          {/* Favoritos */}
          {favoriteSongs.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-musical-gold fill-current" />
                <h3 className="font-semibold text-sm">Favoritas</h3>
                <Badge variant="secondary" className="text-xs">{favoriteSongs.length}</Badge>
              </div>
              <div className="space-y-2 mb-6">
                {favoriteSongs.map((song) => (
                  <div
                    key={song.id}
                    className={`p-2 rounded cursor-pointer transition-all hover:bg-accent/50 ${
                      selectedSong?.id === song.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => handleSongSelect(song)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{song.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                      </div>
                      <Heart className="w-3 h-3 text-musical-gold fill-current flex-shrink-0 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SongLibrary 
            songs={filteredSongs}
            onSongSelect={handleSongSelect}
            selectedSong={selectedSong}
            onToggleFavorite={handleToggleFavorite}
            onEditSong={handleEditSong}
            onDeleteSong={handleDeleteSong}
          />
        </div>

        {/* Main Content - Lyrics Display or Upload */}
        <div className="flex-1 p-6 overflow-y-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-soft-lavender/5 via-transparent to-soft-blue/5 animate-gradient-shift bg-[length:300%_300%]"></div>
          <div className="relative">
            {showUpload ? (
              <SongUpload 
                onSongCreate={editingSong ? handleUpdateSong : handleSongCreate}
                onSongsImported={handleSongsImported}
                onClose={() => {
                  setShowUpload(false);
                  setEditingSong(undefined);
                }}
                editingSong={editingSong}
              />
            ) : (
              <LyricsDisplay 
                selectedSong={selectedSong} 
                currentSlideIndex={0}
                onSlideChange={() => {}}
                onCloseSong={handleCloseSong}
              />
            )}
          </div>
        </div>
      </div>
      
      <QRCodeModal open={showQRModal} onOpenChange={setShowQRModal} />
    </div>
  );
};

export default Index;
