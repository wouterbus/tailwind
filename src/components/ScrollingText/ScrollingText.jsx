import { useEffect, useRef } from 'react';
import './ScrollingText.css';

export default function ScrollingText() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let scrollAmount = 0;

    const step = () => {
      scrollAmount += 1;
      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0; // reset to seamless loop
      }
      track.style.transform = `translateX(-${scrollAmount}px)`;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider-track" ref={trackRef}>
        <div className="scroll-content">
          {/** First copy */}
          <h1>
            PROJETOS <span>DESTACADOS</span>
            <img className="separator-icon" src="/starburst-cyan.svg" alt="*" />
            PROJETOS <span>DESTACADOS</span>
            <img className="separator-icon" src="/starburst-red.svg" alt="*" />
            PROJETOS <span>DESTACADOS</span>
            <img className="separator-icon" src="/starburst-black.svg" alt="*" />
          </h1>
          {/** Second copy */}
          <h1>
            PROJETOS <span>DESTACADOS</span>
            <img className="separator-icon" src="/starburst-cyan.svg" alt="*" />
            PROJETOS <span>DESTACADOS</span>
            <img className="separator-icon" src="/starburst-red.svg" alt="*" />
            PROJETOS <span>DESTACADOS</span>
            <img className="separator-icon" src="/starburst-black.svg" alt="*" />
          </h1>
        </div>
      </div>
    </div>
  );
}
