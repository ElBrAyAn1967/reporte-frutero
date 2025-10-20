import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'No API key found' }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent('Di "Hola" en español');
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: 'API funcionando correctamente',
      response: text,
      model: 'gemini-2.5-flash'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      errorType: error.constructor.name,
      errorDetails: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}
