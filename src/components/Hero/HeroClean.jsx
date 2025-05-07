import { useState } from 'react';
import MenuOverlay from '@/components/MenuOverlay/MenuOverlay';
import "@/components/Hero/Hero.css";

export default function Hero({ logoSrc = "/logo-hero.svg" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-[calc(100vw-48px)] h-[calc(100vh-48px)] relative m-[24px]">
      <MenuOverlay isOpen={menuOpen} toggle={toggleMenu} />
      {
    <>
    <div className="title-container2">
    <h1 className="uppercase">AUDIOVISUAL<br></br><span className="font-larken uppercase">PRODUCTION</span></h1>
    <p>An audiovisual-driven production capturing the dreamlike distortion of nightlife in motion — blending neon visuals, fragmented beats, and hypnotic pacing to create a sensory overload.</p>
    </div>
    </>
  }
      {/* Logo */}
      <a href="/">
        <img
          className="absolute top-2 left-8 w-2/12"
          src={logoSrc}
          alt="Logo"
        />
      </a>

      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="absolute top-8 right-8 z-50"
        aria-label="Toggle menu"
      >
      </button>
    </div>
  );
}
