'use client';

import { getMarkdownTemplate } from '../utils/templates';
import AIAssistant from './AIAssistantFinal';

interface ManualInputProps {
  reportType: any;
  getReportTypeLabel: () => string;
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
  setManualText: (text: string) => void;
  manualText: string;
  handleSubmit: () => void;
  isProcessing: boolean;
  handleSaveToDatabase: () => void;
  isSavingToDb: boolean;
  setUploadMethod: (method: 'drag' | 'manual' | null) => void;
}

export default function ManualInput({
  reportType,
  getReportTypeLabel,
  aiPrompt,
  setAiPrompt,
  handleAiSubmit,
  isAiProcessing,
  handleAiFileSelect,
  aiFileInputRef,
  handleAiFileInput,
  attachedFiles,
  getFileIcon,
  removeAttachedFile,
  setManualText,
  manualText,
  handleSubmit,
  isProcessing,
  handleSaveToDatabase,
  isSavingToDb,
  setUploadMethod
}: ManualInputProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label htmlFor="manual-input" className="block text-lg font-medium">
          Ingresa tu {getReportTypeLabel().toLowerCase()} manualmente:
        </label>
        
        {/* AI Assistant Section */}
        <AIAssistant
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          handleAiSubmit={handleAiSubmit}
          isAiProcessing={isAiProcessing}
          handleAiFileSelect={handleAiFileSelect}
          aiFileInputRef={aiFileInputRef}
          handleAiFileInput={handleAiFileInput}
          attachedFiles={attachedFiles}
          getFileIcon={getFileIcon}
          removeAttachedFile={removeAttachedFile}
        />
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <i className="fas fa-info-circle text-blue-500 mr-2"></i>
              <span className="font-medium text-blue-700 dark:text-blue-300">Formato requerido: Markdown</span>
            </div>
            <button
              onClick={() => setManualText(getMarkdownTemplate(reportType!))}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              <i className="fas fa-file-import mr-1"></i>
              Cargar plantilla
            </button>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Tu reporte debe incluir las secciones: Título, Kit de actividades, Manuales, Mentorías, Métricas de sesiones, Ranking de sesiones y Análisis geográfico.
          </p>
        </div>
        <textarea
          id="manual-input"
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          placeholder={getMarkdownTemplate(reportType!)}
          className="w-full h-96 p-4 border border-muted-foreground/30 rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-sm"
        />
        <p className="text-sm text-muted-foreground">
          Caracteres: {manualText.length}
        </p>
      </div>

      {manualText.trim() && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={isProcessing || isSavingToDb}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-all duration-200 font-medium disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Procesando...
              </>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>
                Procesar {getReportTypeLabel()}
              </>
            )}
          </button>

          <button
            onClick={handleSaveToDatabase}
            disabled={isProcessing || isSavingToDb}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium disabled:opacity-50 shadow-md"
          >
            {isSavingToDb ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Guardando en BD...
              </>
            ) : (
              <>
                <i className="fas fa-database mr-2"></i>
                Guardar en Base de Datos
              </>
            )}
          </button>

          <button
            onClick={() => setUploadMethod(null)}
            disabled={isProcessing || isSavingToDb}
            className="w-full sm:w-auto px-6 py-3 border border-muted-foreground/30 text-foreground rounded-lg hover:bg-muted transition-all duration-200 font-medium disabled:opacity-50"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Cambiar método
          </button>
        </div>
      )}
    </div>
  );
}
