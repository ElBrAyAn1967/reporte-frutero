# 🚀 Guía de Uso - Sistema de Reportes con IA

## ✅ Cambios implementados

### 1. **Botón "Guardar en Base de Datos"**
- Ubicación: Después de usar la IA o ingresar contenido manualmente
- Guarda en PostgreSQL con Drizzle ORM
- **Redirige automáticamente** a la página de visualización correspondiente

### 2. **Reporte Cualitativo arreglado**
- Agregados estilos CSS (`report-content-wrapper`)
- Muestra correctamente el contenido generado por IA

---

## 📋 Cómo usar el sistema completo

### Paso 1: Ir a la página de reportes
```
http://localhost:3000/reporte
```

### Paso 2: Seleccionar tipo de reporte

Tienes 3 opciones:

1. **🍎 Reporte Frutero** → Se guarda en `/actividades`
2. **📊 Reporte de Evento** → Se guarda en `/analisis`
3. **📈 Reporte Cualitativo** → Se guarda en `/cualitativo`

### Paso 3: Elegir método de entrada

- **Arrastra tu archivo** (.md)
- **Ingreso manual** (con asistencia de IA)

### Paso 4: Usar la IA (Opcional pero recomendado)

**Ejemplos de prompts:**

Para Reporte Frutero:
```
Ayúdame a crear un reporte frutero con métricas de un bootcamp de blockchain.
Incluye 30 participantes, 5 sesiones, y satisfacción promedio de 4.5/5
```

Para Reporte de Evento:
```
Crea un reporte de evento para un hackathon de Web3 con 15 proyectos completados,
3 mentores y testimonios de participantes
```

Para Reporte Cualitativo:
```
Genera un reporte cualitativo de un programa de desarrollo blockchain con análisis
de habilidades técnicas, tecnologías ocupadas y conclusiones
```

### Paso 5: Revisar el contenido generado

La IA agregará el contenido al área de texto. Puedes:
- Editarlo manualmente
- Agregar más secciones
- Usar la plantilla predefinida

### Paso 6: Guardar

**Opción A: Solo guardar en archivo .md**
- Click en "Procesar Reporte"
- Se guarda en el archivo .md
- Redirige a la página de visualización

**Opción B: Guardar en Base de Datos + archivo .md (RECOMENDADO)**
- Click en "Guardar en Base de Datos" 🔥
- Se guarda en PostgreSQL con todos los metadatos
- Se guarda también en archivo .md para visualización
- **Redirige automáticamente** a la página correspondiente

---

## 🗄️ Base de Datos

### Estructura de la tabla `reports`

Todos los reportes se guardan con:
- ✅ ID único (UUID)
- ✅ Tipo de reporte
- ✅ Título y contenido completo
- ✅ Metadatos (usuario, archivos adjuntos)
- ✅ Campos específicos por tipo de reporte
- ✅ Información de IA (modelo, prompt usado)
- ✅ Timestamps automáticos

### Consultar reportes guardados

**Ver todos los reportes:**
```bash
GET http://localhost:3000/api/save-report-db
```

**Filtrar por tipo:**
```bash
GET http://localhost:3000/api/save-report-db?type=frutero
GET http://localhost:3000/api/save-report-db?type=evento
GET http://localhost:3000/api/save-report-db?type=cualitativo
```

**Interfaz visual de base de datos:**
```bash
npm run db:studio
```

---

## 📊 Flujo completo recomendado

```
1. Ir a /reporte
   ↓
2. Seleccionar "Reporte Cualitativo" (o cualquier otro)
   ↓
3. Elegir "Ingreso Manual"
   ↓
4. Usar IA: "Crea un reporte cualitativo de un bootcamp..."
   ↓
5. Revisar y editar el contenido generado
   ↓
6. Click en "Guardar en Base de Datos" 🎯
   ↓
7. ✅ Se guarda en PostgreSQL
   ↓
8. ✅ Se guarda en ai-cualitativo.md
   ↓
9. 🚀 Redirección automática a /cualitativo
   ↓
10. ✨ Ver tu reporte con el badge "Generado con IA"
```

---

## 🔥 Ventajas del nuevo sistema

### Antes:
- ❌ Solo se guardaba en archivos .md
- ❌ Difícil de consultar datos estructurados
- ❌ Sin redirección automática

### Ahora:
- ✅ Se guarda en PostgreSQL (persistente, consultable, escalable)
- ✅ Se guarda también en .md (para visualización web)
- ✅ Redirección automática a la visualización
- ✅ Metadatos completos (IA, archivos, timestamps)
- ✅ Campos específicos por tipo de reporte
- ✅ Sistema profesional con Drizzle ORM

---

## 🐛 Troubleshooting

### "No se ve la respuesta de la IA"

**Solución:**
1. Asegúrate de que la API Key de Gemini esté configurada en `.env.local`
2. Verifica que hayas presionado "Enviar" en el asistente de IA
3. Espera el mensaje: "✨ ¡La IA ha generado contenido para tu reporte!"
4. El contenido aparecerá en el área de texto grande

### "Error al guardar en base de datos"

**Solución:**
1. Verifica la conexión a internet
2. Comprueba que `DATABASE_URL` esté en `.env.local`
3. Ejecuta: `npm run db:push` para crear/actualizar la tabla

### "No se muestra el reporte en /cualitativo"

**Solución:**
1. Asegúrate de haber hecho click en "Guardar en Base de Datos" o "Procesar Reporte"
2. Verifica que el archivo `ai-cualitativo.md` exista en `/content`
3. Recarga la página (F5)

---

## 📝 Archivos generados

Los reportes se guardan en archivos separados:

- Reporte Frutero → `content/ai-actividades.md`
- Reporte de Evento → `content/ai-analisis.md`
- Reporte Cualitativo → `content/ai-cualitativo.md`

**Nota:** Cada vez que guardas un nuevo reporte del mismo tipo, **reemplaza** el anterior (no se agrega al final).

---

## 🎯 Ejemplo completo paso a paso

1. Ir a: `http://localhost:3000/reporte`
2. Click en dropdown → Seleccionar "Reporte Cualitativo"
3. Click en "Ingreso Manual"
4. En el asistente de IA escribir:
   ```
   Genera un reporte cualitativo de 46 participantes de un bootcamp blockchain.
   Incluye análisis de habilidades técnicas (JavaScript, Python, Solidity),
   tecnologías más usadas, y conclusiones sobre el impacto del programa.
   ```
5. Click en "Enviar" (botón del asistente IA)
6. Esperar respuesta de IA (aparece en el textarea)
7. Click en "Guardar en Base de Datos" (botón verde)
8. Ver mensaje de éxito con ID del reporte
9. Serás redirigido automáticamente a `/cualitativo`
10. ✅ Ver tu reporte con el badge verde "Generado con IA"

---

## 🔧 Scripts disponibles

```bash
# Iniciar desarrollo
npm run dev

# Ver base de datos (interfaz visual)
npm run db:studio

# Crear tabla en BD (ya ejecutado)
npm run db:push

# Generar migraciones
npm run db:generate
```

---

¡Todo listo! Ahora tienes un sistema profesional de reportes con IA y base de datos PostgreSQL. 🎉
