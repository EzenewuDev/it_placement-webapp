import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center gap-8">
        {/* Main Logo Loader Animation */}
        <div className="relative w-24 h-24">
          {/* Rotating Rings */}
          <div className="absolute inset-0 border-4 border-[#8b6d4b]/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#8b6d4b] rounded-full animate-spin"></div>
          
          {/* Inner Pulsing Circle */}
          <div className="absolute inset-4 bg-[#8b6d4b] rounded-full animate-pulse flex items-center justify-center shadow-lg shadow-[#8b6d4b]/40">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
          </div>
        </div>

        {/* Text Reveal Animation */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-serif font-medium tracking-wider text-[#8b6d4b] overflow-hidden">
            <span className="inline-block animate-reveal">IT PLACEMENT</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-[#8b6d4b]/20"></div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#696969] font-medium">
              Lead City University
            </p>
            <div className="h-[2px] w-8 bg-[#8b6d4b]/20"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-[#f0f0f0] rounded-full overflow-hidden mt-4">
          <div className="h-full bg-[#8b6d4b] rounded-full animate-progress-fast"></div>
        </div>
      </div>

      <style>{`
        @keyframes reveal {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        @keyframes progress-fast {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-fast {
          animation: progress-fast 2s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Loader;
