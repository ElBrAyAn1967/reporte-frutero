# 🤖 Procesador Inteligente de Texto

El sistema ahora incluye un **procesador inteligente** que convierte automáticamente texto plano en Markdown profesional estructurado.

## ✨ Características

### 1. **Detección Automática de Estructura**
El procesador analiza tu texto y detecta automáticamente:
- ✅ Títulos y subtítulos
- ✅ Listas (con viñetas o numeradas)
- ✅ Secciones y separadores
- ✅ Énfasis (negritas, cursivas)
- ✅ Tablas
- ✅ Enlaces
- ✅ Métricas y números importantes

### 2. **Soporte Dual: Plain Text + Markdown**
- **Texto plano**: Lo convierte automáticamente a Markdown
- **Markdown existente**: Lo preserva y solo lo limpia

### 3. **Procesamiento Inteligente**
Usa algoritmos de detección de patrones basados en:
- Longitud de líneas
- Palabras clave de contexto
- Estructura de párrafos
- Formato de datos numéricos

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Texto Plano Simple

**Entrada (texto plano):**
```
MOBIL3 HACKATHON X MONAD

Event Overview:
El hackathon se llevó a cabo del 20 al 24 de agosto en Ciudad de México.

36 Total Submissions
3 Main Tracks
67% Mobile-First Projects

Participantes destacados:
- Juan Pérez
- María García
- Carlos López

Importante: Todos los proyectos usaron tecnología blockchain.
```

**Salida (Markdown procesado):**
```markdown
---
**Reporte de Análisis de Evento**
📅 *24 de octubre de 2025 · 10:30*
---

# MOBIL3 HACKATHON X MONAD

## Event Overview

El hackathon se llevó a cabo del 20 al 24 de agosto en Ciudad de México.

- **36** Total Submissions
- **3** Main Tracks
- **67%** Mobile-First Projects

### Participantes destacados

- Juan Pérez
- María García
- Carlos López

**Importante**: Todos los proyectos usaron tecnología `blockchain`.
```

---

### Ejemplo 2: Datos con Estructura

**Entrada:**
```
Reporte de Actividades Frutero Club

Sesiones realizadas: 12
Participantes totales: 150
Proyectos completados: 45

Distribución Regional
Norte: 40 participantes
Centro: 65 participantes
Sur: 45 participantes

Las sesiones más populares fueron las de desarrollo en Solana y diseño UI/UX.
```

**Salida:**
```markdown
---
**Reporte de Actividades**
📅 *24 de octubre de 2025 · 10:30*
---

# Reporte de Actividades Frutero Club

- **Sesiones realizadas**: **12**
- **Participantes totales**: **150**
- **Proyectos completados**: **45**

---

## Distribución Regional

- **Norte**: **40** participantes
- **Centro**: **65** participantes
- **Sur**: **45** participantes

Las sesiones más populares fueron las de desarrollo en `Solana` y diseño `UI/UX`.
```

---

### Ejemplo 3: Lista con Descripciones

**Entrada:**
```
Tecnologías Más Usadas

React: Framework para interfaces de usuario
Solidity: Lenguaje para smart contracts
IPFS: Sistema de archivos distribuido
Monad: Blockchain de alto rendimiento
```

**Salida:**
```markdown
## Tecnologías Más Usadas

- **React**: Framework para interfaces de usuario
- **Solidity**: Lenguaje para smart contracts
- **IPFS**: Sistema de archivos distribuido
- **Monad**: `Blockchain` de alto rendimiento
```

---

### Ejemplo 4: Texto con Tabla

**Entrada:**
```
Ranking de Proyectos

Proyecto    Puntos    Categoría
EcoChain    95        Sostenibilidad
PayFlow     92        Finanzas
SocialHub   88        Redes Sociales
```

**Salida:**
```markdown
## Ranking de Proyectos

| Proyecto | Puntos | Categoría |
| --- | --- | --- |
| EcoChain | **95** | Sostenibilidad |
| PayFlow | **92** | Finanzas |
| SocialHub | **88** | Redes Sociales |
```

---

### Ejemplo 5: Markdown Existente (Se Preserva)

**Entrada:**
```markdown
# Mi Reporte con Markdown

## Sección 1

Este texto ya está en **Markdown** con *énfasis*.

- Item 1
- Item 2

```javascript
const code = "example";
```
```

**Salida:**
```markdown
---
**Reporte**
📅 *24 de octubre de 2025 · 10:30*
---

# Mi Reporte con Markdown

## Sección 1

Este texto ya está en **Markdown** con *énfasis*.

- Item 1
- Item 2

```javascript
const code = "example";
```
```

---

## 🎯 Reglas de Detección

### Títulos (H1, H2, H3)

| Patrón | Se Convierte a | Ejemplo |
|--------|----------------|---------|
| TODO EN MAYÚSCULAS | `# Título` | `REPORTE ANUAL` → `# REPORTE ANUAL` |
| Línea termina en `:` | `## Subtítulo` | `Análisis:` → `## Análisis` |
| Palabras clave + corto | `### Sección` | `Descripción General` → `### Descripción General` |
| Línea seguida de `---` | `## Título` | `Título\n---` → `## Título` |

**Palabras clave detectadas:**
- Descripción, Objetivo, Resultado, Análisis, Conclusión, Recomendación
- Overview, Insights, Challenges, Recommendations, Impact, Distribution

---

### Listas

| Patrón | Se Convierte a |
|--------|----------------|
| `• Item` | `- Item` |
| `* Item` | `- Item` |
| `- Item` | `- Item` (preservado) |
| `1. Item` | `1. Item` (preservado) |
| `Nombre: Valor` | `- **Nombre**: Valor` |

---

### Énfasis Automático

| Patrón | Resultado |
|--------|-----------|
| `36 Total Submissions` | `**36** Total Submissions` |
| `67%` | `**67%**` |
| `Importante: texto` | `**Importante**: texto` |
| `API`, `SDK`, `URL` | \`API\`, \`SDK\`, \`URL\` |

---

## 🚀 Cómo Usar

### 1. **Interfaz Web**

Simplemente pega tu texto (plano o Markdown) en el área de texto y presiona **"Guardar en Base de Datos"**. El sistema procesará automáticamente tu contenido.

### 2. **API Directa**

```javascript
// POST /api/save-report-db
fetch('/api/save-report-db', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reportType: 'evento',  // 'frutero', 'evento', 'cualitativo'
    title: 'Mi Reporte',
    content: 'Tu texto plano aquí...',
  })
})
```

El contenido será procesado automáticamente antes de guardarse.

---

## 🎨 Estilos Aplicados

Una vez procesado y guardado, el reporte se renderizará con:

✅ **Títulos H1** → Fondo degradado con borde amarillo
✅ **Títulos H2** → Borde inferior naranja
✅ **Títulos H3** → Borde izquierdo verde
✅ **Listas** → Bullets amarillos personalizados
✅ **Enlaces** → Color primary con hover effect
✅ **Negritas** → Color primary (amarillo)
✅ **Código** → Background muted, color accent
✅ **Tablas** → Header con gradiente, hover en filas

---

## 💡 Consejos

### ✅ **Mejores Prácticas**

1. **Títulos claros**: Usa mayúsculas o dos puntos para títulos principales
2. **Listas consistentes**: Usa viñetas (`-`, `*`, `•`) o números
3. **Métricas destacadas**: Los números se resaltarán automáticamente
4. **Secciones separadas**: Deja líneas vacías entre secciones

### ❌ **Evita**

1. Mezclar diferentes estilos de lista en una sección
2. Líneas muy largas sin puntos (dificulta detección de títulos)
3. Texto sin estructura (dificulta el procesamiento)

---

## 🔧 Configuración Avanzada

Si necesitas personalizar el procesamiento, puedes modificar las opciones en `lib/text-processor.ts`:

```typescript
const options = {
  detectTitles: true,      // Detectar títulos automáticamente
  detectLists: true,       // Detectar listas
  detectSections: true,    // Agregar separadores entre secciones
  detectEmphasis: true,    // Detectar énfasis (negritas, cursivas)
  detectTables: true,      // Detectar tablas
  preserveMarkdown: true,  // Preservar Markdown existente
};
```

---

## 📊 Ejemplos Completos

### Reporte de Evento Completo

```
MOBIL3 HACKATHON X MONAD - REPORTE FINAL

Event Overview:
El hackathon se llevó a cabo del 20 al 24 de agosto de 2025 en Ciudad de México.

Key Metrics:
36 Total Submissions
3 Main Tracks
67% Mobile-First Projects
150 Participants
24 Mentors

Track Distribution Analysis

Payments Track: 16 proyectos (44%)
- Enfocados en soluciones de pagos móviles
- Integración con Web3

Social Impact: 12 proyectos (33%)
- Aplicaciones educativas
- Herramientas comunitarias

Gaming & Entertainment: 8 proyectos (22%)
- Juegos blockchain
- Plataformas de streaming

Mentorship Impact

José Martínez: 15 horas - Solidity, Smart Contracts
María Rodríguez: 12 horas - React, Frontend
Carlos Gómez: 10 horas - Product Design

Technical Challenges:
- Integración con Monad blockchain
- Optimización de gas fees
- Testing en mainnet

Recomendaciones Estratégicas

1. Expandir el programa de mentorías
2. Crear workshops pre-hackathon
3. Mejorar la documentación técnica
4. Establecer partnerships con más sponsors

Importante: El 83% de los participantes completó el hackathon exitosamente.
```

Este texto se procesará automáticamente a un reporte Markdown completamente estructurado con:
- Título principal destacado
- Secciones con separadores
- Métricas resaltadas en negrita
- Listas con formato profesional
- Metadata de fecha y hora
- Estilos visuales aplicados automáticamente

---

## 🎉 Resultado

¡Ya no necesitas preocuparte por el formato! Solo pega tu texto y el sistema hará el resto. 🚀
