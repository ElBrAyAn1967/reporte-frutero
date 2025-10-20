'use client';

import React from 'react';
import { AIAssistantProps } from '@/lib/types';

const AIAssistantFinal = React.memo<AIAssistantProps>(({
  aiPrompt,
  setAiPrompt,
  handleAiSubmit,
  isAiProcessing,
  handleAiFileSelect,
  aiFileInputRef,
  handleAiFileInput,
  attachedFiles,
  getFileIcon,
  removeAttachedFile
}) => {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <i className="fas fa-robot text-green-500 mr-2"></i>
        <span className="font-medium text-green-700 dark:text-green-300">
          Asistencia de IA con Gemini
        </span>
        <span className="ml-auto text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/30 px-2 py-1 rounded-full">
          ✨ Gemini 2.0 Flash
        </span>
      </div>

      <p className="text-sm text-green-600 dark:text-green-400 mb-4">
        Describe lo que necesitas para tu reporte y la IA te ayudará a estructurarlo
      </p>

      {/* AI Input with file attachment */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            aria-label="Describe lo que necesitas para tu reporte"
            placeholder="Ejemplo: Necesito ayuda con las métricas de participación del taller de blockchain..."
            className="w-full px-4 py-3 pr-12 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-green-900/30 text-foreground focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAiSubmit();
              }
            }}
            disabled={isAiProcessing}
          />
          <button
            type="button"
            onClick={handleAiFileSelect}
            disabled={isAiProcessing}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-green-600 hover:text-green-700 disabled:text-green-400 disabled:cursor-not-allowed transition-colors duration-200"
            title="Agregar archivos/imágenes"
            aria-label="Agregar archivos"
          >
            <i className="fas fa-paperclip text-sm"></i>
          </button>
          <input
            ref={aiFileInputRef}
            type="file"
            multiple
            aria-label="Adjuntar archivos para la IA"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.csv,.xlsx"
            onChange={handleAiFileInput}
            className="hidden"
          />
        </div>
        <button
          type="button"
          onClick={handleAiSubmit}
          disabled={!aiPrompt.trim() || isAiProcessing}
          className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium min-w-[100px]"
          aria-label={isAiProcessing ? 'Procesando' : 'Enviar consulta a IA'}
        >
          {isAiProcessing ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              <span className="text-sm">Procesando...</span>
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane mr-2"></i>
              Enviar
            </>
          )}
        </button>
      </div>

      {/* Attached files display */}
      {attachedFiles.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-2">
            📎 Archivos adjuntos ({attachedFiles.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-800/30 border border-green-200 dark:border-green-700 rounded-lg text-xs transition-all duration-200 hover:shadow-sm"
              >
                <i className={`fas ${getFileIcon(file.name)} text-green-600 dark:text-green-400`}></i>
                <span className="text-green-700 dark:text-green-300 max-w-32 truncate font-medium">
                  {file.name}
                </span>
                <span className="text-green-500 dark:text-green-400 text-xs">
                  ({(file.size / 1024).toFixed(1)}KB)
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachedFile(index)}
                  title={`Eliminar archivo ${file.name}`}
                  aria-label={`Eliminar archivo ${file.name}`}
                  className="text-green-600 hover:text-red-500 transition-colors duration-200 ml-1"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-xs text-green-600 dark:text-green-400">
        <i className="fas fa-info-circle mt-0.5"></i>
        <span>
          Puedes adjuntar imágenes de gráficos, tablas, PDFs o documentos de referencia.
          {isAiProcessing && (
            <span className="block mt-1 text-green-500 dark:text-green-400 font-medium">
              ⚡ Generando respuesta con IA...
            </span>
          )}
        </span>
      </div>
    </div>
  );
});

AIAssistantFinal.displayName = 'AIAssistantFinal';

export default AIAssistantFinal;
