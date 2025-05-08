import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();

  // Detect screen size (mobile/tablet or desktop)
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint based on your design
    };

    updateScreenSize(); // Initial check
    window.addEventListener('resize', updateScreenSize); // Update on screen resize

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Reset hover state on route change
  useEffect(() => {
    setIsHovering(false);
  }, [location.pathname]);

  useEffect(() => {
    const viewTargets = document.querySelectorAll('[data-cursor="view"]');
    const galleryTargets = document.querySelectorAll('[data-cursor="gallery"]');
  
    const handleViewEnter = () => setIsHovering(true);
    const handleViewLeave = () => setIsHovering(false);
  
    const handleGalleryEnter = () => setIsHovering("gallery");
    const handleGalleryLeave = () => setIsHovering(false);
  
    viewTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleViewEnter);
      el.addEventListener("mouseleave", handleViewLeave);
    });
  
    galleryTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleGalleryEnter);
      el.addEventListener("mouseleave", handleGalleryLeave);
    });
  
    return () => {
      viewTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleViewEnter);
        el.removeEventListener("mouseleave", handleViewLeave);
      });
  
      galleryTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleGalleryEnter);
        el.removeEventListener("mouseleave", handleGalleryLeave);
      });
    };
  }, [location.pathname]);
  

  return (
    <>
      {/* Default white dot cursor */}
      {!isMobile && (
        <div
          className="fixed top-0 left-0 w-[5px] h-[5px] bg-white rounded-full mix-blend-exclusion pointer-events-none z-[9999]"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.01s linear',
          }}
        />
      )}

{!isMobile && (
  <>
    {/* Default small white dot */}
    {isHovering !== "gallery" && isHovering !== true && (
      <div
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-white rounded-full mix-blend-exclusion pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.01s linear',
        }}
      />
    )}

    {/* Rotating view cursor */}
    {isHovering === true && (
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 200 200" fill="none">
          <g className="animate-spin-slow origin-center">
            <path
              d="M102.318 1.035L109.487 7.57133C110.713 8.68729 112.501 8.92144 113.976 8.16419L122.595 3.70533C124.413 2.76374 126.645 3.36158 127.751 5.08533L132.987 13.2557C133.884 14.6507 135.553 15.3432 137.172 14.9895L146.648 12.912C148.645 12.4736 150.648 13.6294 151.271 15.5823L154.21 24.8288C154.713 26.4081 156.148 27.5091 157.802 27.5839L167.492 28.0322C169.535 28.1269 171.174 29.761 171.269 31.8086L171.717 41.4985C171.792 43.1525 172.893 44.5873 174.472 45.0905L183.718 48.0298C185.666 48.6526 186.822 50.6553 186.389 52.6531L184.311 62.1288C183.958 63.7479 184.65 65.4169 186.045 66.3136L194.215 71.5497C195.939 72.6556 196.537 74.8876 195.595 76.706L191.137 85.3248C190.374 86.7994 190.609 88.5879 191.729 89.8135L198.266 96.9826C199.646 98.4971 199.646 100.809 198.266 102.318L191.729 109.487C190.613 110.713 190.379 112.501 191.137 113.976L195.595 122.595C196.537 124.413 195.939 126.645 194.215 127.751L186.045 132.987C184.65 133.884 183.958 135.553 184.311 137.172L186.389 146.648C186.827 148.645 185.671 150.648 183.718 151.271L174.472 154.21C172.893 154.713 171.792 156.148 171.717 157.802L171.269 167.492C171.174 169.535 169.54 171.174 167.492 171.269L157.802 171.717C156.148 171.792 154.713 172.893 154.21 174.472L151.271 183.718C150.648 185.666 148.645 186.822 146.648 186.389L137.172 184.311C135.553 183.958 133.884 184.65 132.987 186.045L127.751 194.215C126.645 195.939 124.413 196.537 122.595 195.595L113.976 191.137C112.501 190.374 110.713 190.609 109.487 191.729L102.318 198.266C100.804 199.646 98.4921 199.646 96.9825 198.266L89.8135 191.729C88.5879 190.613 86.7994 190.379 85.3248 191.137L76.706 195.595C74.8876 196.537 72.6556 195.939 71.5496 194.215L66.3136 186.045C65.4169 184.65 63.7479 183.958 62.1288 184.311L52.6531 186.389C50.6553 186.827 48.6526 185.671 48.0298 183.718L45.0905 174.472C44.5873 172.893 43.1525 171.792 41.4985 171.717L31.8086 171.269C29.766 171.174 28.1269 169.54 28.0322 167.492L27.5839 157.802C27.5091 156.148 26.4081 154.713 24.8288 154.21L15.5823 151.271C13.6344 150.648 12.4786 148.645 12.912 146.648L14.9895 137.172C15.3432 135.553 14.6507 133.884 13.2557 132.987L5.08533 127.751C3.36158 126.645 2.76374 124.413 3.70533 122.595L8.16419 113.976C8.92643 112.501 8.69227 110.713 7.57133 109.487L1.035 102.318C-0.345001 100.804 -0.345001 98.4921 1.035 96.9826L7.57133 89.8135C8.68729 88.5879 8.92144 86.7994 8.16419 85.3248L3.70533 76.706C2.76374 74.8876 3.36158 72.6556 5.08533 71.5497L13.2557 66.3136C14.6507 65.4169 15.3432 63.7479 14.9895 62.1288L12.912 52.6531C12.4736 50.6553 13.6294 48.6526 15.5823 48.0298L24.8288 45.0905C26.4081 44.5873 27.5091 43.1525 27.5839 41.4985L28.0322 31.8086C28.1269 29.766 29.761 28.1269 31.8086 28.0322L41.4985 27.5839C43.1525 27.5091 44.5873 26.4081 45.0905 24.8288L48.0298 15.5823C48.6526 13.6344 50.6553 12.4786 52.6531 12.912L62.1288 14.9895C63.7479 15.3432 65.4169 14.6507 66.3136 13.2557L71.5496 5.08533C72.6556 3.36158 74.8876 2.76374 76.706 3.70533L85.3248 8.16419C86.7994 8.92643 88.5879 8.69227 89.8135 7.57133L96.9825 1.035C98.4971 -0.345001 100.809 -0.345001 102.318 1.035Z"
              fill="#FB575C"
            />
          </g>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="white"
            fontSize="32"
            fontFamily="Founders Grotesk"
            fontWeight="bold"
            dy=".3em"
          >
            Abrir projeto.
          </text>
        </svg>
      </div>
    )}

    {/* Horizontal scroll icon when hovering gallery */}
    {isHovering === "gallery" && (
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <img
          src="/horizontalscrollicon.svg"
          alt="horizontal scroll"
          width={152}
          height={152}
        />
      </div>
    )}
  </>
)}

    </>
  );
}
