import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { reports } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { processText } from '@/lib/text-processor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      reportType,
      protocolo,
      protocoloCustom,
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

    // 🤖 Procesar el contenido inteligentemente
    console.log('📝 Procesando contenido del reporte...');
    const processedContent = processText(content, reportType, {
      detectTitles: true,
      detectLists: true,
      detectSections: true,
      detectEmphasis: true,
      detectTables: true,
      preserveMarkdown: true,
    });

    console.log(`✓ Contenido procesado: ${content.length} → ${processedContent.length} caracteres`);

    // Insertar en la base de datos
    const [newReport] = await db
      .insert(reports)
      .values({
        reportType,
        protocolo: protocoloCustom || protocolo, // Priorizar custom si existe
        protocoloCustom,
        title,
        content: processedContent, // Usar el contenido procesado
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
    const protocolo = searchParams.get('protocolo');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = db.select().from(reports);

    // Filtrar por tipo si se proporciona
    if (reportType) {
      query = query.where(eq(reports.reportType, reportType)) as any;
    }

    // Filtrar por protocolo si se proporciona
    if (protocolo) {
      query = query.where(eq(reports.protocolo, protocolo)) as any;
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
