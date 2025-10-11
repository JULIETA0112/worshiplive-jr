import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import { useState } from "react";
import { Song } from "@/types/media";

interface MediaPlayerProps {
  currentSong?: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const MediaPlayer = ({ currentSong, isPlaying, onPlayPause }: MediaPlayerProps) => {
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([75]);

  if (!currentSong) {
    return (
      <Card className="p-4">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">No hay canción seleccionada</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-card to-secondary">
      <div className="space-y-4">
        {/* Current Song Info */}
        <div className="text-center">
          <h3 className="font-semibold truncate">{currentSong.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2:45</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="sm">
            <Shuffle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={onPlayPause}
            className="w-12 h-12 rounded-full bg-musical-gold hover:bg-musical-gold/90 text-primary-foreground"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button variant="ghost" size="sm">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Repeat className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </Card>
  );
};