import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useRoutes ,  useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Services from './pages/Services'
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from './pages/About'
import VillaConstruction from './pages/VillaConstruction'
import VillaDesign from "./pages/VillaDesign";
import InteriorDesign from './pages/InteriorDesign'
import VillaRenovation from './pages/VillaRenovation'

const queryClient = new QueryClient();

 const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

const App = () => (


  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
     <ScrollToTop />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/About" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/villa-construction" element={<VillaConstruction/>} />
          <Route path="/services/villa-design" element={<VillaDesign/>} />
          <Route path="/services/interior-design" element={<InteriorDesign/>} />
          <Route path="/services/villa-renovation" element={<VillaRenovation/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
