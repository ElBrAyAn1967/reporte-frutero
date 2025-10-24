import { Raleway, Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts
export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--raleway',
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--space-grotesk',
  display: 'swap',
});

// Fuentes locales (opcional - se pueden descargar después)
// Por ahora usamos Raleway como Funnel Display y Space Grotesk como Ledger
export const funnelDisplay = raleway;
export const ledger = spaceGrotesk;
