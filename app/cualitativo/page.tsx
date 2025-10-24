import ReportPageTemplate from '@/app/components/ReportPageTemplate';
import './style.css';

export default function CualitativoPage() {
  return (
    <ReportPageTemplate
      reportType="cualitativo"
      reportLabel="Análisis Cualitativo"
      createRoute="/reporte"
    />
  );
}
