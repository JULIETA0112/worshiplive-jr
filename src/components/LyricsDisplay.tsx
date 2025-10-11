import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Monitor } from "lucide-react";
import { Song } from "@/types/media";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { WelcomeScreen } from "./WelcomeScreen";
import { useProjectionSync } from "@/hooks/useProjectionSync";

interface LyricsDisplayProps {
  selectedSong?: Song;
  currentSlideIndex?: number;
  onSlideChange?: (index: number) => void;
  onFullscreen?: () => void;
  onCloseSong?: () => void;
}

type BackgroundTheme = 'black' | 'white' | 'blue' | 'purple' | 'gradient-warm' | 'gradient-cool' | 'gradient-sunset' | 'gradient-ocean' | 'gradient-forest' | 'particles-soft' | 'light-rays' | 'floating-particles' | 'gradient-mobile' | 'aurora' | 'starry-night' | 'golden-hour' | 'cherry-blossom' | 'northern-lights' | 'dreamy-clouds' | 'deep-ocean' | 'galaxy';

const backgrounds: Record<BackgroundTheme, string> = {
  black: 'bg-black',
  white: 'bg-white',
  blue: 'bg-gradient-to-br from-blue-900 to-blue-700',
  purple: 'bg-gradient-to-br from-purple-900 to-purple-700',
  'gradient-warm': 'bg-gradient-warm',
  'gradient-cool': 'bg-gradient-cool',
  'gradient-sunset': 'bg-gradient-sunset',
  'gradient-ocean': 'bg-gradient-ocean',
  'gradient-forest': 'bg-gradient-forest',
  'particles-soft': 'bg-particles-soft',
  'light-rays': 'bg-light-rays',
  'floating-particles': 'bg-floating-particles',
  'gradient-mobile': 'bg-gradient-mobile',
  'aurora': 'bg-aurora',
  'starry-night': 'bg-starry-night',
  'golden-hour': 'bg-golden-hour',
  'cherry-blossom': 'bg-cherry-blossom',
  'northern-lights': 'bg-northern-lights',
  'dreamy-clouds': 'bg-dreamy-clouds',
  'deep-ocean': 'bg-deep-ocean',
  'galaxy': 'bg-galaxy',
};

const textColors: Record<BackgroundTheme, string> = {
  black: 'text-white',
  white: 'text-gray-900',
  blue: 'text-white',
  purple: 'text-white',
  'gradient-warm': 'text-white',
  'gradient-cool': 'text-white',
  'gradient-sunset': 'text-white',
  'gradient-ocean': 'text-white',
  'gradient-forest': 'text-white',
  'particles-soft': 'text-white',
  'light-rays': 'text-white',
  'floating-particles': 'text-white',
  'gradient-mobile': 'text-white',
  'aurora': 'text-white',
  'starry-night': 'text-white',
  'golden-hour': 'text-gray-900',
  'cherry-blossom': 'text-gray-900',
  'northern-lights': 'text-white',
  'dreamy-clouds': 'text-gray-900',
  'deep-ocean': 'text-white',
  'galaxy': 'text-white',
};

export const LyricsDisplay = ({ 
  selectedSong, 
  currentSlideIndex = 0, 
  onSlideChange,
  onFullscreen,
  onCloseSong
}: LyricsDisplayProps) => {
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0); // Para vista previa/edición
  const [projectedVerseIndex, setProjectedVerseIndex] = useState(0); // Para proyección real
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('gradient-mobile');
  const { updateProjection } = useProjectionSync();

  // Listener para tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedSong && onCloseSong) {
        onCloseSong();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [selectedSong, onCloseSong]);

  // Sincronizar cambios de fondo automáticamente
  useEffect(() => {
    if (selectedSong) {
      updateProjection(selectedSong, projectedVerseIndex, backgroundTheme);
    }
  }, [backgroundTheme]);

  // Sincronizar cuando cambia la canción seleccionada
  useEffect(() => {
    if (selectedSong) {
      updateProjection(selectedSong, 0, backgroundTheme);
      setProjectedVerseIndex(0);
      setSelectedVerseIndex(0);
    } else {
      // Si no hay canción, limpiar proyección
      updateProjection(null, 0, backgroundTheme);
    }
  }, [selectedSong]);

  if (!selectedSong || !selectedSong.lyrics || selectedSong.lyrics.length === 0) {
    return <WelcomeScreen />;
  }

  // Clic simple: solo selecciona para ver/editar
  const handleSingleClick = (index: number) => {
    setSelectedVerseIndex(index);
  };

  // Doble clic: proyecta la estrofa
  const handleDoubleClick = (index: number) => {
    setProjectedVerseIndex(index);
    setSelectedVerseIndex(index);
    if (selectedSong) {
      updateProjection(selectedSong, index, backgroundTheme);
    }
  };

  const nextProjectedVerse = () => {
    const nextIndex = (projectedVerseIndex + 1) % selectedSong!.lyrics!.length;
    setProjectedVerseIndex(nextIndex);
    if (selectedSong) {
      updateProjection(selectedSong, nextIndex, backgroundTheme);
    }
  };

  const prevProjectedVerse = () => {
    const prevIndex = projectedVerseIndex === 0 ? selectedSong!.lyrics!.length - 1 : projectedVerseIndex - 1;
    setProjectedVerseIndex(prevIndex);
    if (selectedSong) {
      updateProjection(selectedSong, prevIndex, backgroundTheme);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Background Theme Selector */}
      <div className="bg-gray-900 border-b border-gray-700 p-3">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-400">Fondo de proyección:</label>
            <Select value={backgroundTheme} onValueChange={(value) => setBackgroundTheme(value as BackgroundTheme)}>
              <SelectTrigger className="w-56 bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 max-h-[400px]">
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
                <SelectItem value="deep-ocean">🐋 Océano Profundo</SelectItem>
                <SelectItem value="aurora">🌌 Aurora Boreal</SelectItem>
                <SelectItem value="northern-lights">✨ Luces del Norte</SelectItem>
                <SelectItem value="starry-night">⭐ Cielo Estrellado</SelectItem>
                <SelectItem value="galaxy">🌠 Galaxia</SelectItem>
                <SelectItem value="golden-hour">🌞 Hora Dorada</SelectItem>
                <SelectItem value="cherry-blossom">🌸 Flores de Cerezo</SelectItem>
                <SelectItem value="dreamy-clouds">☁️ Nubes Soñadoras</SelectItem>
                <SelectItem value="particles-soft">✨ Partículas Suaves</SelectItem>
                <SelectItem value="light-rays">💫 Rayos de Luz</SelectItem>
                <SelectItem value="floating-particles">🎇 Partículas Flotantes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 text-green-400 border-green-400/30">
            <Monitor className="w-3 h-3" />
            Proyectando: Estrofa {projectedVerseIndex + 1}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Song verses list */}
        <div className="w-1/2 bg-gray-900 text-white p-4 overflow-y-auto border-r border-gray-700">
          <div className="mb-4">
            <h3 className="font-bold text-lg">{selectedSong.title}</h3>
            <p className="text-gray-400">- {selectedSong.artist}</p>
          </div>
          
          <div className="space-y-3">
            {selectedSong.lyrics.map((verse, index) => {
              const isSelected = index === selectedVerseIndex;
              const isProjected = index === projectedVerseIndex;
              
              return (
                <div
                  key={index}
                  className={`p-3 rounded cursor-pointer transition-all ${
                    isProjected
                      ? 'bg-green-600 text-white ring-2 ring-green-400'
                      : isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => handleSingleClick(index)}
                  onDoubleClick={() => handleDoubleClick(index)}
                >
                  <div className="text-sm font-medium mb-2 flex items-center justify-between">
                    <span>Estrofa {index + 1}</span>
                    <div className="flex items-center gap-2">
                      {isProjected && (
                        <Badge variant="secondary" className="text-xs bg-green-700 text-white">
                          <Monitor className="w-3 h-3 mr-1" />
                          Proyectando
                        </Badge>
                      )}
                      {isSelected && !isProjected && <Eye className="w-4 h-4 opacity-50" />}
                    </div>
                  </div>
                  <div className="text-sm leading-relaxed">
                    {verse.split('\n').map((line, lineIndex) => (
                      <div key={lineIndex}>{line}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        
          <div className="mt-6 p-3 bg-gray-800 rounded text-sm text-gray-300">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" onClick={prevProjectedVerse}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span>
                Proyección: Estrofa {projectedVerseIndex + 1} de {selectedSong.lyrics.length}
              </span>
              <Button variant="ghost" size="sm" onClick={nextProjectedVerse}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400">Clic simple: Ver/editar | Doble clic: Proyectar</p>
          </div>
        </div>

        {/* Projection display - Pantalla externa */}
        <div className={`w-1/2 relative ${backgrounds[backgroundTheme]} ${textColors[backgroundTheme]} flex flex-col overflow-hidden`}>
          {/* Vista previa discreta del operador */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white border border-green-400/30">
              <div className="flex items-center gap-2">
                <Monitor className="w-3 h-3 text-green-400" />
                <span className="text-green-400 font-semibold">PROYECTANDO EN PANTALLA EXTERNA</span>
              </div>
              <div className="text-gray-300 mt-1">Estrofa {projectedVerseIndex + 1} de {selectedSong.lyrics.length}</div>
            </div>
          </div>
          
          {/* Capa de legibilidad para fondos dinámicos */}
          {(backgroundTheme.includes('gradient') || backgroundTheme.includes('particles') || backgroundTheme.includes('light')) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-5xl h-full flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              </div>
            </div>
          )}
          
          {/* Contenido de proyección */}
          <div className="flex-1 flex items-center justify-center p-12 relative z-10">
            <div className="text-center max-w-5xl">
              <div className="text-4xl md:text-5xl lg:text-6xl leading-relaxed font-bold drop-shadow-2xl">
                {selectedSong.lyrics[projectedVerseIndex].split('\n').map((line, index) => (
                  <div key={index} className="mb-6">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};