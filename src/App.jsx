import '../styles/globals.css';
import "@/fonts.css";
import '@/index.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Footer from "@/components/Footer/Footer";

import Home from "@/pages/home";
import QuemSomos from "@/pages/quem-somos";
import ComoTudoAcontece from "@/pages/como-tudo-acontece";
import Portfolio from "@/pages/portfolio";
import Contato from "@/pages/contato";
import ProjectDetail from "@/pages/ProjectDetail";

import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "@/components/PageTransitionWrapper/PageTransitionWrapper";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
        <Route path="/quem-somos" element={<PageTransitionWrapper><QuemSomos /></PageTransitionWrapper>} />
        <Route path="/como-tudo-acontece" element={<PageTransitionWrapper><ComoTudoAcontece /></PageTransitionWrapper>} />
        <Route path="/portfolio" element={<PageTransitionWrapper><Portfolio /></PageTransitionWrapper>} />
        <Route path="/contato" element={<PageTransitionWrapper><Contato /></PageTransitionWrapper>} />
        <Route path="/projects/:id" element={<PageTransitionWrapper><ProjectDetail /></PageTransitionWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
