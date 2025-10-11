import { Music } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WelcomeScreen = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Floating delicate particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-soft-blue rounded-full animate-bounce opacity-40" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-soft-rose rounded-full animate-bounce opacity-30" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-soft-lavender rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '4.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-soft-mint rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.5s', animationDuration: '4.2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-soft-peach rounded-full animate-bounce opacity-40" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-soft-rose rounded-full animate-bounce opacity-35" style={{ animationDelay: '2.5s', animationDuration: '4.8s' }}></div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-soft-blue rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-soft-rose rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-soft-lavender rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl w-full">
        {/* Logo Icon */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 animate-fade-in">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-soft-rose to-soft-blue rounded-full flex items-center justify-center delicate-glow animate-glow-pulse">
            <Music className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
        </div>

        {/* Main Card */}
        <Card className="glass-effect border-soft-rose/20 p-6 sm:p-12 mb-6 sm:mb-8 animate-fade-in animation-delay-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-soft-rose/5 via-soft-blue/5 to-soft-lavender/5 animate-gradient-shift bg-[length:200%_200%]"></div>
          
          <div className="relative">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 delicate-text leading-tight">
              BIENVENIDOS A LA<br />CASA DE DIOS
            </h1>
            
            <div className="h-1 w-32 sm:w-48 bg-gradient-to-r from-transparent via-soft-rose to-transparent mx-auto mb-4 sm:mb-6 delicate-glow"></div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 sm:mb-4 bg-gradient-to-r from-soft-rose via-soft-blue to-soft-lavender bg-clip-text text-transparent">
              IGLESIA PREVALECE
            </h2>
          </div>
        </Card>

        {/* Bible Verse Card */}
        <Card className="glass-effect border-soft-blue/20 p-6 sm:p-10 animate-fade-in animation-delay-1000 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-soft-lavender/5 to-transparent animate-gradient-shift bg-[length:300%_300%]"></div>
          
          <div className="relative">
            <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white font-light italic leading-relaxed mb-3 sm:mb-4 delicate-text">
              "Mejor es un día en tus atrios<br />
              que mil fuera de ellos"
            </p>
            <p className="text-base sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-soft-blue to-soft-mint bg-clip-text text-transparent">
              Salmos 84:10
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
