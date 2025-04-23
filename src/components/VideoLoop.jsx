import { useRef, useEffect } from 'react'

export default function VideoThumbnail({ src, link, poster, loopDuration = 4 }) {
  const videoRef = useRef(null)

  // Play only the first `loopDuration` seconds
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.currentTime >= loopDuration) {
        video.currentTime = 0
        video.play()
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [loopDuration])

  const handleMouseEnter = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play().catch(() => {})  // silent fail
  }

  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <a
        href={link}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          See full project
        </button>
      </a>
    </div>
  )
}
