import { useEffect, useRef, useState } from 'react'

export default function CustomCursor({ children }) {
  const cursorRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }

      // Traverse up the DOM to check for clickable elements
      let el = e.target
      let clickable = false

      while (el) {
        if (
          el.tagName === 'BUTTON' ||
          el.tagName === 'A' ||
          el.getAttribute?.('role') === 'button' ||
          el.onclick ||
          el.classList?.contains('cursor-pointer')
        ) {
          clickable = true
          break
        }
        el = el.parentElement
      }

      setIsClickable(clickable)
    }

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isVisible])

  return (
    <>
      <div
        className="cursor-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={cursorRef}
          id="custom-cursor"
          className={`
            pointer-events-none fixed z-[9999]
            transition-all duration-200 ease-out
            ${isClickable 
              ? 'w-10 h-10 bg-blue-500 animate-pulse' 
              : 'w-6 h-6 border-2 border-white'}
            rounded-full
          `}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      )}
    </>
  )
}
