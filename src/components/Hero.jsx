import { useRef, useState, useEffect } from 'react'

export default function Hero() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

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
    <div ref={containerRef} className="w-full h-screen bg-black relative">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/videoplayback.mp4"
        loop
        muted
        playsInline
      />

      <img className="absolute top-10 left-10 mix-blend-exclusion w-4/12" src="src/assets/logo-hero.svg"></img>
      
      {/* Custom Controls */}
      <div className='absolute w-full bottom-0'>
      <div className="flex justify-between">
        <button 
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            // Pause icon
            <span class="controls">Pause</span>
          ) : (
            // Play icon
            <span class="controls">Play</span>
          )}
        </button>
        
        <button 
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            // Volume muted icon
            <span class="controls">Unmute</span>
          ) : (
            // Volume icon
            <span class="controls">Mute</span>
          )}
        </button>
      </div>
      </div>
    </div>
  )
}