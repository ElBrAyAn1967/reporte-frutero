import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { reports } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

// GET: Obtener lista de protocolos únicos con conteo de reportes
export async function GET(_request: NextRequest) {
  try {
    // Consulta SQL para obtener protocolos únicos con conteo
    const protocolosUnicos = await db
      .select({
        protocolo: reports.protocolo,
        count: sql<number>`count(*)::int`,
        ultimoReporte: sql<Date>`max(${reports.createdAt})`,
      })
      .from(reports)
      .where(sql`${reports.protocolo} IS NOT NULL`)
      .groupBy(reports.protocolo)
      .orderBy(sql`max(${reports.createdAt}) DESC`);

    return NextResponse.json({
      success: true,
      count: protocolosUnicos.length,
      protocolos: protocolosUnicos,
    });
  } catch (error: any) {
    console.error('❌ Error al obtener protocolos:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener protocolos',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
