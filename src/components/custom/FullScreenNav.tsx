import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  // We'll define the structure for menu items and their associated images later
  // For now, let's assume a simple array of objects
  menuItems: Array<{
    id: string;
    label: string;
    href: string;
    imageSrc: string; // Placeholder for image path
  }>;
}

const ANIMATION_DURATION = 600; // ms - Increased for smoother animation

const FullScreenNav: React.FC<FullScreenNavProps> = ({
  isOpen,
  onClose,
  menuItems,
}) => {
  const defaultImageSrc = menuItems.length > 0 ? menuItems[0].imageSrc : ''; // Fallback to empty string if no items
  const [hoveredItemImage, setHoveredItemImage] = useState<string>(defaultImageSrc);
  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setHoveredItemImage(defaultImageSrc); // Ensure default image is set when menu opens
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 50); // Slight delay for smoother entrance
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen, defaultImageSrc]); // Added defaultImageSrc to dependency array

  // Handle body scroll lock
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
      {/* Left Side: Image Display - Hidden on mobile, takes half width on md+ */}
      <div
        className={`hidden md:block md:w-1/2 h-full bg-gray-200 relative transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Always render Image component if an imageSrc is available */}
        {hoveredItemImage && (
          <Image
            key={hoveredItemImage} // Add key to force re-render on src change for transition
            src={hoveredItemImage}
            alt="Menu item visual"
            fill={true}
            className="object-cover transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          />
        )}
      </div>

      {/* Right Side: Menu Items & Controls - Full width on mobile, half width on md+ */}
      <div
        className={`w-full md:w-1/2 h-full bg-white p-6 sm:p-8 md:p-16 flex flex-col overflow-y-auto transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Section: MENU title and Close Button */}
        <div className={`flex justify-between items-center mb-8 sm:mb-12 md:mb-20 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: animateIn ? '200ms' : '0ms' }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-black uppercase" style={{ WebkitTextStroke: '1px black', color: 'transparent' }}>
            MENU
          </h1>
          <button
            onClick={onClose}
            className="text-black text-sm font-medium hover:text-gray-700 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 flex items-center space-x-2"
            aria-label="Close menu"
          >
            <span>CLOSE</span>
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          <ul className="space-y-0">
            {menuItems.map((item, index) => (
              <li
                key={item.id}
                onMouseEnter={() => setHoveredItemImage(item.imageSrc)}
                onMouseLeave={() => setHoveredItemImage(defaultImageSrc)} // Set back to default image
                className={`border-t border-neutral-400 py-3 sm:py-4 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${index === 0 ? 'border-t-0 pt-0' : ''} ${index === menuItems.length -1 ? 'border-b border-neutral-400' : ''}`}
                style={{ transitionDelay: animateIn ? `${300 + (index * 100)}ms` : '0ms' }}
              >
                <Link href={item.href}>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase hover:underline transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-2 hover:text-gray-700 block">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Optional Footer - if needed for "BE PART OF" or social links later */}
        {/* <div className="mt-auto">
          <p>Footer content</p>
        </div> */}
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