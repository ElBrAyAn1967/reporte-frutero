import { pgTable, text, timestamp, uuid, jsonb, varchar } from 'drizzle-orm/pg-core';

// Tabla principal de reportes
export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Tipo de reporte: 'frutero', 'evento', 'cualitativo'
  reportType: varchar('report_type', { length: 50 }).notNull(),

  // Protocolo/Evento al que pertenece el reporte
  protocolo: varchar('protocolo', { length: 100 }),

  // Si el protocolo fue ingresado manualmente por el usuario
  protocoloCustom: varchar('protocolo_custom', { length: 100 }),

  // Título del reporte
  title: text('title').notNull(),

  // Contenido completo del reporte en Markdown
  content: text('content').notNull(),

  // Metadatos generales
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  // Usuario/sesión (opcional)
  userId: text('user_id'),
  userName: text('user_name'),

  // Datos estructurados específicos por tipo de reporte
  // Esto permite guardar datos JSON flexibles según el tipo
  metadata: jsonb('metadata'),

  // Para reportes fruteros (actividades)
  kitActividades: jsonb('kit_actividades'), // Array de actividades
  manualesGuias: jsonb('manuales_guias'), // Información de manuales
  hubParticipantes: text('hub_participantes'), // URL del hub
  metricasSesiones: jsonb('metricas_sesiones'), // Array de sesiones con datos
  rankingSesiones: jsonb('ranking_sesiones'), // Array de rankings
  distribucionRegion: jsonb('distribucion_region'), // Datos geográficos
  analisisGeografico: jsonb('analisis_geografico'), // Análisis geo

  // Para reportes de eventos
  descripcionGeneral: jsonb('descripcion_general'), // Proyectos completos, pendientes, etc.
  reporteAnalisisTecnico: text('reporte_analisis_tecnico'),
  categoriasProyectos: jsonb('categorias_proyectos'), // Array de categorías
  actividadesPrincipales: jsonb('actividades_principales'), // KPIs, Workshops, etc.
  mentorias: jsonb('mentorias'), // Datos de mentorías
  obstaculosComunes: jsonb('obstaculos_comunes'), // Array de obstáculos
  patrocinadores: jsonb('patrocinadores'), // Array de patrocinadores
  recomendacionesEstrategicas: jsonb('recomendaciones_estrategicas'),
  desafiosAprendizajes: jsonb('desafios_aprendizajes'),
  testimonios: jsonb('testimonios'), // Array de testimonios

  // Para reportes cualitativos
  datosParticipantes: jsonb('datos_participantes'), // Total y perfiles
  habilidadesClave: jsonb('habilidades_clave'), // Array de habilidades
  experienciaPreviaBlockchain: jsonb('experiencia_previa_blockchain'),
  tecnologiasOcupadas: jsonb('tecnologias_ocupadas'), // Array de tecnologías
  aspectosValorados: jsonb('aspectos_valorados'),
  impactoPercibido: jsonb('impacto_percibido'),
  conclusionesAprendizajes: jsonb('conclusiones_aprendizajes'),

  // Estado del reporte
  status: varchar('status', { length: 20 }).default('draft'), // draft, published, archived

  // Archivos adjuntos (URLs o referencias)
  attachments: jsonb('attachments'), // Array de archivos adjuntos

  // Generado por IA
  isAiGenerated: varchar('is_ai_generated', { length: 10 }).default('false'),
  aiModel: text('ai_model'), // ej: 'gemini-2.5-flash'
  aiPrompt: text('ai_prompt'), // El prompt usado para generar el reporte
});

// Tipos TypeScript derivados del schema
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
