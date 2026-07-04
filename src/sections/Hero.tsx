import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles, ArrowRight, Play } from 'lucide-react';
import { heroConfig } from '../config';

const Hero = () => {
  if (!heroConfig.title) return null;

  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#subhero');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleLines = heroConfig.title.split('\n');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Parallax Background with Mouse Effect */}
      <div
        className="absolute inset-0 parallax-bg transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${heroConfig.backgroundImage})`,
          transform: `scale(1.1) translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Tagline */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm tracking-[0.2em] font-medium uppercase">
              {heroConfig.tagline}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl leading-tight transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          Machine Learning-powered placement system for Lead City University students. 
          Find your perfect industrial training match in 72 hours.
        </p>

        {/* CTA Buttons */}
        <div
          className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {heroConfig.ctaPrimaryText && (
            <Link
              to="/apply"
              className="group px-6 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-medium tracking-wide text-sm sm:text-base rounded-full hover:shadow-xl hover:shadow-[#8b6d4b]/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {heroConfig.ctaPrimaryText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {heroConfig.ctaSecondaryText && (
            <button
              onClick={() => document.querySelector(heroConfig.ctaSecondaryTarget)?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-6 sm:px-10 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium tracking-wide text-sm sm:text-base rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              {heroConfig.ctaSecondaryText}
            </button>
          )}
        </div>

        {/* Stats */}
        <div
          className={`mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1100ms' }}
        >
          {[
            { value: '95%', label: 'Placement Rate' },
            { value: '72h', label: 'Processing Time' },
            { value: '287+', label: 'Students Placed' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1400ms' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={24} strokeWidth={1.5} className="animate-bounce" />
        </div>
      </button>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
