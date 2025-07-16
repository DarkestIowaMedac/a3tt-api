import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Solución para Windows - Carga manual del .env
const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1521'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  sid: process.env.DB_SID,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
  logging: true, // Temporal para debug
  extra: { connectTimeout: 60000 }
});

// // Debug: Verifica que el archivo existe
// console.log('✅ Archivo data-source.ts cargado correctamente');
// console.log('📁 Ruta del .env:', envPath);
// console.log('🔍 Variables:', {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   sid: process.env.DB_SID
// });