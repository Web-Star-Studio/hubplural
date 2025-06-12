import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, MapPin, Clock, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '@/data/hubPluralContent';

interface MenuLocation {
  id: string;
  label: string;
  href: string;
}

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    id: string;
    label: string;
    href: string;
    imageSrc: string;
  }>;
}

const ANIMATION_DURATION = 800;

// Simplified locations - only key locations
const KEY_LOCATIONS: MenuLocation[] = [
  { id: 'recife', label: 'Recife', href: '/localizacao/recife' },
  { id: 'fortaleza', label: 'Fortaleza', href: '/localizacao/fortaleza' },
  { id: 'caruaru', label: 'Caruaru', href: '/localizacao/caruaru' },
];

// Simplified services - only main ones
const KEY_SERVICES = [
  { id: 'coworking', label: 'Coworking', href: '/servicos/coworking' },
  { id: 'escritorios', label: 'Escritórios', href: '/servicos/escritorios' },
  { id: 'salas', label: 'Salas de Reunião', href: '/servicos/salas' },
];

const FullScreenNav: React.FC<FullScreenNavProps> = ({
  isOpen,
  onClose,
  menuItems,
}) => {
  const defaultImageSrc = menuItems.length > 0 ? menuItems[0].imageSrc : '';
  const [hoveredItemImage, setHoveredItemImage] = useState<string>(defaultImageSrc);
  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [activeSection, setActiveSection] = useState<'nav' | 'services' | 'locations'>('nav');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setHoveredItemImage(defaultImageSrc);
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      setActiveSection('nav');
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen, defaultImageSrc]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 font-['Inter',_sans-serif]"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <motion.div
              key={hoveredItemImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={hoveredItemImage}
                alt="Hub Plural"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          </div>

          {/* Mobile Close Button - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-6 right-6 z-20 md:hidden"
          >
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
              aria-label="Close menu"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Main Content */}
          <div className="relative z-10 h-full flex flex-col md:flex-row">
            
            {/* Navigation Section - Full width on mobile */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full md:w-3/5 lg:w-1/2 h-full flex flex-col justify-center p-6 md:p-12 lg:p-16 overflow-y-auto"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12 md:mb-16 mt-4 md:mt-0"
              >
                <Link href="/" onClick={onClose} className="inline-block">
                  <Image
                    src="/hub-plural-logo-branca.png"
                    alt="Hub Plural Logo"
                    width={isMobile ? 180 : 220}
                    height={isMobile ? 48 : 60}
                    priority
                  />
                </Link>
              </motion.div>

              {/* Main Navigation */}
              <nav className="space-y-1 md:space-y-2 mb-8 md:mb-0">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    className="group"
                  >
                    <Link 
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 md:py-4 text-white hover:text-amber-400 transition-all duration-500 active:text-amber-400 touch-manipulation"
                      onMouseEnter={() => !isMobile && setHoveredItemImage(item.imageSrc)}
                      onMouseLeave={() => !isMobile && setHoveredItemImage(defaultImageSrc)}
                      onTouchStart={() => isMobile && setHoveredItemImage(item.imageSrc)}
                    >
                      <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight">
                        {item.label}
                      </span>
                      <ChevronRight 
                        size={isMobile ? 20 : 24} 
                        className="opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 text-amber-400 flex-shrink-0 ml-4" 
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 md:mt-16 flex flex-col md:flex-row gap-4"
              >
                <button
                  onClick={() => setActiveSection('services')}
                  className={`px-6 py-3 rounded-full border border-white/30 text-white transition-all duration-300 hover:bg-white/10 active:bg-white/20 touch-manipulation ${
                    activeSection === 'services' ? 'bg-amber-400 text-black border-amber-400' : ''
                  }`}
                >
                  Serviços
                </button>
                <button
                  onClick={() => setActiveSection('locations')}
                  className={`px-6 py-3 rounded-full border border-white/30 text-white transition-all duration-300 hover:bg-white/10 active:bg-white/20 touch-manipulation ${
                    activeSection === 'locations' ? 'bg-amber-400 text-black border-amber-400' : ''
                  }`}
                >
                  Localizações
                </button>
              </motion.div>

              {/* Mobile Dynamic Content */}
              <div className="md:hidden mt-8">
                <AnimatePresence mode="wait">
                  {activeSection === 'services' && (
                    <motion.div
                      key="mobile-services"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-light text-white mb-6">Nossos Serviços</h3>
                      {KEY_SERVICES.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Link
                            href={service.href}
                            onClick={onClose}
                            className="block p-4 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all duration-300 text-white group touch-manipulation"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-base font-light">{service.label}</span>
                              <ChevronRight size={16} className="transition-transform duration-300 text-amber-400" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeSection === 'locations' && (
                    <motion.div
                      key="mobile-locations"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-light text-white mb-6">Nossas Unidades</h3>
                      {KEY_LOCATIONS.map((location, index) => (
                        <motion.div
                          key={location.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Link
                            href={location.href}
                            onClick={onClose}
                            className="block p-4 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all duration-300 text-white group touch-manipulation"
                          >
                            <div className="flex items-center space-x-3">
                              <MapPin size={16} className="text-amber-400 flex-shrink-0" />
                              <span className="text-base font-light">{location.label}</span>
                              <ChevronRight size={16} className="ml-auto transition-transform duration-300 text-amber-400" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Side - Desktop Only Dynamic Content */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="hidden md:flex w-2/5 lg:w-1/2 h-full flex-col justify-center p-8 md:p-12 lg:p-16 bg-white/5 backdrop-blur-md"
            >
              {/* Desktop Close Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-8 right-8"
              >
                <button
                  onClick={onClose}
                  className="w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
                  aria-label="Close menu"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </motion.div>

              {/* Desktop Dynamic Content */}
              <AnimatePresence mode="wait">
                {activeSection === 'services' && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-light text-white mb-8">Nossos Serviços</h3>
                    {KEY_SERVICES.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link
                          href={service.href}
                          onClick={onClose}
                          className="block p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-light">{service.label}</span>
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'locations' && (
                  <motion.div
                    key="locations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-light text-white mb-8">Nossas Unidades</h3>
                    {KEY_LOCATIONS.map((location, index) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link
                          href={location.href}
                          onClick={onClose}
                          className="block p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white group"
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin size={16} className="text-amber-400" />
                            <span className="text-lg font-light">{location.label}</span>
                            <ChevronRight size={16} className="ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === 'nav' && (
                  <motion.div
                    key="nav"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-white/80">
                      <h3 className="text-2xl font-light mb-4">Hub Plural</h3>
                      <p className="text-lg font-light leading-relaxed mb-6">
                        Espaços de trabalho colaborativo que inspiram inovação e conectam pessoas.
                      </p>
                      
                      <div className="flex items-center space-x-3 text-amber-400 mb-4">
                        <Clock size={16} />
                        <span className="text-sm">Seg-Sex: 8h às 18h</span>
                      </div>
                      
                      <Link
                        href="/contato"
                        onClick={onClose}
                        className="inline-flex items-center space-x-2 text-amber-400 hover:text-white transition-colors duration-300"
                      >
                        <span>Agendar Visita</span>
                        <ChevronRight size={16} />
                      </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4 pt-8 border-t border-white/20">
                      <Link 
                        href={contact.socialMedia.facebook || "#"} 
                        target="_blank"
                        className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <span className="sr-only">Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </Link>
                      <Link 
                        href={contact.socialMedia.instagram || "#"} 
                        target="_blank"
                        className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z"/>
                        </svg>
                      </Link>
                      <Link 
                        href={contact.socialMedia.linkedin || "#"} 
                        target="_blank"
                        className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenNav;

// Example Usage (would go in Header.tsx or similar):
/*
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MOCK_MENU_ITEMS = [
    { id: 'home', label: 'HOME', href: '/', imageSrc: '/placeholder-home.jpg' },
    { id: 'sobre', label: 'SOBRE', href: '/sobre', imageSrc: '/placeholder-sobre.jpg' },
    { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: '/placeholder-blog.jpg' },
    { id: 'localizacao', label: 'LOCALIZAÇÃO', href: '/localizacao', imageSrc: '/placeholder-localizacao.jpg' },
    { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: '/placeholder-contato.jpg' },
  ];

  return (
    <div>
      <button onClick={() => setIsMenuOpen(true)}>Open Menu</button>
      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={MOCK_MENU_ITEMS}
      />
    </div>
  );
};
*/ 