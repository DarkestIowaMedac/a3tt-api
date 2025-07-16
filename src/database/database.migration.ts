import { DataSource } from 'typeorm';
import { databaseProvider } from './database.provider'; // Reutiliza la configuración

//Configuración para las migraciones
export const databaseMigrations = new DataSource({
  type: 'oracle',
  ...databaseProvider, 
  entities: ['dist/**/*.entity.js'], 
  migrations: ['dist/database/migrations/*.js'], 
  migrationsTableName: 'typeorm_migrations' 
});