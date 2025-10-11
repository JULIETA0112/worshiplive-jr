import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobileLyricsView from "./pages/MobileLyricsView";
import LyricsProjection from "./pages/LyricsProjection";
import Espectador from "./pages/Espectador";
import NotFound from "./pages/NotFound";
import { BibleBooks } from "./pages/BibleBooks";
import { BibleChapter } from "./pages/BibleChapter";
import { BibleVerse } from "./pages/BibleVerse";
import { BibleProjection } from "./pages/BibleProjection";
import { useIsMobile } from "./hooks/useDeviceDetection";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={isMobile ? <MobileLyricsView /> : <Index />} 
            />
            <Route path="/operator" element={<Index />} />
            <Route path="/mobile" element={<MobileLyricsView />} />
            <Route path="/mobile-lyrics" element={<MobileLyricsView />} />
            <Route path="/lyrics-projection" element={<LyricsProjection />} />
            <Route path="/espectador" element={<Espectador />} />
            <Route path="/bible" element={<BibleBooks />} />
            <Route path="/bible/:bookId" element={<BibleChapter />} />
            <Route path="/bible/:bookId/:chapter/:verse" element={<BibleVerse />} />
            <Route path="/bible/:bookId/:chapter/:verse/projection" element={<BibleProjection />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
