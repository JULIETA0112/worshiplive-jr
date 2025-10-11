import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, Home } from "lucide-react";
import { BibleBook } from "@/data/bibleBooks";

export const BibleChapter = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book as BibleBook;
  
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");

  if (!book) {
    navigate("/bible");
    return null;
  }

  const handleGoToVerse = () => {
    if (chapter && verse) {
      const chapterNum = parseInt(chapter);
      const verseNum = parseInt(verse);
      
      if (chapterNum >= 1 && chapterNum <= book.chapters && verseNum >= 1) {
        navigate(`/bible/${book.id}/${chapterNum}/${verseNum}`, {
          state: { book, chapter: chapterNum, verse: verseNum }
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoToVerse();
    }
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/bible")}
                className="hover:bg-soft-blue/20 border border-soft-blue/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-3xl font-bold delicate-text">
                  {book.name}
                </h1>
                <p className="text-muted-foreground">
                  {book.chapters} capítulos disponibles
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-soft-rose/20 border border-soft-rose/30"
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
          </div>

          {/* Input Form */}
          <Card className="glass-effect border-soft-rose/30 mb-8">
            <CardHeader>
              <CardTitle className="text-center text-soft-rose">
                Ir a versículo específico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-4">
                Formato: {book.name} [Capítulo] [Versículo]
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-soft-blue">
                    Capítulo (1-{book.chapters})
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max={book.chapters}
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="14"
                    className="glass-effect border-soft-blue/30 focus:border-soft-blue focus:ring-soft-blue/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-soft-rose">
                    Versículo
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={verse}
                    onChange={(e) => setVerse(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="5"
                    className="glass-effect border-soft-rose/30 focus:border-soft-rose focus:ring-soft-rose/50"
                  />
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleGoToVerse}
                  disabled={!chapter || !verse}
                  className="bg-gradient-to-r from-soft-rose to-soft-blue hover:from-soft-blue hover:to-soft-lavender text-white delicate-glow animate-glow-pulse"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Ir a {book.name} {chapter}:{verse}
                </Button>
              </div>

              {chapter && verse && (
                <div className="text-center p-4 bg-soft-blue/10 rounded-lg border border-soft-blue/20">
                  <p className="text-lg font-medium delicate-text">
                    {book.name} {chapter}:{verse}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Presiona "Ir" o Enter para ver este versículo
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Chapter Selection */}
          <Card className="glass-effect border-soft-lavender/30">
            <CardHeader>
              <CardTitle className="text-center text-soft-lavender">
                Selección rápida de capítulo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: Math.min(book.chapters, 50) }, (_, i) => i + 1).map((chapterNum) => (
                  <Button
                    key={chapterNum}
                    variant="outline"
                    size="sm"
                    onClick={() => setChapter(chapterNum.toString())}
                    className={`glass-effect border-soft-lavender/30 hover:bg-soft-lavender/20 ${
                      chapter === chapterNum.toString() ? 'bg-soft-lavender/30 border-soft-lavender' : ''
                    }`}
                  >
                    {chapterNum}
                  </Button>
                ))}
              </div>
              {book.chapters > 50 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  ... y {book.chapters - 50} capítulos más. Usa el campo numérico arriba.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};