'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { reportTypes, ReportType } from './utils/templates';
import Footer from './components/Footer';
import Header from './components/Header';

// Componentes extraídos del código original
import ReportTypeSelector from './components/ReportTypeSelectorFinal';
import BreadcrumbNavigation from './components/BreadcrumNavigationFinal';
import MethodSelector from './components/MethodSelectorFinal';
import FileUpload from './components/FileUploadFinal';
import ManualInput from './components/ManualInputFinal';
import ProtocoloSelector from './components/ProtocoloSelector';

export default function UploadReport() {
  const router = useRouter();
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'drag' | 'manual' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [manualText, setManualText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSavingToDb, setIsSavingToDb] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [selectedProtocolo, setSelectedProtocolo] = useState<string | null>(null);
  const [customProtocolo, setCustomProtocolo] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
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
    if (!manualText.trim() && !uploadedFile) {
      alert('⚠️ Por favor ingresa contenido o sube un archivo antes de enviar');
      return;
    }

    setIsProcessing(true);

    try {
      let contentToSave = manualText;

      // Si hay un archivo subido, leer su contenido
      if (uploadedFile) {
        const fileContent = await uploadedFile.text();
        contentToSave = fileContent + (manualText ? '\n\n' + manualText : '');
      }

      // Enviar a la API para guardar
      const response = await fetch('/api/save-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: contentToSave,
          reportType: getReportTypeLabel(),
          reportTypeValue: reportType, // Enviar el valor del tipo ('frutero', 'evento', 'cualitativo')
          appendMode: false // Reemplazar el archivo existente
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Determinar la página de destino según el tipo de reporte
        let redirectPath = '/actividades'; // default
        let pageName = 'actividades';

        if (reportType === 'frutero') {
          redirectPath = '/actividades';
          pageName = 'actividades';
        } else if (reportType === 'evento') {
          redirectPath = '/analisis';
          pageName = 'análisis';
        } else if (reportType === 'cualitativo') {
          redirectPath = '/cualitativo';
          pageName = 'cualitativo';
        }

        alert(`✅ ${getReportTypeLabel()} guardado exitosamente!\n\nSerás redirigido a la página de ${pageName} para ver tu reporte.`);

        // Redirigir a la página correspondiente después de 1 segundo
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      } else {
        throw new Error(data.error || 'Error al guardar el reporte');
      }
    } catch (error: any) {
      console.error('❌ Error al guardar el reporte:', error);
      alert('❌ Error al guardar el reporte:\n\n' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Función para guardar en la base de datos PostgreSQL
  const handleSaveToDatabase = async () => {
    if (!manualText.trim() && !uploadedFile) {
      alert('⚠️ Por favor ingresa contenido o sube un archivo antes de guardar');
      return;
    }

    if (!reportType) {
      alert('⚠️ Por favor selecciona un tipo de reporte');
      return;
    }

    // Validar protocolo
    if (!selectedProtocolo && !customProtocolo.trim()) {
      alert('⚠️ Por favor selecciona o ingresa un protocolo/evento');
      return;
    }

    setIsSavingToDb(true);

    try {
      let contentToSave = manualText;

      // Si hay un archivo subido, leer su contenido
      if (uploadedFile) {
        const fileContent = await uploadedFile.text();
        contentToSave = fileContent + (manualText ? '\n\n' + manualText : '');
      }

      // Preparar datos para la base de datos
      const finalProtocolo = customProtocolo.trim() || selectedProtocolo;
      const reportData = {
        reportType: reportType,
        protocolo: finalProtocolo,
        protocoloCustom: customProtocolo.trim() || null,
        title: `${getReportTypeLabel()} - ${finalProtocolo} - ${new Date().toLocaleDateString('es-MX')}`,
        content: contentToSave,
        metadata: {
          createdVia: 'web-interface',
          fileAttached: !!uploadedFile,
          aiAssisted: aiPrompt ? true : false,
          protocolo: finalProtocolo,
        },
        attachments: attachedFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        isAiGenerated: aiPrompt ? 'true' : 'false',
        aiModel: aiPrompt ? 'gemini-2.0-flash-exp' : null,
        aiPrompt: aiPrompt || null,
      };

      // Enviar a la API de base de datos
      const response = await fetch('/api/save-report-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (data.success) {
        // Determinar la página de destino según el tipo de reporte
        let redirectPath = '/actividades';
        let pageName = 'actividades';

        if (reportType === 'frutero') {
          redirectPath = '/actividades';
          pageName = 'actividades';
        } else if (reportType === 'evento') {
          redirectPath = '/analisis';
          pageName = 'análisis';
        } else if (reportType === 'cualitativo') {
          redirectPath = '/cualitativo';
          pageName = 'cualitativo';
        }

        alert(`✅ ${getReportTypeLabel()} guardado exitosamente!\n\n📊 ID del reporte: ${data.reportId}\n\nSerás redirigido a la página de ${pageName} para ver tu reporte.`);

        // Redirigir después de 1 segundo
        setTimeout(() => {
          router.push(redirectPath);
        }, 1000);
      } else {
        throw new Error(data.error || 'Error al guardar en la base de datos');
      }
    } catch (error: any) {
      console.error('❌ Error al guardar en la base de datos:', error);
      alert('❌ Error al guardar en la base de datos:\n\n' + error.message);
    } finally {
      setIsSavingToDb(false);
    }
  };

  const resetUpload = () => {
    setReportType(null);
    setUploadMethod(null);
    setUploadedFile(null);
    setManualText('');
    setAiPrompt('');
    setAttachedFiles([]);
    setSelectedProtocolo(null);
    setCustomProtocolo('');
    setShowCustomInput(false);
    setIsProcessing(false);
    setIsSavingToDb(false);
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

  // 🚀 Llamada a Gemini API
  const handleAiSubmit = async () => {
    if (!aiPrompt.trim()) {
      alert('⚠️ Por favor escribe una consulta para la IA');
      return;
    }

    setIsAiProcessing(true);

    try {
      // Preparar metadatos de archivos adjuntos
      const filesMetadata = attachedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));

      // Construir contexto del tipo de reporte
      const reportContext = reportType
        ? `\nContexto: El usuario está trabajando en un reporte de tipo "${getReportTypeLabel()}".`
        : '';

      // Llamada a la API de Gemini
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt + reportContext,
          files: filesMetadata,
          reportType: reportType
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.response) {
        // Formatear la respuesta de la IA
        const aiResponse = formatAiResponse(data.response, aiPrompt);
        
        // Agregar respuesta al área de texto manual
        setManualText(prev => {
          if (prev.trim()) {
            return prev + '\n\n---\n\n' + aiResponse;
          }
          return aiResponse;
        });
        
        // Limpiar el prompt
        setAiPrompt('');
        
        // Mostrar notificación de éxito
        alert('✨ ¡La IA ha generado contenido para tu reporte!\n\nRevisa el área de texto para ver las sugerencias.');
      } else {
        throw new Error(data.error || 'Error al procesar la respuesta');
      }
    } catch (error: any) {
      console.error('❌ Error al llamar a Gemini API:', error);

      // Mensajes de error específicos
      if (error.message.includes('API Key')) {
        alert('⚠️ Error de configuración: La API Key de Gemini no está configurada correctamente.\n\nVerifica tu archivo .env.local');
      } else if (error.message.includes('HTTP: 500')) {
        alert('⚠️ Error del servidor: Verifica que la API Key sea válida y tenga permisos.');
      } else {
        alert('❌ Error al conectar con la IA:\n\n' + error.message + '\n\nIntenta nuevamente.');
      }
    } finally {
      setIsAiProcessing(false);
    }
  };

  // 🎨 Función para formatear la respuesta de la IA
  const formatAiResponse = (aiText: string, originalPrompt: string): string => {
    const timestamp = new Date().toLocaleString('es-MX', {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    return `## 🤖 Respuesta de Gemini AI
**Consulta realizada:** ${originalPrompt}
**Fecha:** ${timestamp}

${aiText}

---
*Generado por Gemini 2.0 Flash*`;
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="main-wrapper w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 bg-card rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
        
        {/* Header */}
        <Header />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-2 leading-tight">
          {getReportTypeLabel()}
        </h1>
        <h2 className="text-xl sm:text-2xl font-light text-center mb-10 text-muted-foreground">
          {!reportType ? 'Selecciona el tipo de reporte a subir' : 'Elige cómo deseas ingresar tu reporte'}
        </h2>

        {/* Report Type Dropdown */}
        {!reportType && (
          <ReportTypeSelector
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            handleReportTypeSelect={handleReportTypeSelect}
            dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
          />
        )}

        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          reportType={reportType}
          uploadMethod={uploadMethod}
          resetUpload={resetUpload}
          getSelectedReportType={getSelectedReportType}
          getReportTypeLabel={getReportTypeLabel}
        />

        {/* Protocolo Selector - Mostrar después de seleccionar tipo de reporte */}
        {reportType && !uploadMethod && (
          <div className="mb-8">
            <ProtocoloSelector
              selectedProtocolo={selectedProtocolo}
              customProtocolo={customProtocolo}
              onSelectProtocolo={setSelectedProtocolo}
              onCustomProtocoloChange={setCustomProtocolo}
              showCustomInput={showCustomInput}
              setShowCustomInput={setShowCustomInput}
            />
          </div>
        )}

        {/* Method Selection - Mostrar solo después de seleccionar protocolo */}
        {reportType && !uploadMethod && (selectedProtocolo || customProtocolo.trim()) && (
          <MethodSelector setUploadMethod={setUploadMethod} />
        )}

        {/* File Upload Method */}
        {uploadMethod === 'drag' && (
          <FileUpload
            dragActive={dragActive}
            uploadedFile={uploadedFile}
            isProcessing={isProcessing} 
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleFileInput={handleFileInput}
            openFileSelect={openFileSelect}
            handleSubmit={handleSubmit}
            setUploadMethod={setUploadMethod}
            getReportTypeLabel={getReportTypeLabel}
          />
        )}

        {/* Manual Input Method */}
        {uploadMethod === 'manual' && (
          <ManualInput
            reportType={reportType}
            getReportTypeLabel={getReportTypeLabel}
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
            handleAiSubmit={handleAiSubmit}
            isAiProcessing={isAiProcessing}
            handleAiFileSelect={handleAiFileSelect}
            aiFileInputRef={aiFileInputRef as React.RefObject<HTMLInputElement>}
            handleAiFileInput={handleAiFileInput}
            attachedFiles={attachedFiles}
            getFileIcon={getFileIcon}
            removeAttachedFile={removeAttachedFile}
            setManualText={setManualText}
            manualText={manualText}
            handleSubmit={handleSubmit}
            isProcessing={isProcessing}
            handleSaveToDatabase={handleSaveToDatabase}
            isSavingToDb={isSavingToDb}
            setUploadMethod={setUploadMethod}
          />
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
        <Footer />
      </div>
    </main>
  );
}