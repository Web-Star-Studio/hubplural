import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Facebook, Instagram, Linkedin } from 'lucide-react';
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

const ANIMATION_DURATION = 600; // ms

const RECIFE_LOCATIONS: MenuLocation[] = [
  { id: 'aflitos', label: 'AFLITOS', href: '/localizacao/aflitos' },
  { id: 'boa-viagem', label: 'BOA VIAGEM', href: '/localizacao/boa-viagem' },
  { id: 'ilha-do-leite', label: 'ILHA DO LEITE', href: '/localizacao/ilha-do-leite' },
  { id: 'recife-antigo', label: 'RECIFE ANTIGO', href: '/localizacao/recife-antigo' },
  { id: 'varzea', label: 'VÁRZEA', href: '/localizacao/varzea' },
];

const OTHER_REGIONS: MenuLocation[] = [
  { id: 'caruaru', label: 'CARUARU', href: '/localizacao/caruaru' },
  { id: 'fortaleza', label: 'FORTALEZA', href: '/localizacao/fortaleza' },
  { id: 'petrolina', label: 'PETROLINA', href: '/localizacao/petrolina' },
];

const HUB_OPTIONS = [
  'MIM',
  '2 OU 6',
  'GENTE QUE SÓ',
];

const MORE_OPTIONS = [
  'CAIXA POSTAL',
  'ESTAÇÃO FIXA', 
  'ESCRITÓRIO FLEXÍVEL',
  'SALAS DE REUNIÃO',
  'MEMBERSHIP',
  'COWORKING PLURAL',
  'EVENTOS',
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
    <div
      className={`fixed inset-0 flex z-50 font-['Inter',_sans-serif] transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Left Side: Menu Content */}
      <div
        className={`w-full md:w-1/2 h-full bg-black text-white p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] scrollbar-none ${
          animateIn ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className={`mb-8 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: animateIn ? '100ms' : '0ms' }}
        >
          <Link href="/" className="inline-block">
            <Image
              src="/hub-plural-logo-branca.png"
              alt="Hub Plural Logo"
              width={200}
              height={53}
              priority
            />
          </Link>
        </div>

        {/* Hub Options Section */}
        <div className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: animateIn ? '200ms' : '0ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-secondary mb-6">
            quero um HUB para
          </h2>
          <ul className="space-y-3">
            {HUB_OPTIONS.map((option, index) => (
              <li key={option}>
                <Link 
                  href="#"
                  className="text-white text-lg font-light hover:text-secondary transition-colors duration-300 block border-b border-gray-700 pb-2"
                >
                  {option}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Options Section */}
        <div className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: animateIn ? '300ms' : '0ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-secondary mb-6">
            e ainda mais...
          </h2>
          <ul className="space-y-3">
            {MORE_OPTIONS.map((option, index) => (
              <li key={option}>
                <Link 
                  href="#"
                  className="text-white text-lg font-light hover:text-secondary transition-colors duration-300 block border-b border-gray-700 pb-2"
                >
                  {option}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side: Navigation & Locations */}
      <div
        className={`w-full md:w-1/2 h-full bg-white p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] scrollbar-none ${
          animateIn ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className={`flex justify-end mb-8 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: animateIn ? '200ms' : '0ms' }}
        >
          <button
            onClick={onClose}
            className="text-black text-sm font-medium hover:text-gray-700 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 flex items-center space-x-2"
            aria-label="Close menu"
          >
            <span>CLOSE</span>
            <X size={20} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: animateIn ? '300ms' : '0ms' }}
        >
          <ul className="space-y-6">
            {menuItems.map((item, index) => (
              <li key={item.id}>
                <Link 
                  href={item.href}
                  className="text-black text-xl md:text-2xl font-medium hover:text-accent transition-all duration-300 block border-b border-gray-300 pb-4"
                  onMouseEnter={() => setHoveredItemImage(item.imageSrc)}
                  onMouseLeave={() => setHoveredItemImage(defaultImageSrc)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Locations Section */}
        <div className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: animateIn ? '400ms' : '0ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-secondary mb-8">
            todo canto
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recife Locations */}
            <div>
              <h3 className="text-xl font-medium text-black mb-4">RECIFE</h3>
              <ul className="space-y-3">
                {RECIFE_LOCATIONS.map((location) => (
                  <li key={location.id}>
                    <Link 
                      href={location.href}
                      className="text-gray-700 hover:text-accent transition-colors duration-300 text-sm font-light"
                    >
                      {location.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Regions */}
            <div>
              <h3 className="text-xl font-medium text-black mb-4">OUTRAS REGIÕES</h3>
              <ul className="space-y-3">
                {OTHER_REGIONS.map((location) => (
                  <li key={location.id}>
                    <Link 
                      href={location.href}
                      className="text-gray-700 hover:text-accent transition-colors duration-300 text-sm font-light"
                    >
                      {location.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className={`mt-auto flex flex-col items-end space-y-4 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: animateIn ? '500ms' : '0ms' }}
        >
          <Link 
            href={contact.socialMedia.facebook || "https://facebook.com/hubplural"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-accent transition-colors duration-300"
          >
            <Facebook size={24} />
          </Link>
          <Link 
            href={contact.socialMedia.instagram || "https://instagram.com/hubplural"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-accent transition-colors duration-300"
          >
            <Instagram size={24} />
          </Link>
          <Link 
            href={contact.socialMedia.linkedin || "https://linkedin.com/company/hubplural"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-accent transition-colors duration-300"
          >
            <Linkedin size={24} />
          </Link>
        </div>
      </div>
    </div>
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