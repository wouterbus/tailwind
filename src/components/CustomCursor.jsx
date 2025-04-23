import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'pointer' | 'viewmore'

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const updateCursorType = (e) => {
      const target = e.target;
      if (target.closest('[data-cursor="viewmore"]')) {
        setCursorType('viewmore');
      } else if (target.closest('a, button, [role="button"], .cursor-pointer')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', updateCursorType);
    window.addEventListener('mouseout', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', updateCursorType);
      window.removeEventListener('mouseout', updateCursorType);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-exclusion"
      style={{
        width: cursorType === 'default' ? '8px' : cursorType === 'pointer' ? '40px' : '48px',
        height: cursorType === 'default' ? '8px' : cursorType === 'pointer' ? '40px' : '48px',
        borderRadius: '9999px',
        border: cursorType === 'pointer' ? '2px solid white' : 'none',
        backgroundColor: cursorType === 'default' ? 'white' : 'transparent',
        transform: 'translate(-100px, -100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 120ms ease-out',
      }}
    >
      {cursorType === 'viewmore' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )}
    </div>
  );
}
