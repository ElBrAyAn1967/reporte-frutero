import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';

// Verificar que la DATABASE_URL esté configurada
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

// Crear conexión a la base de datos
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Crear instancia de Drizzle
export const db = drizzle(pool, { schema });

// Exportar el schema para usarlo en queries
export { schema };
