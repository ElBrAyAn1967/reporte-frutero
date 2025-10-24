'use client';

import React, { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

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
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando reporte...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              Error al cargar el reporte
            </h1>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <a
              href={createRoute}
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <i className="fas fa-plus mr-2"></i>
              Crear nuevo reporte
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <div className="text-center">
            <i className="fas fa-file-alt text-6xl text-gray-400 mb-4"></i>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              No hay reportes de {reportLabel.toLowerCase()} disponibles
            </h1>
            <p className="text-muted-foreground mb-6">
              Aún no has generado ningún reporte de {reportLabel.toLowerCase()}.
              Ve a la página de reportes para crear uno.
            </p>
            <a
              href={createRoute}
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <i className="fas fa-plus mr-2"></i>
              Crear reporte de {reportLabel.toLowerCase()}
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
      <div className="container max-w-6xl mx-auto py-8">
        {report.isAiGenerated === 'true' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <i className="fas fa-robot text-green-600 dark:text-green-400"></i>
              <span className="text-green-700 dark:text-green-300 font-medium">
                Reporte {reportLabel.toLowerCase()} generado con IA
              </span>
            </div>
          </div>
        )}

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <i className="fas fa-database text-blue-600 dark:text-blue-400"></i>
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                Cargado desde base de datos
              </span>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              Creado: {new Date(report.createdAt).toLocaleString('es-MX', {
                dateStyle: 'long',
                timeStyle: 'short'
              })}
            </span>
          </div>
        </div>

        <div className="report-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </main>
  );
}
