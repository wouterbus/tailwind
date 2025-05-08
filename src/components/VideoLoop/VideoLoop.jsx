import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoLoop.css';
import HighlightedText from "@/components/HighlightedText/HighlightedText";

const VideoHoverPreview = ({
  videoSrc,
  fullProjectLink,
  thumbnailAlt = "Project thumbnail",
  title,
  description,
  highlightWord
}) => {  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // you can adjust this threshold if needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loopPreview = () => {
      if (video.currentTime >= 4) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', loopPreview);

    if (isHovering || isMobile) {
      video.currentTime = 0;
      video.play().catch((err) => console.error("Error playing video:", err));
    } else {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      video.removeEventListener('timeupdate', loopPreview);
    };
  }, [isHovering, isMobile]);

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

    video.currentTime = 3;
    video.addEventListener('seeked', drawThumbnail, { once: true });
  };

  return (
    <div>
    <div
      data-cursor="view"
      className="video-container"
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
    >
      <Link to={fullProjectLink}>
        <div className="video-inner">
          <img
            ref={thumbnailRef}
            alt={thumbnailAlt}
            className="thumbnail"
            style={{ opacity: (isHovering || isMobile) ? 0 : 1 }}
          />
          <video
            ref={videoRef}
            src={videoSrc}
            className="video"
            muted
            preload="auto"
            playsInline
            onLoadedMetadata={handleVideoLoaded}
            style={{ opacity: (isHovering || isMobile) ? 1 : 0 }}
          />
          {(isHovering || isMobile) && <div className="overlay" />}
        </div>
      </Link>
    </div>
    <div className="video-info">
    <h3 className="video-title">
    <HighlightedText title={title} highlight={highlightWord} />
    </h3>
      {description && <p className="video-description">{description}</p>}
    </div>
    </div>
  );
};

export default VideoHoverPreview;
