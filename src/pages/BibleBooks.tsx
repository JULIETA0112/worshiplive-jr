import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Book, Home } from "lucide-react";
import { bibleBooks, BibleBook } from "@/data/bibleBooks";
import { useNavigate } from "react-router-dom";

export const BibleBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredBooks = bibleBooks.filter(book => 
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookSelect = (book: BibleBook) => {
    navigate(`/bible/${book.id}`, { state: { book } });
  };

  const antiguoTestamento = filteredBooks.filter(book => book.testament === "antiguo");
  const nuevoTestamento = filteredBooks.filter(book => book.testament === "nuevo");

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-soft-rose/20 border border-soft-rose/30"
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-soft-rose to-soft-blue rounded-lg flex items-center justify-center delicate-glow animate-glow-pulse">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold font-orbitron delicate-text animate-neon-flicker">
                  <span className="text-soft-rose">B</span>
                  <span className="text-soft-blue">I</span>
                  <span className="text-soft-lavender">B</span>
                  <span className="text-soft-mint">L</span>
                  <span className="text-soft-rose">I</span>
                  <span className="text-soft-blue">A</span>
                </h1>
              </div>
              <div className="w-20"></div> {/* Spacer for balance */}
            </div>
            <p className="text-lg text-muted-foreground">Selecciona un libro para leer</p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-soft-blue" />
            <Input 
              placeholder="Buscar libro (ej: GE, Genesis)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-soft-blue/30 focus:border-soft-rose focus:ring-soft-rose/50"
            />
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Antiguo Testamento */}
            <Card className="glass-effect border-soft-blue/30">
              <CardHeader>
                <CardTitle className="text-center text-soft-blue text-xl">
                  Antiguo Testamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {antiguoTestamento.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => handleBookSelect(book)}
                      className="flex items-center justify-between p-3 rounded-lg glass-effect hover:bg-soft-blue/20 transition-all border border-soft-blue/20 hover:border-soft-blue/40"
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{book.name}</p>
                        <Badge variant="outline" className="text-xs border-soft-blue/40 text-soft-blue">
                          {book.shortName}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {book.chapters} cap.
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nuevo Testamento */}
            <Card className="glass-effect border-soft-rose/30">
              <CardHeader>
                <CardTitle className="text-center text-soft-rose text-xl">
                  Nuevo Testamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {nuevoTestamento.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => handleBookSelect(book)}
                      className="flex items-center justify-between p-3 rounded-lg glass-effect hover:bg-soft-rose/20 transition-all border border-soft-rose/20 hover:border-soft-rose/40"
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{book.name}</p>
                        <Badge variant="outline" className="text-xs border-soft-rose/40 text-soft-rose">
                          {book.shortName}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {book.chapters} cap.
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};