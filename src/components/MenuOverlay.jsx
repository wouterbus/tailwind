import { motion, AnimatePresence } from 'framer-motion'
import hamburgerLine from '../assets/hamburger-line.svg'

export default function MenuOverlay({ isOpen, toggle }) {
  return (
    <>
      {/* Toggle button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggle}
          className="w-[100px] h-[100px] flex items-center justify-center bg-transparent border-none cursor-pointer relative"
        >
          <div className="relative w-[100px] h-[100px] flex items-center justify-center">
            {isOpen ? (
              <>
                <motion.img
                  src={hamburgerLine}
                  alt="line1"
                  className="absolute w-[100px] h-auto origin-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <motion.img
                  src={hamburgerLine}
                  alt="line2"
                  className="absolute w-[100px] h-auto origin-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -45 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-4 items-center"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.img
                    key={i}
                    src={hamburgerLine}
                    alt="menu line"
                    className="w-[100px] h-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </button>
      </div>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md text-white flex flex-col items-center justify-center space-y-6"
          >
            <motion.nav
              className="text-2xl font-semibold space-y-4 text-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.07,
                  }
                },
                exit: { opacity: 0, y: 30, transition: { staggerDirection: -1 } }
              }}
            >
              {['Home', 'Work', 'About', 'Contact'].map((label) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={toggle}
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 20 }
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
