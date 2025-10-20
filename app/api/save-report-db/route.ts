import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { reports } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      reportType,
      title,
      content,
      userId,
      userName,
      metadata,
      // Campos específicos de reporte frutero
      kitActividades,
      manualesGuias,
      hubParticipantes,
      metricasSesiones,
      rankingSesiones,
      distribucionRegion,
      analisisGeografico,
      // Campos específicos de reporte de evento
      descripcionGeneral,
      reporteAnalisisTecnico,
      categoriasProyectos,
      actividadesPrincipales,
      mentorias,
      obstaculosComunes,
      patrocinadores,
      recomendacionesEstrategicas,
      desafiosAprendizajes,
      testimonios,
      // Campos específicos de reporte cualitativo
      datosParticipantes,
      habilidadesClave,
      experienciaPreviaBlockchain,
      tecnologiasOcupadas,
      aspectosValorados,
      impactoPercibido,
      conclusionesAprendizajes,
      // Otros campos
      attachments,
      isAiGenerated,
      aiModel,
      aiPrompt,
    } = body;

    // Validaciones básicas
    if (!reportType || !title || !content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos requeridos: reportType, title, content',
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

    // Insertar en la base de datos
    const [newReport] = await db
      .insert(reports)
      .values({
        reportType,
        title,
        content,
        userId,
        userName,
        metadata,
        // Reporte frutero
        kitActividades,
        manualesGuias,
        hubParticipantes,
        metricasSesiones,
        rankingSesiones,
        distribucionRegion,
        analisisGeografico,
        // Reporte de evento
        descripcionGeneral,
        reporteAnalisisTecnico,
        categoriasProyectos,
        actividadesPrincipales,
        mentorias,
        obstaculosComunes,
        patrocinadores,
        recomendacionesEstrategicas,
        desafiosAprendizajes,
        testimonios,
        // Reporte cualitativo
        datosParticipantes,
        habilidadesClave,
        experienciaPreviaBlockchain,
        tecnologiasOcupadas,
        aspectosValorados,
        impactoPercibido,
        conclusionesAprendizajes,
        // Otros
        attachments,
        isAiGenerated: isAiGenerated || 'false',
        aiModel,
        aiPrompt,
        status: 'published',
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Reporte guardado en la base de datos exitosamente',
      report: newReport,
      reportId: newReport.id,
    });
  } catch (error: any) {
    console.error('❌ Error al guardar reporte en base de datos:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error al guardar en la base de datos',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET: Obtener todos los reportes o filtrar por tipo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = db.select().from(reports);

    // Filtrar por tipo si se proporciona
    if (reportType) {
      query = query.where(eq(reports.reportType, reportType));
    }

    const allReports = await query.limit(limit);

    return NextResponse.json({
      success: true,
      count: allReports.length,
      reports: allReports,
    });
  } catch (error: any) {
    console.error('❌ Error al obtener reportes:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener reportes',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
