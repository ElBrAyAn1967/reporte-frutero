import ReportPageTemplate from '@/app/components/ReportPageTemplate';
import './style.css';

export default function ActividadesPage() {
  return (
    <ReportPageTemplate
      reportType="frutero"
      reportLabel="Actividades"
      createRoute="/reporte"
    />
  );
}
