import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, Share, Maximize2, Home } from "lucide-react";
import { BibleBook } from "@/data/bibleBooks";
import { useToast } from "@/hooks/use-toast";

export const BibleVerse = () => {
  const { bookId, chapter, verse } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const book = location.state?.book as BibleBook;
  const chapterNum = parseInt(chapter || '1');
  const verseNum = parseInt(verse || '1');

  // Placeholder verse text - in a real app, this would come from an API
  const verseText = `En el principio creó Dios los cielos y la tierra. Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.`;

  if (!book) {
    navigate("/bible");
    return null;
  }

  const reference = `${book.name} ${chapterNum}:${verseNum}`;

  const handleCopyVerse = async () => {
    try {
      await navigator.clipboard.writeText(`"${verseText}" - ${reference}`);
      toast({
        title: "Versículo copiado",
        description: "El versículo ha sido copiado al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el versículo",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reference,
          text: `"${verseText}" - ${reference}`,
        });
      } catch (err) {
        handleCopyVerse();
      }
    } else {
      handleCopyVerse();
    }
  };

  const handleFullscreen = () => {
    navigate(`/bible/${bookId}/${chapter}/${verse}/projection`, {
      state: { book, chapter: chapterNum, verse: verseNum, text: verseText }
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-bg)' }}>
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-soft-blue rounded-full animate-bounce opacity-30" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-soft-rose rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-soft-lavender rounded-full animate-bounce opacity-20" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-soft-peach rounded-full animate-bounce opacity-25" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>

      <div className="p-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/bible/${bookId}`, { state: { book } })}
                className="hover:bg-soft-blue/20 border border-soft-blue/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold delicate-text">
                  {reference}
                </h1>
                <p className="text-muted-foreground">
                  {book.testament === 'antiguo' ? 'Antiguo Testamento' : 'Nuevo Testamento'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-soft-lavender/20 border border-soft-lavender/30"
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyVerse}
                className="hover:bg-soft-mint/20 border border-soft-mint/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-soft-rose/20 border border-soft-rose/30"
              >
                <Share className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleFullscreen}
                className="bg-gradient-to-r from-soft-rose to-soft-blue hover:from-soft-blue hover:to-soft-lavender text-white delicate-glow animate-glow-pulse"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Proyectar
              </Button>
            </div>
          </div>

          {/* Verse Display */}
          <Card className="glass-effect border-soft-blue/30 mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-3xl leading-relaxed font-light delicate-text mb-6">
                  "{verseText}"
                </p>
                <p className="text-xl font-medium text-soft-blue">
                  {reference}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => {
                const prevVerse = verseNum > 1 ? verseNum - 1 : verseNum;
                const prevChapter = verseNum === 1 && chapterNum > 1 ? chapterNum - 1 : chapterNum;
                const newVerse = verseNum === 1 && chapterNum > 1 ? 999 : prevVerse; // 999 as placeholder for last verse
                
                if (prevChapter !== chapterNum || newVerse !== verseNum) {
                  navigate(`/bible/${bookId}/${prevChapter}/${newVerse}`, {
                    state: { book, chapter: prevChapter, verse: newVerse }
                  });
                }
              }}
              disabled={chapterNum === 1 && verseNum === 1}
              className="hover:bg-soft-lavender/20 border border-soft-lavender/30"
            >
              Versículo Anterior
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/bible/${bookId}`, { state: { book } })}
              className="hover:bg-soft-mint/20 border border-soft-mint/30"
            >
              Cambiar Versículo
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const nextVerse = verseNum + 1;
                const nextChapter = chapterNum < book.chapters ? chapterNum + 1 : chapterNum;
                
                navigate(`/bible/${bookId}/${chapterNum}/${nextVerse}`, {
                  state: { book, chapter: chapterNum, verse: nextVerse }
                });
              }}
              disabled={chapterNum === book.chapters}
              className="hover:bg-soft-rose/20 border border-soft-rose/30"
            >
              Siguiente Versículo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};