'use client';

interface MethodSelectorProps {
  setUploadMethod: (method: 'drag' | 'manual') => void;
}

export default function MethodSelector({ setUploadMethod }: MethodSelectorProps) {
  return (
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
  );
}
