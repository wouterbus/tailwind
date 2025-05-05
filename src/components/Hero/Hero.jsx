import { useRef, useState, useEffect } from 'react';
import hamburgerLine from "@/assets/hamburger-line.svg";
import { AnimatePresence, motion } from 'framer-motion';
import MenuOverlay from '@/components/MenuOverlay/MenuOverlay';
import "@/components/Hero/Hero.css";

export default function Hero({ videoSrc = "/videoplayback.mp4", logoSrc = "/logo-hero.svg" }) {

  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [showCursor, setShowCursor] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false) // 🔥 new

  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Set up intersection observer to detect when video enters viewport
  useEffect(() => {
    const options = {
      root: null, // use the viewport
      rootMargin: '0px',
      threshold: 0.25 // trigger when 25% of the video is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting)
      })
    }, options)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Handle video playback based on visibility
  useEffect(() => {
    if (!videoRef.current) return

    if (isVisible) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(err => {
          console.error("Video playback failed:", err)
          setIsPlaying(false)
        })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isVisible])

  // Initialize muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(err => {
          console.error("Video playback failed:", err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div ref={containerRef} className="w-[calc(100vw-48px)] h-[calc(100vh-48px)] bg-black relative m-[24px]">

<MenuOverlay isOpen={menuOpen} toggle={toggleMenu} />

{/* 🎥 Background video */}
<video
  ref={videoRef}
  className="w-full h-full object-cover"
  src="/videoplayback.mp4"
  loop
  muted
  playsInline
/>



    <a href="/">
    <img className="absolute top-8 left-8 mix-blend-exclusion w-4/12" src={logoSrc} alt="Logo" />
    </a>
      
      {/* Custom Controls */}
      <div className='absolute w-full bottom-4'>
      <div className="video-controls-wrapper">
      <button className="video-controls play" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
      {/* Mobile: Icon for Play/Pause */}
      <img className="mobile-icon" src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"} alt="Play/Pause Icon" />
  
  {isPlaying ? (
    // Desktop: Text "Pausar", Mobile: Icon for Pause
    <span className="controls desktop:text">Pausar</span>
  ) : (
    // Desktop: Text "Tocar", Mobile: Icon for Play
    <span className="controls desktop:text">Tocar</span>
  )}
</button>

<button className="video-controls" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
  {isMuted ? (
    // Desktop: Text "Open Sound", Mobile: Icon for Mute
    <span className="controls desktop:text">Open Sound</span>
  ) : (
    // Desktop: Text "Selenciar", Mobile: Icon for Mute
    <span className="controls desktop:text">Selenciar</span>
  )}
  {/* Mobile: Icon for Mute/Unmute */}
  <img className="mobile-icon" src={isMuted ? "/icons/Off.svg" : "/icons/On.svg"} alt="Mute/Unmute Icon" />
</button>

      </div>
      </div>
    </div>
  )
}