import { useRef, useState, useEffect } from 'react'
import CustomCursor from './CustomCursor'
import hamburgerLine from '../assets/hamburger-line.svg'
import { AnimatePresence, motion } from 'framer-motion'
import MenuOverlay from './MenuOverlay'

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
    <div ref={containerRef} className="w-[calc(100vw-64px)] h-[calc(100vh-64px)] bg-black relative m-[32px]">

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
      <div className="flex justify-between">
        <button className="cursor-pointer p-0"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            // Pause icon
            <span class="controls">Pausar</span>
          ) : (
            // Play icon
            <span class="controls">Tocar</span>
          )}
        </button>
        <button className="cursor-pointer p-0"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            // Volume muted icon
            <span class="controls">Open Sound</span>
          ) : (
            // Volume icon
            <span class="controls">Selenciar</span>
          )}
        </button>

      </div>
      </div>
    </div>
  )
}