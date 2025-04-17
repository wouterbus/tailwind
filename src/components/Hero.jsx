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
      
      {/* Custom Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-50 px-4 py-2 rounded-full">
        <button 
          onClick={togglePlay}
          className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            // Pause icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            // Play icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        
        <button 
          onClick={toggleMute}
          className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            // Volume muted icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            // Volume icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}