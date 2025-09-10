'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const veranologo = "https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="main-wrapper w-full max-w-6xl xl:max-w-7xl px-4 py-8 sm:px-6 sm:py-10 bg-card rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
        <div className="header flex flex-col items-center mb-6">
          <Image
            src={veranologo}
            alt="Company logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-2 leading-tight">
          General Report: Verano en Cadena
        </h1>
        <h2 className="text-xl sm:text-2xl font-light text-center mb-10 text-muted-foreground">
          Mexico City (2025)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Link href="/actividades" className="menu-button">
            <div className="flex flex-col items-center p-6 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground">
              <i className="fas fa-tasks text-3xl "></i>
              <span className="font-semibold text-lg">Frutero Activity & Deliverables</span>
            </div>
          </Link>
          <Link href="/analisis" className="menu-button">
            <div className="flex flex-col items-center p-6 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground">
              <i className="fas fa-chart-line text-3xl "></i>
              <span className="font-semibold text-lg">Field Report</span>
            </div>
          </Link>
          <Link href="/cualitativo" className="menu-button">
            <div className="flex flex-col items-center p-6 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground">
              <i className="fas fa-analytics text-3xl "></i>
              <span className="font-semibold text-lg">Project Analysis</span>
            </div>
          </Link>
        </div>

        <div className="footer flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <Image
              src={veranologo}
              alt="Company logo"
              width={60}
              height={60}
              className="rounded-full shadow-md mr-0 sm:mr-4 mb-2 sm:mb-0"
            />
            <p className="text-sm text-muted-foreground font-light">&copy; 2025</p>
          </div>
          <div className="social-icons flex space-x-4">
            <a href="https://twitter.com/fruteroclub" aria-label="Twitter" className="text-foreground hover:text-primary transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c-.2-.5-1.5-2.2-2.3-3.1L12 8v8c0 2.4-1.9 4-4 4-1.1 0-2.3-.6-3-1.4 0 0-2 1.5-3 2.1 1.7 1.2 3.6 1.9 5.8 1.9 5.3 0 9.7-4.2 9.7-9.7V4H22z"/></svg>
            </a>
            <a href="https://github.com/fruteroclub/" aria-label="GitHub" className="text-foreground hover:text-primary transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22s-2-2-3-2c-1 0-3 2-3 2v2H6c-2.2 0-4-1.8-4-4V7a4 4 0 0 1 4-4h12c2.2 0 4 1.8 4 4v11c0 2.2-1.8 4-4 4h-3v-2zM9 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
            </a>
            <a href="https://t.me/+lOXTPIjgDEwzNDkx" aria-label="Telegram" className="text-foreground hover:text-primary transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-telegram"><path d="M22 2L11 13 2 9.5l16-6.5zm-5 13l-4 4L7 17l6-5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
