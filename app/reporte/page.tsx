'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMarkdownTemplate, reportTypes, ReportType } from './utils/templates';
import Footer from './components/Footer';
import Header from './components/Header';

// Componentes extraídos del código original
import ReportTypeSelector from './components/ReportTypeSelectorFinal';
import BreadcrumbNavigation from './components/BreadcrumNavigationFinal';
import MethodSelector from './components/MethodSelectorFinal';
import FileUpload from './components/FileUploadFinal';
import ManualInput from './components/ManualInputFinal';

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

        {/* Method Selection */}
        {reportType && !uploadMethod && (
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
        <Footer veranologo={veranologo} />
      </div>
    </main>
  );
}
