import '../styles/globals.css';
import "@/fonts.css";
import '@/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Footer from "@/components/Footer/Footer";

import Home from "@/pages/home";
import QuemSomos from "@/pages/quem-somos";
import ComoTudoAcontece from "@/pages/como-tudo-acontece";
import Portfolio from "@/pages/portfolio";
import Contato from "@/pages/contato";
import ProjectDetail from "@/pages/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollToTop />

      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/como-tudo-acontece" element={<ComoTudoAcontece />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
