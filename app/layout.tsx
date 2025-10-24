import type { Metadata } from "next";
import "./globals.css";
import { APP_CONFIG } from "@/lib/constants";
import { raleway, spaceGrotesk, funnelDisplay, ledger } from "@/lib/fonts";

export const metadata: Metadata = {
  title: APP_CONFIG.TITLE,
  description: APP_CONFIG.DESCRIPTION,
  keywords: ['Frutero Club', 'reportes', 'Mexico City', 'blockchain', 'web3'],
  authors: [{ name: APP_CONFIG.COMPANY }],
  openGraph: {
    title: APP_CONFIG.TITLE,
    description: APP_CONFIG.DESCRIPTION,
    type: 'website',
    locale: 'es_MX',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${raleway.variable} ${spaceGrotesk.variable} ${funnelDisplay.variable} ${ledger.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
