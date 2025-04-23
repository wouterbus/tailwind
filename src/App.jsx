import '../styles/globals.css'
import "./fonts.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'

import Home from './pages/home'
import QuemSomos from './pages/quem-somos'
import ComoTudoAcontece from './pages/como-tudo-acontece'
import Portfolio from './pages/portfolio'
import Contato from './pages/contato'

function App() {
  return (
    <BrowserRouter>
          <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/como-tudo-acontece" element={<ComoTudoAcontece />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
