import { useState, useRef, useEffect } from 'react';
import './VideoLoop.css';
import { div } from 'framer-motion/client';
import { Link } from 'react-router-dom';


const VideoHoverPreview = ({
  videoSrc,
  fullProjectLink,
  thumbnailAlt = "Project thumbnail",
  headline,
  aspectRatio = "16/9", // default to horizontal
  customWidth = "100%", 
  customHeight = "auto",
  alignment = "center" 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  // Handle video playback based on hover state
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    if (isHovering) {
      // When hovering, play the video
      videoElement.currentTime = 0;
      videoElement.play()
        .catch(err => console.error("Error playing video:", err));
    } else {
      // When not hovering, pause the video
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    
    // Set up loop for the first 4 seconds
    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 4) {
        videoElement.currentTime = 0;
      }
    };
    
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isHovering]);

  // Capture first frame as thumbnail when video is loaded
  const handleVideoLoaded = () => {
    const videoElement = videoRef.current;
    const thumbnailElement = thumbnailRef.current;
    
    if (videoElement && thumbnailElement) {
      // Set video to the first frame
      videoElement.currentTime = 0;
      
      // Draw the first frame on the canvas once it's ready
      videoElement.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        // Set the canvas image as the src for the thumbnail image
        thumbnailElement.src = canvas.toDataURL();
      }, { once: true });
    }
  };

  return (
    <>
  {headline && (
    <h3 className="mb-2 font-semibold">{headline}</h3>
  )}

  <Link to={fullProjectLink} className="block" style={{ width: customWidth }}>
    <div 
      className="relative w-full h-full video-container"
      style={{
        cursor: isHovering ? 'url("/custom-cursor.svg") 16 16, auto' : 'default',
        aspectRatio,
        height: customHeight || 'auto',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Thumbnail Image (First Frame) */}
      <img 
        ref={thumbnailRef} 
        alt={thumbnailAlt} 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        style={{ opacity: isHovering ? 0 : 1 }}
      />
      
      {/* Video Element */}
      <video 
        ref={videoRef}
        src={videoSrc}
        className="absolute w-full h-full object-cover video"
        muted
        preload="auto"
        playsInline
        onLoadedMetadata={handleVideoLoaded}
        style={{ opacity: isHovering ? 1 : 0 }}
      />

      {isHovering && (
        <div className="overlay"></div>
      )}
    </div>
  </Link>
</>
  );
  
};

export default VideoHoverPreview;