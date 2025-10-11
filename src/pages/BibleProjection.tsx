import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minimize2, Home } from "lucide-react";
import { BibleBook } from "@/data/bibleBooks";

export const BibleProjection = () => {
  const { bookId, chapter, verse } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const book = location.state?.book as BibleBook;
  const chapterNum = parseInt(chapter || '1');
  const verseNum = parseInt(verse || '1');
  const verseText = location.state?.text || 'Texto del versículo no disponible';

  if (!book) {
    navigate("/bible");
    return null;
  }

  const reference = `${book.name} ${chapterNum}:${verseNum}`;

  const handleBack = () => {
    navigate(`/bible/${bookId}/${chapter}/${verse}`, {
      state: { book, chapter: chapterNum, verse: verseNum }
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
      {/* Floating particles for projection ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-indigo-400 rounded-full animate-bounce opacity-15" style={{ animationDelay: '4s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-25" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
      </div>

      {/* Top control bar */}
      <div className="relative z-10 p-4 flex justify-between items-center bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Salir de proyección
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-white hover:bg-white/20"
        >
          <Minimize2 className="w-4 h-4 mr-2" />
          Minimizar
        </Button>
      </div>

      {/* Main projection content */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="max-w-6xl mx-auto text-center">
          {/* Verse text */}
          <div className="mb-12">
            <p className="text-4xl md:text-5xl lg:text-6xl leading-relaxed font-light text-white mb-8 drop-shadow-2xl">
              "{verseText}"
            </p>
          </div>

          {/* Reference */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-blue-200 drop-shadow-lg">
            {reference}
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent rotate-45"></div>
            <div className="absolute bottom-1/4 right-1/4 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent -rotate-45"></div>
            <div className="absolute top-1/3 right-1/3 w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45"></div>
            <div className="absolute bottom-1/3 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="relative z-10 p-4 bg-black/20 backdrop-blur-sm text-center">
        <p className="text-white/70 text-sm">
          Modo Proyección - {book.testament === 'antiguo' ? 'Antiguo Testamento' : 'Nuevo Testamento'}
        </p>
      </div>
    </div>
  );
};