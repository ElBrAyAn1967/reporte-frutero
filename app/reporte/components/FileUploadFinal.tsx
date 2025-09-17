'use client';

interface FileUploadProps {
  dragActive: boolean;
  uploadedFile: File | null;
  isProcessing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileSelect: () => void;
  handleSubmit: () => void;
  setUploadMethod: (method: 'drag' | 'manual' | null) => void;
  getReportTypeLabel: () => string;
}

export default function FileUpload({ 
  dragActive,
  uploadedFile,
  isProcessing,
  fileInputRef,
  handleDrag,
  handleDrop,
  handleFileInput,
  openFileSelect,
  handleSubmit,
  setUploadMethod,
  getReportTypeLabel
}: FileUploadProps) {
  return (
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
  );
}
