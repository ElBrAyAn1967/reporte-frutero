import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { CONTENT_DIR, REPORT_FILE_CONFIG } from '@/lib/constants';

type ReportType = keyof typeof REPORT_FILE_CONFIG;

interface ReportPageTemplateProps {
  reportType: ReportType;
}

export default async function ReportPageTemplate({ reportType }: ReportPageTemplateProps) {
  const config = REPORT_FILE_CONFIG[reportType];
  const aiFilePath = path.join(process.cwd(), CONTENT_DIR, config.aiFile);
  const originalFilePath = path.join(process.cwd(), CONTENT_DIR, config.originalFile);

  try {
    let fileContents = '';
    let usingAiReports = false;

    // Intentar leer primero el archivo de reportes generados por IA
    if (fs.existsSync(aiFilePath)) {
      fileContents = fs.readFileSync(aiFilePath, 'utf8');
      usingAiReports = true;
      console.log(`✅ Mostrando reporte ${reportType} generado por IA`);
    } else if (fs.existsSync(originalFilePath)) {
      // Si no existe el de IA, usar el archivo original
      fileContents = fs.readFileSync(originalFilePath, 'utf8');
      console.log(`📄 Mostrando contenido original de ${reportType}`);
    } else {
      throw new Error(`No hay reportes de ${reportType} disponibles`);
    }

    const { content } = matter(fileContents);

    // Procesa el Markdown a HTML usando remark y remark-html
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    // Renderiza el HTML con la clase 'prose' de Tailwind Typography
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          {usingAiReports && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-robot text-green-600 dark:text-green-400"></i>
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Mostrando reporte {config.label.toLowerCase()} generado con IA
                </span>
              </div>
            </div>
          )}
          <div className="report-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
    );
  } catch (error) {
    console.error(`Error al leer el archivo Markdown de ${reportType}:`, error);
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <div className="text-center">
            <i className="fas fa-file-alt text-6xl text-gray-400 mb-4"></i>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              No hay reportes de {config.label.toLowerCase()} disponibles
            </h1>
            <p className="text-muted-foreground mb-6">
              Aún no has generado ningún reporte de {config.label.toLowerCase()} con la IA.
              Ve a la página de reportes para crear uno.
            </p>
            <a
              href={config.createRoute}
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <i className="fas fa-plus mr-2"></i>
              Crear reporte de {config.label.toLowerCase()}
            </a>
          </div>
        </div>
      </main>
    );
  }
}
