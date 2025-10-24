import ReportPageTemplate from '@/app/components/ReportPageTemplate';

export default function AnalisisPage() {
  return (
    <ReportPageTemplate
      reportType="evento"
      reportLabel="Análisis de Evento"
      createRoute="/reporte"
    />
  );
}
