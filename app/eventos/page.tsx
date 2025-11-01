'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Protocolo {
  protocolo: string;
  count: number;
  ultimoReporte: string;
}

const veranologo = "https://red-causal-armadillo-397.mypinata.cloud/ipfs/bafkreiejgeokgt62gygh3e3frfm5e6xjmjyallf4ixpvv3nchh2uu4my7u";

export default function EventosPage() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProtocolos();
  }, []);

  const fetchProtocolos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/protocolos');
      const data = await response.json();

      if (data.success) {
        setProtocolos(data.protocolos);
      } else {
        throw new Error(data.error || 'Error al cargar protocolos');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getProtocoloSlug = (protocolo: string) => {
    return encodeURIComponent(protocolo);
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <Image
              src={veranologo}
              alt="Frutero logo"
              width={80}
              height={80}
              className="transition duration-300 ease-in-out hover:scale-105"
            />
            <div>
              <h1 className="text-4xl font-extrabold">Eventos y Protocolos</h1>
              <p className="text-muted-foreground">Explora reportes organizados por evento</p>
            </div>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
            <span className="ml-4 text-xl">Cargando eventos...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <i className="fas fa-exclamation-triangle text-2xl text-destructive"></i>
              <div>
                <h3 className="font-semibold text-lg">Error al cargar eventos</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && protocolos.length === 0 && (
          <div className="text-center py-20">
            <i className="fas fa-inbox text-6xl text-muted-foreground mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">No hay eventos disponibles</h2>
            <p className="text-muted-foreground mb-6">
              Aún no se han creado reportes con protocolos/eventos asignados
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

        {/* Protocolos Grid */}
        {!loading && !error && protocolos.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                <i className="fas fa-calendar-alt mr-2"></i>
                {protocolos.length} {protocolos.length === 1 ? 'evento' : 'eventos'} disponibles
              </p>
              <Link
                href="/reporte"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-all text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Nuevo Reporte
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {protocolos.map((protocolo, index) => (
                <Link
                  key={`${protocolo.protocolo}-${index}`}
                  href={`/eventos/${getProtocoloSlug(protocolo.protocolo)}`}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {protocolo.protocolo}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <i className="fas fa-file-alt"></i>
                          <span>
                            {protocolo.count} {protocolo.count === 1 ? 'reporte' : 'reportes'}
                          </span>
                        </div>
                      </div>
                      <i className="fas fa-calendar text-3xl text-primary/20 group-hover:text-primary/50 transition-colors"></i>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          <i className="fas fa-clock mr-2"></i>
                          Último reporte
                        </span>
                        <span className="font-medium">
                          {formatFecha(protocolo.ultimoReporte)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Ver reportes
                      <i className="fas fa-arrow-right ml-2"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
