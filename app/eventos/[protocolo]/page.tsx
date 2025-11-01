'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Report {
  id: string;
  reportType: string;
  protocolo: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
}

interface ReportesPorTipo {
  frutero: Report[];
  evento: Report[];
  cualitativo: Report[];
}

const veranologo = "https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u";

export default function ProtocoloReportesPage() {
  const params = useParams();
  const protocolo = decodeURIComponent(params.protocolo as string);

  const [reportesPorTipo, setReportesPorTipo] = useState<ReportesPorTipo>({
    frutero: [],
    evento: [],
    cualitativo: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchReportes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/save-report-db?protocolo=${encodeURIComponent(protocolo)}&limit=100`);
      const data = await response.json();

      if (data.success) {
        // Organizar reportes por tipo y obtener los 3 más recientes de cada uno
        const reportes: Report[] = data.reports;

        const fruteros = reportes
          .filter(r => r.reportType === 'frutero')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);

        const eventos = reportes
          .filter(r => r.reportType === 'evento')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);

        const cualitativos = reportes
          .filter(r => r.reportType === 'cualitativo')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);

        setReportesPorTipo({
          frutero: fruteros,
          evento: eventos,
          cualitativo: cualitativos,
        });
      } else {
        throw new Error(data.error || 'Error al cargar reportes');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [protocolo]);

  useEffect(() => {
    fetchReportes();
  }, [fetchReportes]);

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTipoReporteInfo = (tipo: string) => {
    const info: Record<string, { label: string; icon: string; color: string; route: string }> = {
      'frutero': {
        label: 'Actividades',
        icon: 'fa-tasks',
        color: 'from-green-500 to-emerald-600',
        route: '/actividades'
      },
      'evento': {
        label: 'Análisis de Evento',
        icon: 'fa-chart-line',
        color: 'from-blue-500 to-cyan-600',
        route: '/analisis'
      },
      'cualitativo': {
        label: 'Cualitativo',
        icon: 'fa-lightbulb',
        color: 'from-purple-500 to-pink-600',
        route: '/cualitativo'
      },
    };
    return info[tipo] || { label: tipo, icon: 'fa-file', color: 'from-gray-500 to-gray-600', route: '/' };
  };

  const handleVerReporte = (reporte: Report) => {
    setSelectedReport(reporte);
    setShowModal(true);
  };

  const totalReportes = reportesPorTipo.frutero.length + reportesPorTipo.evento.length + reportesPorTipo.cualitativo.length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/eventos" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <i className="fas fa-arrow-left text-xl"></i>
              <Image
                src={veranologo}
                alt="Frutero logo"
                width={50}
                height={50}
              />
              <div>
                <h1 className="text-2xl font-bold line-clamp-1">{protocolo}</h1>
                <p className="text-sm text-muted-foreground">
                  {totalReportes} {totalReportes === 1 ? 'reporte reciente' : 'reportes recientes'}
                </p>
              </div>
            </Link>
            <Link
              href="/reporte"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-all text-sm"
            >
              <i className="fas fa-plus mr-2"></i>
              Nuevo Reporte
            </Link>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
          <span className="ml-4 text-xl">Cargando reportes...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
            <div className="flex items-center gap-3">
              <i className="fas fa-exclamation-triangle text-2xl text-destructive"></i>
              <div>
                <h3 className="font-semibold text-lg">Error al cargar reportes</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && totalReportes === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center py-20">
          <i className="fas fa-inbox text-6xl text-muted-foreground mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">No hay reportes para este evento</h2>
          <p className="text-muted-foreground mb-6">
            Aún no se han creado reportes para &ldquo;{protocolo}&rdquo;
          </p>
          <Link
            href="/reporte"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-all"
          >
            <i className="fas fa-plus mr-2"></i>
            Crear primer reporte
          </Link>
        </div>
      )}

      {/* Reportes por Tipo */}
      {!loading && !error && totalReportes > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="space-y-8">
            {/* Actividades (Frutero) */}
            {reportesPorTipo.frutero.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTipoReporteInfo('frutero').color} flex items-center justify-center text-white`}>
                      <i className={`fas ${getTipoReporteInfo('frutero').icon} text-xl`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{getTipoReporteInfo('frutero').label}</h2>
                      <p className="text-sm text-muted-foreground">Últimos {reportesPorTipo.frutero.length} reportes</p>
                    </div>
                  </div>
                  <Link
                    href={getTipoReporteInfo('frutero').route}
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    Ver todos
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportesPorTipo.frutero.map((reporte) => (
                    <div
                      key={reporte.id}
                      className="group bg-card border border-border rounded-xl p-5 hover:border-green-500/50 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => handleVerReporte(reporte)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-green-500 transition-colors">
                            {reporte.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <i className="fas fa-calendar"></i>
                            {formatFecha(reporte.createdAt)}
                          </p>
                        </div>
                        <i className="fas fa-arrow-right text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Análisis de Evento */}
            {reportesPorTipo.evento.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTipoReporteInfo('evento').color} flex items-center justify-center text-white`}>
                      <i className={`fas ${getTipoReporteInfo('evento').icon} text-xl`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{getTipoReporteInfo('evento').label}</h2>
                      <p className="text-sm text-muted-foreground">Últimos {reportesPorTipo.evento.length} reportes</p>
                    </div>
                  </div>
                  <Link
                    href={getTipoReporteInfo('evento').route}
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    Ver todos
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportesPorTipo.evento.map((reporte) => (
                    <div
                      key={reporte.id}
                      className="group bg-card border border-border rounded-xl p-5 hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => handleVerReporte(reporte)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-blue-500 transition-colors">
                            {reporte.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <i className="fas fa-calendar"></i>
                            {formatFecha(reporte.createdAt)}
                          </p>
                        </div>
                        <i className="fas fa-arrow-right text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Cualitativo */}
            {reportesPorTipo.cualitativo.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTipoReporteInfo('cualitativo').color} flex items-center justify-center text-white`}>
                      <i className={`fas ${getTipoReporteInfo('cualitativo').icon} text-xl`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{getTipoReporteInfo('cualitativo').label}</h2>
                      <p className="text-sm text-muted-foreground">Últimos {reportesPorTipo.cualitativo.length} reportes</p>
                    </div>
                  </div>
                  <Link
                    href={getTipoReporteInfo('cualitativo').route}
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    Ver todos
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportesPorTipo.cualitativo.map((reporte) => (
                    <div
                      key={reporte.id}
                      className="group bg-card border border-border rounded-xl p-5 hover:border-purple-500/50 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => handleVerReporte(reporte)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-purple-500 transition-colors">
                            {reporte.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <i className="fas fa-calendar"></i>
                            {formatFecha(reporte.createdAt)}
                          </p>
                        </div>
                        <i className="fas fa-arrow-right text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* Modal de Reporte */}
      {showModal && selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div className="flex-1">
                <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium mb-2 bg-gradient-to-r ${getTipoReporteInfo(selectedReport.reportType).color} text-white`}>
                  {getTipoReporteInfo(selectedReport.reportType).label}
                </div>
                <h2 className="text-2xl font-bold line-clamp-2">{selectedReport.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  <i className="fas fa-calendar mr-2"></i>
                  {formatFecha(selectedReport.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="ml-4 w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Cerrar modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown>{selectedReport.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
