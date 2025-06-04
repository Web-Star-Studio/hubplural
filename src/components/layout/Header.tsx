'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react'; // Renamed to avoid conflict if a Menu component is made later
import FullScreenNav from '@/components/custom/FullScreenNav'; // New menu

const MOCK_FULL_SCREEN_NAV_ITEMS = [
  { id: 'home', label: 'HOME', href: '#', imageSrc: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
  { id: 'sobre', label: 'SOBRE', href: '#', imageSrc: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
  { id: 'blog', label: 'BLOG', href: '#', imageSrc: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
  { id: 'localizacao', label: 'LOCALIZAÇÃO', href: '#', imageSrc: 'https://images.unsplash.com/photo-1504829857779-6274fd28919e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
  { id: 'contato', label: 'CONTATO', href: '#', imageSrc: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80' },
];

const HeaderRevised = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Specific close function for clarity when passing to menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-30 pt-6 text-white">
        {/* Increased z-index to 30 to be above hero's overlay (z-20 if any, image is z-10) but below menu (z-40) */}
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold tracking-wider">
              <Image
                src="/hub-plural-logo-branca.png"
                alt="Hub Plural Logo"
                width={150}
                height={40}
                priority
              />
            </Link>
            <button
              onClick={toggleMenu} // This button opens the menu
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Open menu"
            >
              <MenuIcon size={32} />
            </button>
          </div>
          <div className="mt-6 h-px bg-white opacity-30"></div>
        </div>
      </div>
      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={MOCK_FULL_SCREEN_NAV_ITEMS}
      />
    </>
  );
};

export { HeaderRevised as Header }; 