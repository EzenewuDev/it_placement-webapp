import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[100] group transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-50 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      {/* Background with Progress Ring */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="rgba(139, 109, 75, 0.1)"
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="#8b6d4b"
            strokeWidth="2"
            strokeDasharray="163.36"
            strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
            className="transition-all duration-300"
          />
        </svg>

        {/* Button Core */}
        <div className="w-11 h-11 bg-[#8b6d4b] rounded-full flex items-center justify-center shadow-lg shadow-[#8b6d4b]/40 group-hover:scale-110 transition-transform duration-300">
          <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
        </div>

        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-black/80 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
          Back to Top
        </span>
      </div>
    </button>
  );
};

export default BackToTop;
