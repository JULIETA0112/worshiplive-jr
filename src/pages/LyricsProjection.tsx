import { useEffect, useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";

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

// Página de proyección dedicada para HDMI/TV (modo "Ampliar" en Windows)
const LyricsProjection = () => {
  const [projectionData, setProjectionData] = useState<any>(null);
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('gradient-mobile');

  useEffect(() => {
    const loadProjection = () => {
      const data = localStorage.getItem('worship_projection');
      if (data) {
        const parsed = JSON.parse(data);
        setProjectionData(parsed);
        if (parsed.backgroundTheme) {
          setBackgroundTheme(parsed.backgroundTheme);
        }
      }
    };

    loadProjection();

    const handleStorageChange = () => {
      loadProjection();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadProjection, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!projectionData || !projectionData.lyrics || projectionData.lyrics.length === 0) {
    return <WelcomeScreen />;
  }

  const currentVerse = projectionData.lyrics[projectionData.verseIndex] || "";
  const hasLegibilityLayer = backgroundTheme.includes('gradient') || backgroundTheme.includes('particles') || backgroundTheme.includes('light');

  return (
    <div className={`min-h-screen w-screen ${backgrounds[backgroundTheme]} ${textColors[backgroundTheme]} flex items-center justify-center p-16 relative overflow-hidden`}>
      {/* Capa de legibilidad para fondos dinámicos */}
      {hasLegibilityLayer && (
        <div className="absolute inset-0">
          <div className="w-full h-full bg-black/40 backdrop-blur-[2px]"></div>
        </div>
      )}
      
      {/* Contenido centrado para proyección */}
      <div className="text-center max-w-6xl relative z-10">
        <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed font-bold drop-shadow-2xl">
          {currentVerse.split('\n').map((line: string, index: number) => (
            <div key={index} className="mb-8">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsProjection;
