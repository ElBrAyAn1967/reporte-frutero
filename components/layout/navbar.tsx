'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type MenuItemType = {
  displayText: string;
  href: string;
  isMobileOnly: boolean;
  isExternal?: boolean;
};

const MENU_ITEMS: MenuItemType[] = [
  { displayText: 'inicio', href: '/', isMobileOnly: false },
  { displayText: 'actividades', href: '/actividades', isMobileOnly: false },
  { displayText: 'análisis', href: '/analisis', isMobileOnly: false },
  { displayText: 'cualitativo', href: '/cualitativo', isMobileOnly: false },
  { displayText: 'subir reporte', href: '/reporte', isMobileOnly: false },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 h-24 w-full bg-background border-b border-border">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between p-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-5 lg:px-8">
        <Link className="flex w-36 items-center" href="/">
          <Image
            src="https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u"
            alt="Frutero logo"
            width={128}
            height={128}
            className="-mt-1 w-full transition duration-300 ease-in-out hover:scale-105"
          />
          <span className="sr-only">Frutero Club</span>
        </Link>

        <div className="z-10 col-span-3 flex items-center justify-center">
          <nav className="hidden gap-4 lg:flex">
            {MENU_ITEMS.filter((menuItem) => !menuItem.isMobileOnly).map(
              (menuItem, index) => (
                <Link
                  key={`${menuItem.displayText}-menuItem-${index}`}
                  className={`inline-flex items-center justify-center px-4 py-2 font-funnel text-xl font-medium text-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none ${
                    pathname === menuItem.href &&
                    'pointer-events-none subrayado'
                  }`}
                  href={menuItem.href}
                  target={menuItem.isExternal ? '_blank' : ''}
                >
                  {menuItem.displayText}
                </Link>
              ),
            )}
          </nav>
        </div>

        {/* Mobile menu - simplified version */}
        <div className="flex lg:hidden">
          <button className="p-2 text-foreground">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
