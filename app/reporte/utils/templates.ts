export type ReportType = 'frutero' | 'evento' | 'cualitativo';

export const getMarkdownTemplate = (reportType: ReportType): string => {
  switch (reportType) {
    case 'frutero':
      return `# Reporte Frutero - ${new Date().toLocaleDateString('es-ES')}

## Título
[Nombre del programa/actividad]

## Kit de Actividades
- **Actividad 1:** Descripción y objetivos
- **Actividad 2:** Descripción y objetivos
- **Actividad 3:** Descripción y objetivos

## Manuales y guias 
- **Manual técnico:** Estado y contenido
- **Manual del participante:** Estado y contenido
- **Guías de implementación:** Estado y contenido

## Hub para Participantes 

## Métricas de Sesiones
| Sesión | Fecha | Asistencia | Duración | Satisfacción |
|--------|-------|------------|----------|--------------|
| 1 | DD/MM/YYYY | X/Y | Xh | X/5 |
| 2 | DD/MM/YYYY | X/Y | Xh | X/5 |

**Promedio de asistencia:** X%
**Satisfacción promedio:** X/5

## Ranking de Sesiones
1. **[Nombre de sesión]** - Puntuación: X/10 - Razón: [Motivo del ranking]
2. **[Nombre de sesión]** - Puntuación: X/10 - Razón: [Motivo del ranking]
3. **[Nombre de sesión]** - Puntuación: X/10 - Razón: [Motivo del ranking]

### Distribución por región
- **Ciudad de México:** X participantes (X%)
- **Guadalajara:** X participantes (X%)
- **Monterrey:** X participantes (X%)
- **Otras ciudades:** X participantes (X%)

### Mapa de participación
- **Región con mayor participación:** [Región]
- **Región con menor participación:** [Región]
- **Oportunidades de expansión:** [Regiones identificadas]

## Analisis Geografico 
- **Fortalezas identificadas:**
- **Áreas de mejora:**
- **Próximos pasos:**`;

    case 'evento':
      return `# Reporte de Evento - ${new Date().toLocaleDateString('es-ES')}

## Título
[Nombre del evento]

## Descripcion general 
- **Proyectos completos :** 
- **Proyectos pendientes:**
- **Proyectos no entregados:** 

## Reporte de Analisis tecnico 

## Categorías de proyectos
- **Categoría 1:** [Descripción]
- **Categoría 2:** [Descripción]
- **Categoría 3:** [Descripción]

### Actividades principales
- **KPIs:** [Tema y speaker]
- **Workshops:** [Lista de workshops]
- **Networking:** [Actividades de networking]
- **Demostraciones:** [Demos técnicas]

## Mentorías
### Sesiones de mentoría durante el evento
- **Mentor:** [Nombre] - **Sesiones:** [Número] - **Participantes:** [Total]
- **Mentor:** [Nombre] - **Sesiones:** [Número] - **Participantes:** [Total]

### Feedback de mentorías
- **Calidad percibida:** X/5
- **Relevancia del contenido:** X/5

### Obstaculos comunes
- **Desafío 1:** [Descripción y frecuencia]
- **Desafío 2:** [Descripción y frecuencia]
- **Desafío 3:** [Descripción y frecuencia]

## Patrocinadores adopcion tecnologica
- **Patrocinador 1:** [Contribución y rol]
- **Patrocinador 2:** [Contribución y rol]

## Recomendaciones estrategicas
- **Recomendación 1:** [Descripción y justificación]
- **Recomendación 2:** [Descripción y justificación]

## Desafios y aprendizajes
- **Desafío 1:** [Descripción y lección aprendida]

### Testimonios de participantes
- **Participante 1:** "Comentario..."
- **Participante 2:** "Comentario..."
- **Participantes**`;

    case 'cualitativo':
      return `# Reporte Cualitativo - ${new Date().toLocaleDateString('es-ES')}

## Título
[Nombre del análisis/proyecto evaluado]

## Datos participantes 
- **Total de participantes:** [Número]
### Perfil de participantes
- ** Desarrolladores    :** [Número y %]
- ** Emprendedores     :** [Número y %]
- ** Otros            :** [Número y %]
- **Nivel de experiencia en Desarrollo:** [Principiante, Intermedio, Avanzado]
- **Nivel de experiencia en Criptomonedas :** [Principiante, Intermedio, Avanzado]

## Habilidades clave 
- **Habilidad 1:** [Descripción y nivel]
- **Habilidad 2:** [Descripción y nivel]
### Experiencia Previa en Blockchain
- **Proyectos previos:** [Número y tipo]
- **Conocimientos técnicos:** [Lenguajes y herramientas]

## Tecnologias ocupadas por los participantes
- **Tecnología 1:** [Descripción y uso]
- **Tecnología 2:** [Descripción y uso]

### Aspectos mas valorados del programa
- **Contenido técnico:** [Nivel de satisfacción]
- **Soporte y recursos:** [Calidad percibida]
- **Comunidad y networking:** [Valoración]

### Impacto percibido
- **Conocimientos adquiridos:** [Nivel de satisfacción]
- **Aplicabilidad práctica:** [Relevancia para participantes]

##  Recomendaciones estrategicas 

### Conclusiones y aprendizajes
- **Conclusión 1:** [Descripción y análisis]
- **Conclusión 2:** [Descripción y análisis]:`;

    default:
      return `# Reporte - ${new Date().toLocaleDateString('es-ES')}

## Título
[Título del reporte]

[Contenido del reporte...]`;
  }
};

export const reportTypes = [
  { value: 'frutero', label: 'Reporte Frutero', icon: 'fas fa-apple-alt', description: 'Actividades y deliverables' },
  { value: 'evento', label: 'Reporte de Evento', icon: 'fas fa-calendar-check', description: 'Field report y análisis' },
  { value: 'cualitativo', label: 'Reporte Cualitativo', icon: 'fas fa-chart-pie', description: 'Análisis de proyectos' }
] as const;