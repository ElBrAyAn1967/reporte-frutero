'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VERANO_LOGO, APP_CONFIG, REPORT_FILE_CONFIG } from '@/lib/constants';
import SocialIcons from './components/SocialIcons';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="main-wrapper w-full max-w-6xl xl:max-w-7xl px-4 py-8 sm:px-6 sm:py-10 bg-card rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
        <div className="header flex flex-col items-center mb-6">
          <Link href="/reporte" className="flex items-center mb-4">
            <Image
              src={VERANO_LOGO}
              alt={`${APP_CONFIG.COMPANY} logo`}
              width={120}
              height={120}
              className="rounded-full shadow-lg"
              priority
            />
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-2 leading-tight">
          General Report - {APP_CONFIG.COMPANY}
        </h1>
        <h2 className="text-xl sm:text-2xl font-light text-center mb-10 text-muted-foreground">
          {APP_CONFIG.LOCATION} ({APP_CONFIG.YEAR})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Link href="/actividades" className="menu-button">
            <div className="flex flex-col items-center p-6 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground">
              <i className="fas fa-tasks text-3xl mb-3"></i>
              <span className="font-semibold text-lg">{REPORT_FILE_CONFIG.frutero.label}</span>
            </div>
          </Link>
          <Link href="/analisis" className="menu-button">
            <div className="flex flex-col items-center p-6 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground">
              <i className="fas fa-chart-line text-3xl mb-3"></i>
              <span className="font-semibold text-lg">{REPORT_FILE_CONFIG.evento.label}</span>
            </div>
          </Link>
          <Link href="/cualitativo" className="menu-button">
            <div className="flex flex-col items-center p-6 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground">
              <i className="fas fa-analytics text-3xl mb-3"></i>
              <span className="font-semibold text-lg">{REPORT_FILE_CONFIG.cualitativo.label}</span>
            </div>
          </Link>
        </div>

        <div className="footer flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <Image
              src={VERANO_LOGO}
              alt={`${APP_CONFIG.COMPANY} logo`}
              width={60}
              height={60}
              className="rounded-full shadow-md mr-0 sm:mr-4 mb-2 sm:mb-0"
            />
            <p className="text-sm text-muted-foreground font-light">&copy; {APP_CONFIG.YEAR} {APP_CONFIG.COMPANY}</p>
          </div>
          <SocialIcons />
        </div>
      </div>
    </main>
  );
}
