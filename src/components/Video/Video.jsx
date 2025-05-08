import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MenuOverlay from '@/components/MenuOverlay/MenuOverlay';
import "@/components/Hero/Hero.css";

export default function Hero({ videoSrc = "/videoplayback.mp4", imageSrc = null, logoSrc = "/logo-hero.svg", title }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Only observe and handle video visibility if image is NOT shown
  useEffect(() => {
    if (imageSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [imageSrc]);

  useEffect(() => {
    if (!videoRef.current || imageSrc) return;

    if (isVisible) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVisible, imageSrc]);

  useEffect(() => {
    if (videoRef.current && !imageSrc) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, imageSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div ref={containerRef} className="w-[calc(100vw-48px)] h-[calc(100vh-48px)] bg-black relative m-[24px]">
      {imageSrc ? (
  <>
    <img src={imageSrc} className="w-full h-full object-cover" alt="Hero background" />
    {title && (
      <h1>
        {title}
      </h1>
    )}
  </>
) : (
  <video
    ref={videoRef}
    className="w-full h-full object-cover"
    src={videoSrc}
    loop
    muted
    playsInline
  />
)}

      {/* Controls only if video is shown */}
      {!imageSrc && (
        <div className="absolute w-full bottom-4">
          <div className="video-controls-wrapper">
            <button className="video-controls play" onClick={togglePlay}>
              <img className="mobile-icon" src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"} alt="" />
              <span className="controls desktop:text">{isPlaying ? "Pausar" : "Tocar"}</span>
            </button>
            <button className="video-controls" onClick={toggleMute}>
              <span className="controls desktop:text">{isMuted ? "Open Sound" : "Selenciar"}</span>
              <img className="mobile-icon" src={isMuted ? "/icons/Off.svg" : "/icons/On.svg"} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
