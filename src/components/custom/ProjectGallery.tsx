'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImage {
  id: string;
  backgroundUrl: string;
  centerUrl: string;
  title: string;
  subtitle: string;
}

const projectImages: ProjectImage[] = [
  {
    id: '1',
    backgroundUrl: 'https://lh3.googleusercontent.com/gg-dl/AJfQ9KTTf3psojldG9pkLxSjogqLiRJM3j0tWuTV89aZ2u4ucokssNKnR0kefUdEvyJUNjDJWKD3tRogdjruzQpXy31xWsp2xISDSgpAeCZE1-WzHat4WEBfm2ekaav05IFOBXPQf2LPKYyjL5aHawvkYEPhBqWdJGLp_vHQQ-ho5x2Lt0ebuQ=s1024',
    centerUrl: 'https://lh3.googleusercontent.com/gg-dl/AJfQ9KRl9KlAwE9pkPECwEFkgO5NvYH0T8ZUf4K3anqINZ_LFgeg0Jv5JYsHQMqNVp4FEMbnxze6si7xw4WwpiEwYTvz2mbmTk5qfP1voYiG_4d5PnW_c0xcaDqbFDFcw1WQRJYYu3nknUyknMdm6uZ3eGO01fYlyRfG__BicKrXWXH_54bCQQ=s1024',
    title: 'RECIFE',
    subtitle: 'HUB PRA MIM'
  },
  {
    id: '2',
    backgroundUrl: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    centerUrl: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'RECIFE',
    subtitle: 'HUB PRA 2 OU 6'
  },
  {
    id: '3',
    backgroundUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    centerUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'RECIFE',
    subtitle: 'HUB PRA GENTE QUE SÓ'
  },
  {
    id: '4',
    backgroundUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    centerUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'CARUARU',
    subtitle: 'HUB PRA MIM'
  },
  {
    id: '5',
    backgroundUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    centerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'FORTALEZA',
    subtitle: 'HUB PRA 2 OU 6'
  },
  {
    id: '6',
    backgroundUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    centerUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'FORTALEZA',
    subtitle: 'HUB PRA GENTE QUE SÓ'
  }
];

const ProjectGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prevImage();
      if (event.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isClient) {
    return (
      <section className="h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-neutral-400">Loading gallery...</div>
      </section>
    );
  }

  const currentImage = projectImages[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentImage.id}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.backgroundUrl}
            alt={currentImage.title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 z-20">
        <button
          onClick={prevImage}
          className="group flex items-center text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-light tracking-wider">PREV</span>
        </button>
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20">
        <button
          onClick={nextImage}
          className="group flex items-center text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Next image"
        >
          <span className="text-sm font-light tracking-wider">NEXT</span>
          <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Project Info */}
      <div className="absolute top-8 left-8 z-20 text-white">
        <motion.h2
          key={`title-${currentImage.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold tracking-wider"
        >
          {currentImage.title}
        </motion.h2>
      </div>

      {/* Counter */}
      <div className="absolute top-8 right-8 z-20 text-white">
        <motion.div
          key={`counter-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-light"
        >
          {currentIndex + 1} / {projectImages.length}
        </motion.div>
      </div>

      {/* Center Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${currentImage.id}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src={currentImage.centerUrl}
              alt={currentImage.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center text-white">
        <motion.p
          key={`subtitle-${currentImage.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl font-light tracking-wider"
        >
          {currentImage.subtitle}
        </motion.p>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex space-x-1">
        {projectImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-accent' 
                : 'w-4 bg-white/30 hover:bg-white/50 cursor-pointer'
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Bottom Left Label */}
      <div className="absolute bottom-8 left-8 z-20 text-white/50 text-xs tracking-wider">
        PORTFOLIO SHOWCASE
      </div>
    </section>
  );
};

export default ProjectGallery; 