import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { reports } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');

    if (!reportType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Parámetro "type" es requerido (frutero, evento, cualitativo)',
        },
        { status: 400 }
      );
    }

    // Validar tipo de reporte
    if (!['frutero', 'evento', 'cualitativo'].includes(reportType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tipo de reporte inválido. Debe ser: frutero, evento, o cualitativo',
        },
        { status: 400 }
      );
    }

    // Obtener el reporte más reciente del tipo especificado
    const latestReport = await db
      .select()
      .from(reports)
      .where(eq(reports.reportType, reportType))
      .orderBy(desc(reports.createdAt))
      .limit(1);

    if (!latestReport || latestReport.length === 0) {
      return NextResponse.json(
        {
          success: true,
          exists: false,
          message: `No hay reportes de tipo "${reportType}" disponibles`,
          report: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      exists: true,
      report: latestReport[0],
    });
  } catch (error: any) {
    console.error('❌ Error al obtener reporte:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener el reporte',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
