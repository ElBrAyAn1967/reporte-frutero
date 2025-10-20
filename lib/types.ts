/**
 * Tipos TypeScript reutilizables para la aplicación
 */

import { REPORT_TYPES } from './constants';

// Tipos de reportes
export type ReportType = typeof REPORT_TYPES[keyof typeof REPORT_TYPES];

// Interfaz para archivos adjuntos
export interface AttachedFile {
  name: string;
  size: number;
  type: string;
}

// Interfaz para metadata de reportes
export interface ReportMetadata {
  createdVia: 'web-interface' | 'api' | 'manual';
  fileAttached: boolean;
  aiAssisted: boolean;
  timestamp?: string;
}

// Interfaz para datos de reporte
export interface ReportData {
  reportType: ReportType;
  title: string;
  content: string;
  metadata: ReportMetadata;
  attachments?: AttachedFile[];
  isAiGenerated?: string;
  aiModel?: string | null;
  aiPrompt?: string | null;
}

// Interfaz para respuesta de API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Interfaz para props de archivos
export interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

// Tipos para el sistema de navegación
export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
}

// Props para componentes de reporte
export interface ReportPageProps {
  reportType: ReportType;
}

// Props para el asistente de IA
export interface AIAssistantProps {
  aiPrompt: string;
  setAiPrompt: (value: string) => void;
  handleAiSubmit: () => void;
  isAiProcessing: boolean;
  handleAiFileSelect: () => void;
  aiFileInputRef: React.RefObject<HTMLInputElement>;
  handleAiFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  attachedFiles: File[];
  getFileIcon: (fileName: string) => string;
  removeAttachedFile: (index: number) => void;
}

// Estado del formulario de reporte
export interface ReportFormState {
  reportType: ReportType | null;
  uploadMethod: 'drag' | 'manual' | null;
  uploadedFile: File | null;
  manualText: string;
  aiPrompt: string;
  attachedFiles: File[];
  isProcessing: boolean;
  isSavingToDb: boolean;
  isAiProcessing: boolean;
}
