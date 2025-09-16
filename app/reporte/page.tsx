'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMarkdownTemplate, reportTypes, ReportType } from './utils/templates';
import Footer from './components/Footer';
import Header from './components/Header';

const veranologo = "https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u";

export default function UploadReport() {
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'drag' | 'manual' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [manualText, setManualText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiFileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getReportTypeLabel = () => {
    const selected = reportTypes.find(type => type.value === reportType);
    return selected ? selected.label : 'Subir Reporte';
  };

  const getSelectedReportType = () => {
    return reportTypes.find(type => type.value === reportType);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file extension
      if (!file.name.toLowerCase().endsWith('.md')) {
        alert('Error: Solo se permiten archivos en formato Markdown (.md)');
        return;
      }
      
      setUploadedFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file extension
      if (!file.name.toLowerCase().endsWith('.md')) {
        alert('Error: Solo se permiten archivos en formato Markdown (.md)');
        e.target.value = ''; // Clear the input
        return;
      }
      
      setUploadedFile(file);
    }
  };

  const openFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would typically process the file or text
      console.log('Report type:', reportType);
      console.log('File:', uploadedFile);
      console.log('Manual text:', manualText);
      alert(`${getReportTypeLabel()} procesado exitosamente!`);
    }, 2000);
  };

  const resetUpload = () => {
    setReportType(null);
    setUploadMethod(null);
    setUploadedFile(null);
    setManualText('');
    setAiPrompt('');
    setAttachedFiles([]);
    setIsProcessing(false);
    setIsAiProcessing(false);
    setIsDropdownOpen(false);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'fa-file-pdf';
      case 'doc':
      case 'docx':
        return 'fa-file-word';
      case 'txt':
        return 'fa-file-alt';
      case 'xlsx':
      case 'csv':
        return 'fa-file-excel';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return 'fa-image';
      default:
        return 'fa-file';
    }
  };

  const handleReportTypeSelect = (type: ReportType) => {
    setReportType(type);
    setIsDropdownOpen(false);
    setUploadMethod(null);
    setUploadedFile(null);
    setManualText('');
    setAiPrompt('');
    setAttachedFiles([]);
  };

  const handleAiFileSelect = () => {
    aiFileInputRef.current?.click();
  };

  const handleAiFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
      e.target.value = ''; // Reset input to allow same file selection again
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };
















  
  const handleAiSubmit = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsAiProcessing(false);
      
      // Generate AI response based on prompt and report type
      const aiResponse = generateAiResponse(aiPrompt, reportType);
      
      // Add AI response to the manual text area
      setManualText(prev => {
        if (prev.trim()) {
          return prev + '\n\n' + aiResponse;
        }
        return aiResponse;
      });
      
      // Clear AI prompt but keep files for reference
      setAiPrompt('');
      
      // Show success message
      alert('✨ IA ha generado contenido para tu reporte. Revisa el área de texto abajo.');
    }, 2000);
  };
  const generateAiResponse = (prompt: string, type: ReportType | null) => {
    // Simple AI response simulation based on prompt keywords and report type
    let response = '';
    if (!response) {
      response = `\n## Respuesta de IA\n\nBasado en tu consulta: "${prompt}"\n\n*La IA está procesando tu solicitud y generará contenido específico para tu ${type || 'reporte'}...*\n\n`;
    }
    return response;
  };



















  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="main-wrapper w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 bg-card rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
        
        {/* Header */}
        <Header veranologo={veranologo} />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-2 leading-tight">
          {getReportTypeLabel()}
        </h1>
        <h2 className="text-xl sm:text-2xl font-light text-center mb-10 text-muted-foreground">
          {!reportType ? 'Selecciona el tipo de reporte a subir' : 'Elige cómo deseas ingresar tu reporte'}
        </h2>

        {/* Report Type Dropdown */}
        {!reportType && (
          <div className="flex justify-center mb-10">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between min-w-80 px-6 py-4 bg-primary text-primary-foreground rounded-xl shadow-lg hover:opacity-80 transition-all duration-300 ease-in-out font-medium text-lg"
              >
                <div className="flex items-center">
                  <i className="fas fa-file-alt mr-3 text-xl"></i>
                  <span>¿Qué tipo de reporte vas a subir?</span>
                </div>
                <i className={`fas fa-chevron-down ml-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  {reportTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleReportTypeSelect(type.value)}
                      className="w-full flex items-center px-6 py-4 hover:bg-muted transition-all duration-200 text-left border-b border-border last:border-b-0"
                    >
                      <i className={`${type.icon} text-primary mr-4 text-xl`}></i>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{type.label}</span>
                        <span className="text-sm text-muted-foreground">{type.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        {reportType && (
          <div className="flex items-center justify-center mb-6 text-sm text-muted-foreground">
            <button
              onClick={resetUpload}
              className="hover:text-primary transition-colors duration-200 flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Cambiar tipo de reporte
            </button>
            <i className="fas fa-chevron-right mx-3"></i>
            <div className="flex items-center text-foreground font-medium">
              <i className={`${getSelectedReportType()?.icon} mr-2`}></i>
              <span>{getReportTypeLabel()}</span>
            </div>
            {uploadMethod && (
              <>
                <i className="fas fa-chevron-right mx-3"></i>
                <span className="text-foreground font-medium">
                  {uploadMethod === 'drag' ? 'Subir archivo' : 'Ingreso manual'}
                </span>
              </>
            )}
          </div>
        )}

        {/* Method Selection */}
        {reportType && !uploadMethod && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <button
              onClick={() => setUploadMethod('drag')}
              className="flex flex-col items-center p-8 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground"
            >
              <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i>
              <span className="font-semibold text-lg mb-2">Arrastra tu archivo</span>
              <span className="text-sm opacity-80">Archivos Markdown (.md) únicamente</span>
            </button>

            <button
              onClick={() => setUploadMethod('manual')}
              className="flex flex-col items-center p-8 bg-primary hover:opacity-80 transition-all duration-300 ease-in-out rounded-xl text-center shadow-lg text-primary-foreground"
            >
              <i className="fas fa-keyboard text-4xl mb-4"></i>
              <span className="font-semibold text-lg mb-2">Ingreso manual</span>
              <span className="text-sm opacity-80">Escribe directamente tu reporte</span>
            </button>
          </div>
        )}
















        {/* File Upload Method */}
        {uploadMethod === 'drag' && (
          <div className="space-y-6">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-muted-foreground/30 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                title="Seleccionar archivo"
                aria-label="Seleccionar archivo"
                className="hidden"
                accept=".md"
                onChange={handleFileInput}
              />
              
              {!uploadedFile ? (
                <div className="space-y-4">
                  <i className="fas fa-cloud-upload-alt text-5xl text-muted-foreground"></i>
                  <div>
                    <p className="text-xl font-medium mb-2">
                      Arrastra tu archivo Markdown aquí
                    </p>
                    <p className="text-muted-foreground mb-4">
                      o{' '}
                      <button
                        onClick={openFileSelect}
                        className="text-primary hover:underline font-medium"
                      >
                        selecciona un archivo .md
                      </button>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Formato requerido:</strong> Archivos Markdown (.md únicamente) | Máx. 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <i className="fas fa-file-check text-5xl text-primary"></i>
                  <div>
                    <p className="text-xl font-medium text-primary mb-2">
                      Archivo cargado exitosamente
                    </p>
                    <p className="text-muted-foreground">
                      {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-all duration-200 font-medium disabled:opacity-50"
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
                  onClick={() => setUploadMethod(null)}
                  className="px-6 py-3 border border-muted-foreground/30 text-foreground rounded-lg hover:bg-muted transition-all duration-200 font-medium"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Cambiar método
                </button>
              </div>
            )}
          </div>
        )}


























        {/* Manual Input Method */}
        {uploadMethod === 'manual' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="manual-input" className="block text-lg font-medium">
                Ingresa tu {getReportTypeLabel().toLowerCase()} manualmente:
              </label>
              
              {/* AI Assistant Section */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <i className="fas fa-robot text-green-500 mr-2"></i>
                  <span className="font-medium text-green-700 dark:text-green-300">Asistencia de IA</span>
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
                      onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                    />
                    <button 
                      onClick={handleAiFileSelect}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                      title="Agregar archivos/imágenes"
                    >
                      <i className="fas fa-plus text-sm"></i>
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
                    onClick={handleAiSubmit}
                    disabled={!aiPrompt.trim() || isAiProcessing}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    {isAiProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        IA
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
                      Archivos adjuntos ({attachedFiles.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-800/30 border border-green-200 dark:border-green-700 rounded-full text-xs"
                        >
                          <i className={`fas ${getFileIcon(file.name)} text-green-600`}></i>
                          <span className="text-green-700 dark:text-green-300 max-w-24 truncate">
                            {file.name}
                          </span>
                          <span className="text-green-500 text-xs">
                            ({(file.size / 1024).toFixed(1)}KB)
                          </span>
                          <button
                            onClick={() => removeAttachedFile(index)}
                            title={`Eliminar archivo ${file.name}`}
                            className="text-green-600 hover:text-red-500 transition-colors duration-200"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-green-600 dark:text-green-400">
                  <i className="fas fa-info-circle mr-1"></i>
                  Puedes adjuntar imágenes de gráficos, tablas, PDFs o documentos de referencia
                </div>
              </div>
              
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
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-all duration-200 font-medium disabled:opacity-50"
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
                  onClick={() => setUploadMethod(null)}
                  className="px-6 py-3 border border-muted-foreground/30 text-foreground rounded-lg hover:bg-muted transition-all duration-200 font-medium"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Cambiar método
                </button>
              </div>
            )}
          </div>
        )}





















        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Volver al inicio
          </Link>
        </div>

        {/* Footer */}
        <Footer veranologo={veranologo} />
      </div>
    </main>
  );
}