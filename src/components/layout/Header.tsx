import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'HOME', href: '#' },
  { name: 'SOBRE', href: '#' },
  { name: 'BLOG', href: '#' },
  { name: 'LOCALIZAÇÃO', href: '#' },
  { name: 'CONTATO', href: '#' },
];

const HeaderRevised = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 pt-6 text-white">
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
          <nav>
            <ul className="flex space-x-6 md:space-x-10">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-light tracking-widest hover:opacity-80 transition-opacity">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-6 h-px bg-white opacity-30"></div>
      </div>
    </div>
  );
};

export { HeaderRevised as Header }; 