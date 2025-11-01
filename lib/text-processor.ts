/**
 * Procesador Inteligente de Texto
 * Convierte automáticamente texto plano en Markdown estructurado
 * basándose en patrones y contexto
 */

interface ProcessingOptions {
  detectTitles?: boolean;
  detectLists?: boolean;
  detectSections?: boolean;
  detectEmphasis?: boolean;
  detectTables?: boolean;
  preserveMarkdown?: boolean;
}

const DEFAULT_OPTIONS: ProcessingOptions = {
  detectTitles: true,
  detectLists: true,
  detectSections: true,
  detectEmphasis: true,
  detectTables: true,
  preserveMarkdown: true,
};

/**
 * Detecta si el texto ya contiene Markdown
 */
function hasMarkdownSyntax(text: string): boolean {
  const markdownPatterns = [
    /^#{1,6}\s/m,           // Headers
    /^\*{1,2}[^*]+\*{1,2}/m, // Bold/italic
    /^\[.+\]\(.+\)/m,        // Links
    /^[-*+]\s/m,             // Unordered lists
    /^\d+\.\s/m,             // Ordered lists
    /^>\s/m,                 // Blockquotes
    /^```/m,                 // Code blocks
    /^\|.+\|/m,              // Tables
  ];

  return markdownPatterns.some(pattern => pattern.test(text));
}

/**
 * Detecta títulos basándose en patrones
 */
function detectTitles(text: string): string {
  const lines = text.split('\n');
  const processed: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const nextLine = lines[i + 1]?.trim() || '';

    // Si ya es un título markdown, mantenerlo
    if (/^#{1,6}\s/.test(line)) {
      processed.push(lines[i]);
      continue;
    }

    // Línea vacía, mantenerla
    if (!line) {
      processed.push('');
      continue;
    }

    // Detectar títulos principales (H1)
    // - Todo en mayúsculas
    // - Menos de 100 caracteres
    // - No termina en punto
    if (
      line === line.toUpperCase() &&
      line.length < 100 &&
      !line.endsWith('.') &&
      /[A-Z]/.test(line)
    ) {
      processed.push(`# ${line}`);
      continue;
    }

    // Detectar H2 (líneas que terminan con : y son cortas)
    if (
      line.endsWith(':') &&
      line.length < 80 &&
      !nextLine.startsWith('-') &&
      !nextLine.startsWith('*')
    ) {
      processed.push(`## ${line.slice(0, -1)}`);
      continue;
    }

    // Detectar H3 (palabras clave de sección)
    const sectionKeywords = [
      'descripción',
      'objetivo',
      'resultado',
      'análisis',
      'conclusión',
      'recomendación',
      'resumen',
      'overview',
      'insights',
      'challenges',
      'recommendations',
      'impact',
      'distribution',
      'adoption',
    ];

    const firstWord = line.split(/\s+/)[0].toLowerCase();
    if (
      sectionKeywords.some(kw => firstWord.includes(kw)) &&
      line.length < 80 &&
      !line.endsWith('.')
    ) {
      processed.push(`### ${line}`);
      continue;
    }

    // Detectar H2 por contexto (línea seguida de guiones)
    if (nextLine && /^-{3,}$/.test(nextLine)) {
      processed.push(`## ${line}`);
      i++; // Skip the dashes line
      continue;
    }

    // Línea normal
    processed.push(lines[i]);
  }

  return processed.join('\n');
}

/**
 * Detecta y formatea listas
 */
function detectLists(text: string): string {
  const lines = text.split('\n');
  const processed: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Si ya es una lista markdown, mantenerla
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      processed.push(line);
      inList = true;
      continue;
    }

    // Detectar listas por patrones
    // Patrón 1: Líneas que empiezan con "- " o "• " o "* "
    if (/^[•\-*]\s/.test(trimmed)) {
      processed.push(`- ${trimmed.slice(2)}`);
      inList = true;
      continue;
    }

    // Patrón 2: Líneas numeradas "1. ", "2. ", etc.
    if (/^\d+\.\s/.test(trimmed)) {
      processed.push(line);
      inList = true;
      continue;
    }

    // Patrón 3: Múltiples líneas cortas después de un título
    const prevLine = processed[processed.length - 1]?.trim() || '';
    if (
      prevLine.startsWith('#') &&
      trimmed.length > 0 &&
      trimmed.length < 100 &&
      !trimmed.endsWith(':') &&
      !trimmed.endsWith('.')
    ) {
      processed.push(`- ${trimmed}`);
      inList = true;
      continue;
    }

    // Patrón 4: Líneas con estructura "Nombre: Valor"
    if (/^[A-Za-z\s]+:\s*.+/.test(trimmed) && trimmed.length < 150) {
      const [key, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').trim();
      processed.push(`- **${key.trim()}**: ${value}`);
      inList = true;
      continue;
    }

    // Línea normal
    if (trimmed === '') {
      inList = false;
    }
    processed.push(line);
  }

  return processed.join('\n');
}

/**
 * Detecta y aplica énfasis (negritas, cursivas)
 */
function detectEmphasis(text: string): string {
  let processed = text;

  // Detectar números importantes (métricas)
  // Ejemplo: "36 Total Submissions" → "**36** Total Submissions"
  processed = processed.replace(
    /\b(\d+)\s+(Total|Participants|Projects|Teams|Hours|Days|Weeks|Months)\b/gi,
    '**$1** $2'
  );

  // Detectar porcentajes importantes
  processed = processed.replace(/\b(\d+%)\b/g, '**$1**');

  // Detectar palabras clave importantes al inicio de línea
  const importantKeywords = [
    'importante',
    'crítico',
    'urgente',
    'nota',
    'atención',
    'warning',
    'important',
    'critical',
    'note',
    'key',
    'main',
    'primary',
  ];

  importantKeywords.forEach(keyword => {
    const regex = new RegExp(`^(${keyword}):?\\s`, 'gim');
    processed = processed.replace(regex, `**$1**: `);
  });

  // Detectar términos técnicos en mayúsculas (API, SDK, URL, etc.)
  processed = processed.replace(/\b([A-Z]{2,})\b/g, '`$1`');

  return processed;
}

/**
 * Detecta y formatea tablas
 */
function detectTables(text: string): string {
  const lines = text.split('\n');
  const processed: string[] = [];
  let potentialTable: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Si ya es una tabla markdown, mantenerla
    if (line.includes('|')) {
      processed.push(lines[i]);
      continue;
    }

    // Detectar filas de tabla (múltiples tabuladores o espacios)
    if (/\t{2,}/.test(line) || /\s{4,}/.test(line)) {
      potentialTable.push(line);

      // Si la siguiente línea no es parte de la tabla, procesarla
      const nextLine = lines[i + 1]?.trim() || '';
      if (!(/\t{2,}/.test(nextLine) || /\s{4,}/.test(nextLine))) {
        if (potentialTable.length >= 2) {
          // Convertir a tabla markdown
          const tableLines = potentialTable.map(row => {
            const cells = row.split(/\t+|\s{4,}/).filter(cell => cell.trim());
            return `| ${cells.join(' | ')} |`;
          });

          // Agregar header separator
          const headerCells = potentialTable[0].split(/\t+|\s{4,}/).filter(cell => cell.trim());
          const separator = `| ${headerCells.map(() => '---').join(' | ')} |`;

          processed.push(tableLines[0]);
          processed.push(separator);
          processed.push(...tableLines.slice(1));
        } else {
          processed.push(...potentialTable);
        }
        potentialTable = [];
      }
      continue;
    }

    processed.push(lines[i]);
  }

  return processed.join('\n');
}

/**
 * Detecta secciones y agrega separadores visuales
 */
function detectSections(text: string): string {
  const lines = text.split('\n');
  const processed: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Agregar separador antes de H2
    if (/^##\s/.test(line.trim()) && i > 0) {
      const prevLine = processed[processed.length - 1] || '';
      if (prevLine.trim() !== '' && prevLine.trim() !== '---') {
        processed.push('');
        processed.push('---');
        processed.push('');
      }
    }

    processed.push(line);
  }

  return processed.join('\n');
}

/**
 * Limpia y normaliza el texto
 */
function cleanText(text: string): string {
  // Eliminar múltiples líneas vacías consecutivas
  let cleaned = text.replace(/\n{3,}/g, '\n\n');

  // Normalizar espacios
  cleaned = cleaned.replace(/[ \t]+/g, ' ');

  // Eliminar espacios al final de las líneas
  cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');

  return cleaned.trim();
}

/**
 * Agrega metadata al reporte
 */
function addMetadata(text: string, reportType: string): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeStr = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const reportLabels: Record<string, string> = {
    frutero: 'Reporte de Actividades',
    evento: 'Reporte de Análisis de Evento',
    cualitativo: 'Reporte de Análisis Cualitativo',
  };

  const label = reportLabels[reportType] || 'Reporte';

  const metadata = `---

**${label}**
📅 *${dateStr} · ${timeStr}*

---

`;

  return metadata + text;
}

/**
 * Función principal de procesamiento
 */
export function processText(
  text: string,
  reportType: string = 'general',
  options: ProcessingOptions = {}
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Si el texto está vacío, retornarlo
  if (!text || text.trim() === '') {
    return text;
  }

  // Limpiar texto inicial
  let processed = cleanText(text);

  // Si el texto ya tiene Markdown y queremos preservarlo, solo limpiarlo
  if (opts.preserveMarkdown && hasMarkdownSyntax(processed)) {
    console.log('✓ Markdown detectado - Preservando formato');
    return addMetadata(processed, reportType);
  }

  console.log('→ Procesando texto plano a Markdown...');

  // Aplicar procesamiento inteligente
  if (opts.detectTitles) {
    processed = detectTitles(processed);
  }

  if (opts.detectLists) {
    processed = detectLists(processed);
  }

  if (opts.detectEmphasis) {
    processed = detectEmphasis(processed);
  }

  if (opts.detectTables) {
    processed = detectTables(processed);
  }

  if (opts.detectSections) {
    processed = detectSections(processed);
  }

  // Limpieza final
  processed = cleanText(processed);

  // Agregar metadata
  processed = addMetadata(processed, reportType);

  console.log('✓ Texto procesado exitosamente');

  return processed;
}

/**
 * Función auxiliar para detectar el tipo de reporte basándose en el contenido
 */
export function detectReportType(text: string): 'frutero' | 'evento' | 'cualitativo' | 'general' {
  const lowerText = text.toLowerCase();

  // Keywords para tipo frutero (actividades)
  const fruteroKeywords = ['actividad', 'sesión', 'participante', 'kit', 'manual', 'hub'];

  // Keywords para tipo evento
  const eventoKeywords = ['hackathon', 'proyecto', 'track', 'mentor', 'sponsor', 'submission'];

  // Keywords para tipo cualitativo
  const cualitativoKeywords = ['experiencia', 'impacto', 'testimonio', 'percepción', 'aprendizaje'];

  const fruteroScore = fruteroKeywords.filter(kw => lowerText.includes(kw)).length;
  const eventoScore = eventoKeywords.filter(kw => lowerText.includes(kw)).length;
  const cualitativoScore = cualitativoKeywords.filter(kw => lowerText.includes(kw)).length;

  const maxScore = Math.max(fruteroScore, eventoScore, cualitativoScore);

  if (maxScore === 0) return 'general';
  if (fruteroScore === maxScore) return 'frutero';
  if (eventoScore === maxScore) return 'evento';
  if (cualitativoScore === maxScore) return 'cualitativo';

  return 'general';
}
