'use client';

import React, { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

interface ReportPageTemplateProps {
  reportType: 'frutero' | 'evento' | 'cualitativo';
  reportLabel: string;
  createRoute: string;
}

interface Report {
  id: string;
  reportType: string;
  title: string;
  content: string;
  createdAt: string;
  isAiGenerated: string;
  protocolo?: string;
}

export default function ReportPageTemplate({
  reportType,
  reportLabel,
  createRoute
}: ReportPageTemplateProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [contentHtml, setContentHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReport() {
      try {
        setLoading(true);
        setError(null);

        // Obtener el reporte más reciente de este tipo desde la BD
        const response = await fetch(`/api/get-latest-report?type=${reportType}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al obtener el reporte');
        }

        if (data.exists && data.report) {
          setReport(data.report);

          // Procesar el contenido Markdown a HTML
          const processedContent = await remark()
            .use(html)
            .process(data.report.content);

          setContentHtml(processedContent.toString());
        } else {
          setReport(null);
          setContentHtml('');
        }
      } catch (err: any) {
        console.error(`Error al cargar reporte de ${reportType}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [reportType]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground font-grotesk">Cargando reporte...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="container max-w-2xl mx-auto text-center">
            <i className="fas fa-exclamation-triangle text-6xl text-destructive mb-6"></i>
            <h1 className="mb-4">
              Error al cargar el reporte
            </h1>
            <p className="text-muted-foreground mb-8 font-grotesk">
              {error}
            </p>
            <a
              href={createRoute}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-plus mr-3"></i>
              Crear nuevo reporte
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="container max-w-2xl mx-auto text-center">
            <i className="fas fa-file-alt text-6xl text-muted mb-6"></i>
            <h1 className="mb-4">
              No hay reportes de {reportLabel.toLowerCase()} disponibles
            </h1>
            <p className="text-muted-foreground mb-8 font-grotesk">
              Aún no has generado ningún reporte de {reportLabel.toLowerCase()}.
              Ve a la página de reportes para crear uno.
            </p>
            <a
              href={createRoute}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-plus mr-3"></i>
              Crear reporte de {reportLabel.toLowerCase()}
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="container max-w-6xl mx-auto py-8">
          {/* Badges informativos */}
          <div className="flex flex-wrap gap-3 mb-6">
            {report.protocolo && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border-2 border-blue-500 rounded-full">
                <i className="fas fa-calendar-alt text-blue-500"></i>
                <span className="text-blue-500 font-medium font-grotesk text-sm">
                  {report.protocolo}
                </span>
              </div>
            )}

            {report.isAiGenerated === 'true' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent rounded-full">
                <i className="fas fa-robot text-accent"></i>
                <span className="text-accent font-medium font-grotesk text-sm">
                  Generado con IA
                </span>
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary rounded-full">
              <i className="fas fa-database text-primary"></i>
              <span className="text-primary font-medium font-grotesk text-sm">
                Base de Datos
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/30 border-2 border-border rounded-full ml-auto">
              <i className="fas fa-calendar text-muted-foreground"></i>
              <span className="text-muted-foreground font-grotesk text-sm">
                {new Date(report.createdAt).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Contenido del reporte */}
          <div className="report-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
