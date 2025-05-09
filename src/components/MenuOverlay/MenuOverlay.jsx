import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ React Router Link
import hamburgerLine from '@/assets/hamburger-line.svg';
import "@/components/MenuOverlay/MenuOverlay.css"
import starburst from '/hamburger-spin-bg.svg';
import { useEffect } from 'react';

export default function MenuOverlay({ isOpen, toggle }) {
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Quem Somos', path: '/quem-somos' },
    { label: 'Como tudo acontece', path: '/como-tudo-acontece' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contato', path: '/contato' }
  ];

  useEffect(() => {
    if (!isOpen) return;
  
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
  
      if (scrollY > viewportHeight * 0.2) {
        toggle(); // close the menu
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, toggle]);
  

  return (
    <>
      {/* Toggle button */}
      <div className="absolute top-3 right-0 z-50">
  <button
    onClick={toggle}
    className="w-[100px] h-[100px] flex items-center justify-center bg-black border-none cursor-pointer relative"
  >
    <div className="relative w-[100px] h-[100px] flex items-center justify-center menu-overlay">

      {/* 🍔 Hamburger / Close Icon */}
      {isOpen ? (
        <>
          <motion.img
            src={hamburgerLine}
            alt="line1"
            className="absolute w-[40px] h-auto origin-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 45 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.img
            src={hamburgerLine}
            alt="line2"
            className="absolute w-[40px] h-auto origin-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: -45 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2 items-center"
        >
          {[...Array(3)].map((_, i) => (
            <motion.img
              key={i}
              src={hamburgerLine}
              alt="menu line"
              className="w-[40px] h-auto"
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md text-white flex flex-col items-center justify-center space-y-6"
          >
            <motion.nav
              className="text-1xl font-semibold space-y-8 text-violet-500"
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
              {menuItems.map(({ label, path }) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 20 }
                  }}
                >
<Link
  to={path}
  onClick={toggle}
  className="group relative flex items-center gap-2 transition-opacity"
>
<motion.img
    src={starburst}
    alt="star"
    className="absolute -left-20 w-45 h-45 opacity-0 group-hover:opacity-100 -z-10"
    animate={{ rotate: +360*2 }}
    transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
  />
  {label}
</Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
