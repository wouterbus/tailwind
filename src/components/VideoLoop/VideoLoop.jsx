import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoLoop.css';

const VideoHoverPreview = ({ videoSrc, fullProjectLink, thumbnailAlt = "Project thumbnail", headline }) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loopPreview = () => {
      if (video.currentTime >= 4) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', loopPreview);

    if (isHovering) {
      video.currentTime = 0;
      video.play().catch((err) => console.error("Error playing video:", err));
    } else {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      video.removeEventListener('timeupdate', loopPreview);
    };
  }, [isHovering]);

  const handleVideoLoaded = () => {
    const video = videoRef.current;
    const img = thumbnailRef.current;
    if (!video || !img) return;

    const drawThumbnail = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      img.src = canvas.toDataURL();
    };

    video.currentTime = 0;
    video.addEventListener('seeked', drawThumbnail, { once: true });
  };

  return (
    <div
    data-cursor="view"
      className="video-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={fullProjectLink}>
        <div className="video-inner">
          <img
            ref={thumbnailRef}
            alt={thumbnailAlt}
            className="thumbnail"
            style={{ opacity: isHovering ? 0 : 1 }}
          />
          <video
            ref={videoRef}
            src={videoSrc}
            className="video"
            muted
            preload="auto"
            playsInline
            onLoadedMetadata={handleVideoLoaded}
            style={{ opacity: isHovering ? 1 : 0 }}
          />
          {isHovering && <div className="overlay" />}
        </div>
      </Link>
      {headline && <h3 className="headline">{headline}</h3>}
    </div>
  );
};

export default VideoHoverPreview;
