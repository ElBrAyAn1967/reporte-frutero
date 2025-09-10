import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import './style.css'; // Importa los estilos de la página

export default async function ActividadesPage() {
  const filePath = path.join(process.cwd(), 'content', 'actividades.md');

  try {
    // Lee el contenido del archivo Markdown.
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);
    
    // Procesa el Markdown a HTML usando remark y remark-html.
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    // Renderiza el HTML con la clase 'prose' de Tailwind Typography.
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <div className="report-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error al leer el archivo Markdown:', error);
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Error de Contenido</h1>
          <p className="text-center">No se pudo encontrar el archivo de contenido para esta página. Asegúrate de que "actividades.md" esté en la carpeta "content" en la raíz de tu proyecto.</p>
        </div>
      </main>
    );
  }
}
