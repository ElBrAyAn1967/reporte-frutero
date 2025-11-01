'use client';

interface ProtocoloSelectorProps {
  selectedProtocolo: string | null;
  customProtocolo: string;
  onSelectProtocolo: (protocolo: string) => void;
  onCustomProtocoloChange: (value: string) => void;
  showCustomInput: boolean;
  setShowCustomInput: (show: boolean) => void;
}

// Lista de protocolos/eventos predefinidos
const protocolosDisponibles = [
  { value: 'verano-builder-latam-2024', label: 'Verano Builder LATAM 2024' },
  { value: 'ethmexico-2024', label: 'ETHMexico 2024' },
  { value: 'ethglobal-prague-2024', label: 'ETHGlobal Prague 2024' },
  { value: 'devcon-vi', label: 'Devcon VI' },
  { value: 'consensys-summit', label: 'Consensys Summit' },
  { value: 'custom', label: '✏️ Otro (Escribir manualmente)' },
];

export default function ProtocoloSelector({
  selectedProtocolo,
  customProtocolo,
  onSelectProtocolo,
  onCustomProtocoloChange,
  showCustomInput,
  setShowCustomInput,
}: ProtocoloSelectorProps) {

  const handleProtocoloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomInput(true);
      onSelectProtocolo('');
    } else {
      setShowCustomInput(false);
      onSelectProtocolo(value);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="protocolo" className="block text-sm font-medium mb-2">
          📋 Protocolo / Evento
        </label>
        <select
          id="protocolo"
          value={showCustomInput ? 'custom' : selectedProtocolo || ''}
          onChange={handleProtocoloChange}
          className="w-full px-4 py-3 border border-muted-foreground/30 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Selecciona un protocolo o evento --</option>
          {protocolosDisponibles.map((protocolo) => (
            <option key={protocolo.value} value={protocolo.value}>
              {protocolo.label}
            </option>
          ))}
        </select>
      </div>

      {showCustomInput && (
        <div className="animate-in slide-in-from-top duration-300">
          <label htmlFor="customProtocolo" className="block text-sm font-medium mb-2">
            ✏️ Nombre del Protocolo/Evento
          </label>
          <input
            id="customProtocolo"
            type="text"
            value={customProtocolo}
            onChange={(e) => onCustomProtocoloChange(e.target.value)}
            placeholder="Ej: Hackathon Universidad Nacional"
            className="w-full px-4 py-3 border border-muted-foreground/30 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-2">
            💡 Escribe el nombre del protocolo o evento para organizar tus reportes
          </p>
        </div>
      )}

      {(selectedProtocolo || customProtocolo) && (
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            <strong>📌 Protocolo seleccionado:</strong>{' '}
            <span className="text-primary font-semibold">
              {customProtocolo || protocolosDisponibles.find(p => p.value === selectedProtocolo)?.label}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Los reportes se agruparán bajo este protocolo/evento
          </p>
        </div>
      )}
    </div>
  );
}
