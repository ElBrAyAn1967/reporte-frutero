/**
 * Constantes globales de la aplicación
 */

// URLs de recursos
export const VERANO_LOGO = "https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u";

// Rutas de archivos
export const CONTENT_DIR = 'content';

// Tipos de reportes
export const REPORT_TYPES = {
  FRUTERO: 'frutero',
  EVENTO: 'evento',
  CUALITATIVO: 'cualitativo',
} as const;

// Configuración de archivos por tipo de reporte
export const REPORT_FILE_CONFIG = {
  [REPORT_TYPES.FRUTERO]: {
    aiFile: 'ai-actividades.md',
    originalFile: 'actividades.md',
    label: 'Frutero Activity & Deliverables',
    createRoute: '/reporte',
  },
  [REPORT_TYPES.EVENTO]: {
    aiFile: 'ai-analisis.md',
    originalFile: 'analisis.md',
    label: 'Field Report',
    createRoute: '/reporte',
  },
  [REPORT_TYPES.CUALITATIVO]: {
    aiFile: 'ai-cualitativo.md',
    originalFile: 'caualitativo.md',
    label: 'Project Analysis',
    createRoute: '/reporte',
  },
} as const;

// Enlaces sociales
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/fruteroclub',
  GITHUB: 'https://github.com/fruteroclub/',
  TELEGRAM: 'https://t.me/+lOXTPIjgDEwzNDkx',
} as const;

// Configuración de la aplicación
export const APP_CONFIG = {
  TITLE: 'Reporte Frutero - General Report',
  DESCRIPTION: 'Sistema de reportes para Frutero Club Mexico City 2025',
  LOCALE: 'es-MX',
  COMPANY: 'Frutero Club',
  YEAR: '2025',
  LOCATION: 'Mexico City',
} as const;
