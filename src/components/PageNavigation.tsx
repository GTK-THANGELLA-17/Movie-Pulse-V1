
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface SectionRef {
  id: string;
  label: string;
}

const PageNavigation = ({ sections = [] }: { sections?: SectionRef[] }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling down a bit
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Button click animation effect
  const buttonClickEffect = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - diameter / 2}px`;
    circle.classList.add('ripple');
    
    const ripple = btn.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    btn.appendChild(circle);
    
    // Remove the span after the animation completes
    setTimeout(() => {
      circle.remove();
    }, 600);
  };
  
  return (
    <AnimatePresence>
      {showScrollButton && (
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            buttonClickEffect(e);
            scrollToTop();
          }}
          className="fixed right-8 bottom-10 z-40 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors relative overflow-hidden"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default PageNavigation;
