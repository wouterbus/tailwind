import { useRef, useState } from 'react'
import videoFile from '../assets/videoplayback.mp4'

export default function Hero() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  const togglePause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPaused(false)
    } else {
      videoRef.current.pause()
      setPaused(true)
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videoplayback.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient border */}
      <div className="absolute inset-0 p-[2px] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 z-10 pointer-events-none">
        <div className="w-full h-full bg-black"></div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 text-white">
        {/* Top right icon */}
        <div className="flex justify-end">
          <div className="w-10 h-10 bg-white/80 rounded-full"></div>
        </div>

        {/* Centered text */}
        <h1 className="text-[5vw] leading-[1.1] font-semibold mix-blend-difference text-white">
          Foras<br />teira.
        </h1>

        {/* Bottom buttons */}
        <div className="flex justify-between text-sm">
          <button onClick={toggleMute} className="font-bold">
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <button onClick={togglePause} className="font-bold">
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  )
}
