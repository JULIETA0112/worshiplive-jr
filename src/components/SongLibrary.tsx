import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, MoreVertical, Image, Video, Edit, Trash2 } from "lucide-react";
import { Song } from "@/types/media";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SongLibraryProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  selectedSong?: Song;
  onToggleFavorite?: (songId: number) => void;
  onEditSong?: (song: Song) => void;
  onDeleteSong?: (songId: number) => void;
}

export const SongLibrary = ({ songs, onSongSelect, selectedSong, onToggleFavorite, onEditSong, onDeleteSong }: SongLibraryProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Biblioteca de Canciones</h2>
        <Badge variant="secondary">{songs.length} canciones</Badge>
      </div>
      
      <div className="space-y-2">
        {songs.map((song) => (
          <Card
            key={song.id}
            className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
              selectedSong?.id === song.id ? 'ring-2 ring-musical-gold bg-accent/30' : ''
            }`}
            onClick={() => onSongSelect(song)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-musical-gold/20"
                >
                  <Play className="w-4 h-4" />
                </Button>
                
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{song.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {song.category}
                </Badge>
                {song.mediaFiles && song.mediaFiles.length > 0 && (
                  <div className="flex gap-1">
                    {song.mediaFiles.filter(f => f.type === 'image').length > 0 && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Image className="w-3 h-3" />
                        {song.mediaFiles.filter(f => f.type === 'image').length}
                      </Badge>
                    )}
                    {song.mediaFiles.filter(f => f.type === 'video').length > 0 && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Video className="w-3 h-3" />
                        {song.mediaFiles.filter(f => f.type === 'video').length}
                      </Badge>
                    )}
                  </div>
                )}
                <span className="text-xs text-muted-foreground">{song.duration}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 ${song.isFavorite ? 'text-musical-gold' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.(song.id);
                  }}
                >
                  <Heart className={`w-4 h-4 ${song.isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditSong?.(song);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSong?.(song.id);
                      }}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};