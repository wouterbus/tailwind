import { useRef, useState, useEffect } from 'react'
import CustomCursor from './CustomCursor'
import hamburgerLine from '../assets/hamburger-line.svg'
import { AnimatePresence, motion } from 'framer-motion'
import MenuOverlay from './MenuOverlay'

export default function Hero({ videoSrc = "/videoplayback.mp4", logoSrc = "/logo-hero.svg", logoLink = "/", width = "100vw", height = "100vh", title = "Your Page Title" }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false) // 🔥 new

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
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

  useEffect(() => {
    const handleUserGesture = () => {
      if (videoRef.current && isMuted) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Gesture-based play failed:", err));
      }
  
      // only trigger once
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
    };
  
    // trigger on first user tap or click
    window.addEventListener('touchstart', handleUserGesture, { once: true });
    window.addEventListener('click', handleUserGesture, { once: true });
  
    return () => {
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('click', handleUserGesture);
    };
  }, [isMuted]);

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

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
  
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch(err => {
        console.error("Fullscreen error:", err);
      });
    }
  };
  
  return (
    <div ref={containerRef} className="w-[calc(100vw-32px)] h-[calc(100vh-32px)] bg-black relative m-[16px]">
  
      <MenuOverlay isOpen={menuOpen} toggle={toggleMenu} />
  
      {/* 🎥 Background video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoSrc}
        loop
        muted
        playsInline
      />
  
      {/* 🏷 Centered Title */}
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center z-20 page-title">
        {title}
      </h1>
  
      <a href={logoLink}>
        <img
          className="absolute top-8 left-8 mix-blend-exclusion"
          src={logoSrc}
          alt="Logo"
          width={width}
          height={height}
        />
      </a>
  
      {/* Custom Controls */}
      <div className='absolute w-full bottom-4'>
  <div className="flex justify-between items-center px-4">
    {/* Play/Pause */}
    <button
      className="p-0 cursor-line"
      onClick={togglePlay}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      <span className="controls">{isPlaying ? "Pausar" : "Tocar"}</span>
    </button>

    {/* Mute/Unmute */}
    <button
      className="p-0 cursor-line"
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      <span className="controls">{isMuted ? "Open Sound" : "Selenciar"}</span>
    </button>

    {/* Fullscreen */}
    <button
      className="p-0 cursor-line"
      onClick={handleFullscreen}
      aria-label="Fullscreen"
    >
      <span className="controls">Fullscreen</span>
    </button>
  </div>
</div>

    </div>
  );
  
}