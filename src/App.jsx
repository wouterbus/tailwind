import '../styles/globals.css';
import "@/fonts.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor/CustomCursor";

import Home from "@/pages/home";
import QuemSomos from "@/pages/quem-somos";
import ComoTudoAcontece from "@/pages/como-tudo-acontece";
import Portfolio from "@/pages/portfolio";
import Contato from "@/pages/contato";
import ProjectDetail from "@/pages/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      {/* Custom cursor and scroll behavior */}
      <CustomCursor />
      <ScrollToTop />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/como-tudo-acontece" element={<ComoTudoAcontece />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/projects/:id" element={<ProjectDetail />} /> {/* Dynamic route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
