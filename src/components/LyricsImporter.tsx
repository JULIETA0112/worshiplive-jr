import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Song } from "@/types/media";

interface LyricsImporterProps {
  onSongsImported: (songs: Song[]) => void;
}

export const LyricsImporter = ({ onSongsImported }: LyricsImporterProps) => {
  const [content, setContent] = useState("");

  const processContent = () => {
    const sections = content.split('\n\n').filter(s => s.trim());
    const songs: Song[] = [];
    
    sections.forEach((section, index) => {
      const lines = section.split('\n').filter(l => l.trim());
      if (lines.length > 0) {
        const title = lines[0];
        const lyrics = lines.slice(1);
        
        songs.push({
          id: Date.now() + index,
          title,
          artist: "Desconocido",
          lyrics: lyrics.length > 0 ? lyrics : [section]
        });
      }
    });
    
    onSongsImported(songs);
    setContent("");
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Pega aquí las letras de canciones. Separa cada canción con doble enter."
        rows={10}
      />
      <Button onClick={processContent} disabled={!content.trim()}>
        Procesar Letras
      </Button>
    </div>
  );
};