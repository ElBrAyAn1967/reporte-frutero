import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'No API key found' }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Lista de modelos disponibles (información estática actualizada)
    const availableModels = [
      {
        name: 'gemini-2.0-flash-exp',
        displayName: 'Gemini 2.0 Flash (Experimental)',
        description: 'Modelo más rápido y eficiente para generación de texto',
        supportedMethods: ['generateContent', 'streamGenerateContent']
      },
      {
        name: 'gemini-1.5-pro',
        displayName: 'Gemini 1.5 Pro',
        description: 'Modelo balanceado para tareas complejas',
        supportedMethods: ['generateContent', 'streamGenerateContent']
      },
      {
        name: 'gemini-1.5-flash',
        displayName: 'Gemini 1.5 Flash',
        description: 'Modelo rápido para respuestas ágiles',
        supportedMethods: ['generateContent', 'streamGenerateContent']
      }
    ];

    return NextResponse.json({
      success: true,
      currentModel: 'gemini-2.0-flash-exp',
      models: availableModels,
      apiKeyConfigured: true
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
