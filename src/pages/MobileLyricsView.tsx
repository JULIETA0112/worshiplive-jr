import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Music, Zap } from "lucide-react";
import { WelcomeScreen } from "@/components/WelcomeScreen";

interface ProjectionData {
  songId: number;
  songTitle: string;
  songArtist: string;
  verseIndex: number;
  lyrics: string[];
  backgroundTheme?: BackgroundTheme;
  timestamp: number;
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

const MobileLyricsView = () => {
  const [projectionData, setProjectionData] = useState<ProjectionData | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('gradient-mobile');

  useEffect(() => {
    // Manejar tecla ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowWelcome(true);
        setProjectionData(null);
        // Limpiar el localStorage para que no se recargue
        localStorage.removeItem('worship_projection');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cargar proyección inicial
    const loadProjection = () => {
      // Si el usuario pidió ver el Welcome, no cargar nada
      if (showWelcome) return;
      
      const stored = localStorage.getItem('worship_projection');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          
          // Solo actualizar si hay un nuevo timestamp (nueva transmisión)
          if (data.timestamp > lastTimestamp) {
            setProjectionData(data);
            setShowWelcome(false);
            setLastTimestamp(data.timestamp);
            if (data.backgroundTheme) {
              setBackgroundTheme(data.backgroundTheme);
            }
          }
        } catch (error) {
          console.error('Error al cargar proyección:', error);
        }
      }
    };

    loadProjection();

    // Escuchar cambios en localStorage para sincronización en tiempo real
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'worship_projection' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          
          // Nueva transmisión detectada
          if (data.timestamp > lastTimestamp) {
            setProjectionData(data);
            setShowWelcome(false);
            setLastTimestamp(data.timestamp);
            if (data.backgroundTheme) {
              setBackgroundTheme(data.backgroundTheme);
            }
          }
        } catch (error) {
          console.error('Error al actualizar proyección:', error);
        }
      }
    };

    // Polling cada 500ms como fallback (para mismo navegador/pestaña)
    const interval = setInterval(loadProjection, 500);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [showWelcome, lastTimestamp]);

  if (!projectionData || showWelcome) {
    return <WelcomeScreen />;
  }

  const hasLegibilityLayer = backgroundTheme.includes('gradient') || backgroundTheme.includes('particles') || backgroundTheme.includes('light');

  return (
    <div 
      className={`min-h-screen p-4 relative overflow-hidden ${backgrounds[backgroundTheme]}`}
    >
      {/* Capa de legibilidad para fondos dinámicos */}
      {hasLegibilityLayer && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none"></div>
      )}

      {/* Floating delicate particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-1 h-1 bg-soft-blue rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-8 w-2 h-2 bg-soft-rose rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-12 w-1 h-1 bg-soft-lavender rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-20 right-6 w-2 h-2 bg-soft-peach rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-60 left-20 w-1 h-1 bg-soft-mint rounded-full animate-bounce opacity-40" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }}></div>
      </div>

      {/* Header con información de la canción */}
      <Card className="glass-effect border-soft-rose/30 mb-6 p-6 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-soft-rose/5 via-soft-blue/5 to-soft-lavender/5 animate-gradient-shift bg-[length:200%_200%]"></div>
        <div className="relative text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-soft-rose to-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 delicate-glow animate-glow-pulse">
            <Music className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold font-orbitron mb-2 delicate-text">
            <span className="text-soft-rose">W</span>
            <span className="text-soft-blue">O</span>
            <span className="text-soft-lavender">R</span>
            <span className="text-soft-mint">S</span>
            <span className="text-soft-rose">H</span>
            <span className="text-soft-blue">I</span>
            <span className="text-soft-lavender">P</span>
            <span className="text-soft-mint"> </span>
            <span className="text-soft-rose">L</span>
            <span className="text-soft-blue">I</span>
            <span className="text-soft-lavender">V</span>
            <span className="text-soft-mint">E</span>
          </h1>
          <h2 className="text-lg font-bold text-soft-rose mb-1">{projectionData.songTitle}</h2>
          <p className="text-soft-blue font-exo text-sm">{projectionData.songArtist}</p>
        </div>
      </Card>

      {/* Letras principales */}
      <Card className="glass-effect border-soft-blue/20 p-8 min-h-[65vh] flex items-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-soft-lavender/5 to-transparent animate-gradient-shift bg-[length:300%_300%]"></div>
        <div className="relative w-full text-center">
          {/* Mostrar la estrofa que proyecta el operador */}
          <div className="text-xs text-soft-lavender mb-4 opacity-60">
            Estrofa {projectionData.verseIndex + 1} de {projectionData.lyrics.length}
          </div>
          <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${textColors[backgroundTheme]} delicate-text leading-relaxed drop-shadow-lg`}>
            {projectionData.lyrics[projectionData.verseIndex]?.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className="mb-4">
                {line}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Indicador de conexión mejorado */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="glass-effect border-soft-mint/30 flex items-center gap-3 px-4 py-3 rounded-full delicate-glow">
          <div className="relative">
            <Zap className="w-4 h-4 text-soft-mint animate-pulse" />
            <div className="absolute inset-0 w-4 h-4 bg-soft-mint rounded-full animate-ping opacity-30"></div>
          </div>
          <span className="text-sm font-exo text-soft-mint font-semibold">EN VIVO</span>
        </div>
      </div>

      {/* Solo vista - sin control */}
      <div className="fixed bottom-6 left-6 z-20">
        <div className="glass-effect border-soft-rose/30 px-3 py-2 rounded-full">
          <span className="text-xs font-exo text-soft-rose">Solo visualización</span>
        </div>
      </div>
    </div>
  );
};

export default MobileLyricsView;
