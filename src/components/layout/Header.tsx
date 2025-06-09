'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react'; // Renamed to avoid conflict if a Menu component is made later
import FullScreenNav from '@/components/custom/FullScreenNav'; // New menu

const MOCK_FULL_SCREEN_NAV_ITEMS = [
  { id: 'home', label: 'HOME', href: '/', imageSrc: 'https://hubplural.com/wp-content/uploads/2025/05/Captura-de-tela-2025-05-09-220312.png' },
  { id: 'sobre', label: 'SOBRE', href: '/sobre', imageSrc: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-03.png' },
  { id: 'blog', label: 'BLOG', href: '#', imageSrc: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-01.png' },
  { id: 'localizacao', label: 'LOCALIZAÇÃO', href: '#', imageSrc: 'https://hubplural.com/wp-content/uploads/2024/07/HOME-SALA-DE-REUNIAO-02.png' },
  { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: 'https://hubplural.com/wp-content/uploads/2023/09/PASSAPORTE-02-1024x770.png' },
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
                width={180}
                height={48}
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