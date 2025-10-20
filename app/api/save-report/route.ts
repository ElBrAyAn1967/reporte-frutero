import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, reportType, reportTypeValue, appendMode = false } = body;

    if (!content || content.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'El contenido del reporte es requerido'
        },
        { status: 400 }
      );
    }

    // Mapear tipo de reporte a su archivo correspondiente
    let fileName = 'ai-generated-reports.md'; // default

    if (reportTypeValue) {
      switch (reportTypeValue) {
        case 'frutero':
          fileName = 'ai-actividades.md';
          break;
        case 'evento':
          fileName = 'ai-analisis.md';
          break;
        case 'cualitativo':
          fileName = 'ai-cualitativo.md';
          break;
        default:
          fileName = 'ai-generated-reports.md';
      }
    }

    const filePath = path.join(process.cwd(), 'content', fileName);

    // Preparar el nuevo contenido con metadatos
    const timestamp = new Date().toLocaleString('es-MX', {
      dateStyle: 'long',
      timeStyle: 'short'
    });

    // Crear o reemplazar el archivo SIEMPRE (no agregar al final)
    const fullContent = `<div class="reporte">

# 📋 ${reportType || 'Reporte Generado con IA'}
**Última actualización:** ${timestamp}

---

${content}

</div>`;

    // Escribir el archivo (reemplaza si existe)
    fs.writeFileSync(filePath, fullContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Reporte guardado exitosamente',
      filePath: `content/${fileName}`,
      fileName: fileName,
      timestamp
    });

  } catch (error: any) {
    console.error('❌ Error al guardar el reporte:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error al guardar el reporte',
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'ai-generated-reports.md');

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json({
        success: true,
        content,
        exists: true
      });
    } else {
      return NextResponse.json({
        success: true,
        content: '',
        exists: false,
        message: 'Aún no hay reportes generados con IA'
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
