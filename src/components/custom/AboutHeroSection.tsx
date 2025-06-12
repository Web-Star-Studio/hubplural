'use client';

import { motion } from 'framer-motion';
import { Dot, Mouse } from 'lucide-react';

const ScrollDownIcon = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    className="hidden md:flex flex-col items-center space-y-2"
  >
    <Mouse className="w-8 h-8" />
    <span className="text-xs font-light tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
      Nossa História
    </span>
  </motion.div>
);

const ArrowIcon = () => (
  <motion.svg 
    initial={{ opacity: 0, rotate: -45 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="hidden md:block w-12 h-12 md:w-16 md:h-16 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V18" />
  </motion.svg>
);

export default function AboutHeroSection() {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://hubplural.com/wp-content/uploads/2023/01/BANNER_SOBRE-1024x770.png"
          alt="Hub Plural - Sobre Nós"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Enhanced gradient overlay for better mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 md:from-black/60 md:via-black/40 md:to-black/60"></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-6 md:p-8 lg:p-16">
        {/* Top spacer for header */}
        <div className="h-16 md:h-20"></div>

        {/* Left Scroll Indicator - Hidden on mobile */}
        <div className="absolute top-1/2 left-6 md:left-8 lg:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-end h-full pb-8 md:pb-0">
          <div className="flex items-end w-full">
            {/* Spacer for scroll indicator - Reduced on mobile */}
            <div className="flex-shrink-0 w-0 md:w-24 lg:w-32"></div>

            {/* Text Content */}
            <div className="flex-grow max-w-full md:max-w-4xl xl:max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs sm:text-sm font-light tracking-[0.2em] text-white/80 mb-4 md:mb-6 uppercase"
              >
                Sobre o Hub Plural
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-4 md:mb-6"
              >
                Transformando Espaços,
                <br />
                <span className="text-white/90">Conectando Pessoas</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-6 md:mb-8"
              >
                Há mais de uma década, o Hub Plural revoluciona o conceito de trabalho em Recife, 
                criando ambientes que inspiram inovação, colaboração e crescimento profissional.
              </motion.p>

              {/* Enhanced stats section for mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-8"
              >
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide">Desde 2012</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide">+5000 Membros</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide">15 Unidades</span>
                </div>
              </motion.div>
            </div>

            {/* Arrow Icon - Hidden on mobile */}
            <div className="ml-auto pl-4 md:pl-8">
              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ height: [0, 16, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 bg-amber-400 rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 