import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'No se encontró la API Key de Gemini. Verifica tu archivo .env.local'
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { prompt, files, reportType } = body;

    if (!prompt) {
      return NextResponse.json({
        success: false,
        error: 'El prompt es requerido'
      }, { status: 400 });
    }

    // Inicializar Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Construir el prompt mejorado
    let enhancedPrompt = `Eres un asistente especializado en la creación de reportes académicos y de investigación.

Usuario solicita: ${prompt}

Por favor, ayuda al usuario generando contenido estructurado en formato Markdown que pueda usar directamente en su reporte.`;

    // Agregar contexto de archivos si existen
    if (files && files.length > 0) {
      enhancedPrompt += `\n\nEl usuario ha adjuntado ${files.length} archivo(s): ${files.map((f: any) => f.name).join(', ')}`;
    }

    // Agregar contexto del tipo de reporte si existe
    if (reportType) {
      enhancedPrompt += `\n\nTipo de reporte: ${reportType}`;
    }

    // Generar contenido con Gemini
    const result = await model.generateContent(enhancedPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      response: text,
      model: 'gemini-2.0-flash-exp',
      filesProcessed: files?.length || 0
    });

  } catch (error: any) {
    console.error('Error en Gemini API:', error);

    return NextResponse.json({
      success: false,
      error: error.message || 'Error al procesar la solicitud con Gemini',
      errorType: error.constructor.name
    }, { status: 500 });
  }
}
