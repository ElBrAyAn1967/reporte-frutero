'use client';

interface BreadcrumbNavigationProps {
  reportType: any;
  uploadMethod: 'drag' | 'manual' | null;
  resetUpload: () => void;
  getSelectedReportType: () => any;
  getReportTypeLabel: () => string;
}

export default function BreadcrumbNavigation({ 
  reportType, 
  uploadMethod, 
  resetUpload,
  getSelectedReportType,
  getReportTypeLabel
}: BreadcrumbNavigationProps) {
  if (!reportType) return null;

  return (
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
  );
}