'use client';

import { motion } from 'framer-motion';
import { Dot, Mouse } from 'lucide-react';

const ScrollDownIcon = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    className="flex flex-col items-center space-y-2"
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
    className="w-12 h-12 md:w-16 md:h-16 text-white"
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
          src="https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-03.png"
          alt="Hub Plural - Sobre Nós"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16">
        {/* Top spacer for header */}
        <div></div>

        {/* Left Scroll Indicator */}
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-end h-full">
          <div className="flex items-end w-full">
            {/* Spacer for scroll indicator */}
            <div className="flex-shrink-0 w-24 md:w-32"></div>

            {/* Text Content */}
            <div className="flex-grow max-w-4xl xl:max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm font-light tracking-[0.2em] text-white/80 mb-6 uppercase"
              >
                Sobre o Hub Plural
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-6"
              >
                Transformando Espaços,
                <br />
                <span className="text-white/90">Conectando Pessoas</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-base sm:text-lg md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl"
              >
                Há mais de uma década, o Hub Plural revoluciona o conceito de trabalho em Recife, 
                criando ambientes que inspiram inovação, colaboração e crescimento profissional.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-center mt-8 space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-amber-400" />
                  <span className="text-sm font-light tracking-wide">Desde 2012</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-amber-400" />
                  <span className="text-sm font-light tracking-wide">+5000 Membros</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-amber-400" />
                  <span className="text-sm font-light tracking-wide">15 Unidades</span>
                </div>
              </motion.div>
            </div>

            {/* Arrow Icon */}
            <div className="ml-auto pl-4 md:pl-8">
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 