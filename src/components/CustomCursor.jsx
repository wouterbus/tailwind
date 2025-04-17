import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Move cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }

      // Check for clickable elements up the DOM
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

    const show = () => setIsVisible(true)
    const hide = () => setIsVisible(false)

    // Attach global events
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', show)
    window.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', show)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    isVisible && (
      <div
        ref={cursorRef}
        id="custom-cursor"
        className={`
          pointer-events-none fixed z-[9999]
          transition-all duration-200 ease-out
          rounded-full
          ${isClickable 
            ? 'w-10 h-10 bg-blue-500 animate-pulse' 
            : 'w-[5px] h-[5px] bg-white mix-blend-exclusion'}
        `}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    )
  )
}
