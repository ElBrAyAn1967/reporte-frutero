import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default async function AnalisisPage() {
  const filePath = path.join(process.cwd(), 'content', 'caualitativo.md');

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error al leer el archivo Markdown:', error);
    return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-background text-foreground">
        <div className="container max-w-6xl mx-auto py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Error de Contenido</h1>
          <p className="text-center">No se pudo encontrar el archivo de contenido para esta página. Asegúrate de que "analisis.md" esté en la carpeta "content" en la raíz de tu proyecto.</p>
        </div>
      </main>
    );
  }
}
