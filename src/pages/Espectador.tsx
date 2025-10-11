import { useProjectionSync } from "@/hooks/useProjectionSync";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Card } from "@/components/ui/card";

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

const Espectador = () => {
  const { projectionData } = useProjectionSync();

  // Si no hay canción, mostrar pantalla de bienvenida
  if (!projectionData || !projectionData.songId || !projectionData.lyrics) {
    return <WelcomeScreen />;
  }

  const backgroundTheme = (projectionData.backgroundTheme || 'gradient-mobile') as BackgroundTheme;
  const currentVerse = projectionData.lyrics[projectionData.verseIndex] || '';

  return (
    <div className={`min-h-screen relative ${backgrounds[backgroundTheme]} ${textColors[backgroundTheme]} flex flex-col overflow-hidden`}>
      {/* Capa de legibilidad para fondos dinámicos */}
      {(backgroundTheme.includes('gradient') || backgroundTheme.includes('particles') || backgroundTheme.includes('light')) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-5xl h-full flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          </div>
        </div>
      )}
      
      {/* Contenido de proyección */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative z-10">
        <div className="text-center max-w-5xl w-full">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-bold drop-shadow-2xl mb-8">
            {currentVerse.split('\n').map((line, index) => (
              <div key={index} className="mb-4 md:mb-6">
                {line}
              </div>
            ))}
          </div>
          
          {/* Info de la canción en la parte inferior */}
          <Card className="mt-8 bg-black/50 backdrop-blur-sm border-white/20 p-4">
            <div className="text-lg md:text-xl font-semibold">{projectionData.songTitle}</div>
            <div className="text-sm md:text-base text-white/70">{projectionData.songArtist}</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Espectador;
