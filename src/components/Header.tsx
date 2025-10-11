import { Button } from "@/components/ui/button";
import { Music, Settings, Home, FileText } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass-effect border-b border-soft-rose/30 px-6 py-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-soft-rose/10 via-soft-blue/10 to-soft-lavender/10 animate-gradient-shift bg-[length:200%_200%]"></div>
      
      <div className="relative flex items-center justify-between">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-soft-rose to-soft-blue rounded-lg flex items-center justify-center delicate-glow animate-glow-pulse">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold font-orbitron delicate-text animate-neon-flicker">
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
          </div>
          
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-soft-rose/20 hover:text-soft-blue border border-soft-rose/30">
              <Home className="w-4 h-4" />
              Inicio
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-soft-blue/20 hover:text-soft-rose border border-soft-blue/30">
              <FileText className="w-4 h-4" />
              Canciones
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 hover:bg-soft-lavender/20 hover:text-soft-mint border border-soft-lavender/30"
              onClick={() => window.location.href = '/bible'}
            >
              <FileText className="w-4 h-4" />
              Biblia
            </Button>
          </nav>
        </div>

        {/* Right Section - Settings */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hover:bg-soft-mint/20 border border-soft-mint/30">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};