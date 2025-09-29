// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {useRoutes ,  useLocation } from 'react-router-dom';
// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import pages
// import Services from './pages/Services'
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import About from './pages/About'
// import VillaConstruction from './pages/VillaConstruction'
// import VillaDesign from "./pages/VillaDesign";
// import InteriorDesign from './pages/InteriorDesign'
// import VillaRenovation from './pages/VillaRenovation';
// import VillaMaintenance from './pages/VillaMaintenance'
// import Fitout from './pages/Fitout'
// import ContactUs from './pages/Contact' 
// import BlogDetailed from './pages/BlogDetailed'
// import Blogs from './pages/Blogs'
// const queryClient = new QueryClient();

//  const ScrollToTop = () => {
//     const { pathname } = useLocation();
  
//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, [pathname]);
  
//     return null;
//   };

// const App = () => (


  
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//      <ScrollToTop />

//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/About" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/services/villa-construction" element={<VillaConstruction/>} />
//           <Route path="/services/villa-design" element={<VillaDesign/>} />
//           <Route path="/services/interior-design" element={<InteriorDesign/>} />
//           <Route path="/services/villa-renovation" element={<VillaRenovation/>} />
//           <Route path="/services/villa-maintenance" element={<VillaMaintenance/>} />
//           <Route path="/services/fitout" element={<Fitout/>} />
//           <Route path="/Contact-us" element={<ContactUs/>} />
//           {/* <Route path="/blogs" element={<Blogs/>} /> */}
//           <Route path="/blogs/:id" element={<BlogDetailed />} />
//           // e.g., in App.tsx or wherever routes are defined
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/blogs/:slug" element={<BlogDetailed />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;












// ---------------------------------------------------------------------------














import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Services from "./pages/Services";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import VillaConstruction from "./pages/VillaConstruction";
import VillaDesign from "./pages/VillaDesign";
import InteriorDesign from "./pages/InteriorDesign";
import VillaRenovation from "./pages/VillaRenovation";
import VillaMaintenance from "./pages/VillaMaintenance";
import Fitout from "./pages/Fitout";
import ContactUs from "./pages/Contact";
import BlogDetailed from "./pages/BlogDetailed";
import Blogs from "./pages/Blogs";

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
          <Route path="/services/villa-construction" element={<VillaConstruction />} />
          <Route path="/services/villa-design" element={<VillaDesign />} />
          <Route path="/services/interior-design" element={<InteriorDesign />} />
          <Route path="/services/villa-renovation" element={<VillaRenovation />} />
          <Route path="/services/villa-maintenance" element={<VillaMaintenance />} />
          <Route path="/services/fitout" element={<Fitout />} />
          <Route path="/Contact-us" element={<ContactUs />} />

          {/* Blogs list and details. Keep detail route below list so "/blogs" matches first. */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetailed />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
