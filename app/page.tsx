'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VERANO_LOGO, APP_CONFIG, REPORT_FILE_CONFIG } from '@/lib/constants';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12 pt-8">
            <div className="flex justify-center mb-6">
              <Image
                src={VERANO_LOGO}
                alt={`${APP_CONFIG.COMPANY} logo`}
                width={180}
                height={180}
                className="rounded-full shadow-xl transition duration-300 ease-in-out hover:scale-105"
                priority
              />
            </div>
            <h1 className="mb-4">
              Sistema de Reportes - {APP_CONFIG.COMPANY}
            </h1>
            <h2 className="font-grotesk text-2xl text-muted-foreground">
              {APP_CONFIG.LOCATION} · {APP_CONFIG.YEAR}
            </h2>
          </div>

          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <Link
              href="/actividades"
              className="group block bg-card border-2 border-border rounded-xl p-8 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <i className="fas fa-tasks text-3xl text-primary"></i>
                </div>
                <h3 className="font-funnel text-2xl mb-2">{REPORT_FILE_CONFIG.frutero.label}</h3>
                <p className="text-muted-foreground text-sm">
                  Actividades y métricas del programa
                </p>
              </div>
            </Link>

            <Link
              href="/analisis"
              className="group block bg-card border-2 border-border rounded-xl p-8 hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <i className="fas fa-chart-line text-3xl text-secondary"></i>
                </div>
                <h3 className="font-funnel text-2xl mb-2">{REPORT_FILE_CONFIG.evento.label}</h3>
                <p className="text-muted-foreground text-sm">
                  Análisis técnico y categorías
                </p>
              </div>
            </Link>

            <Link
              href="/cualitativo"
              className="group block bg-card border-2 border-border rounded-xl p-8 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <i className="fas fa-comments text-3xl text-accent"></i>
                </div>
                <h3 className="font-funnel text-2xl mb-2">{REPORT_FILE_CONFIG.cualitativo.label}</h3>
                <p className="text-muted-foreground text-sm">
                  Impacto y experiencia de participantes
                </p>
              </div>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Link
              href="/reporte"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground rounded-full text-xl font-medium shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-plus mr-3"></i>
              Crear Nuevo Reporte
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
