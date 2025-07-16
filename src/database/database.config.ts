import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';


export const databaseConfig = (config: ConfigService): TypeOrmModuleOptions => {
  comprobarVariables(config);
  
  return {
    type: config.get("DB_TYPE"),
    host: config.get("DB_HOST"),
    port: config.get<number>("DB_PORT"),
    username: config.get("DB_USERNAME"),
    password: config.get<string>("DB_PASSWORD"),
    sid: config.get("DB_SID"),
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    logging: config.get("NODE_ENV") === "development",
    autoLoadEntities: true,
    retryAttempts: 3,
    retryDelay: 3000,
    extra: {
      connectTimeout: 60000, 
      poolMax: 10,           
      poolMin: 2,             
      queueTimeout: 60000    
    }
  };
};

// Función para TypeORM CLI
export const createDataSource = (config: ConfigService): DataSource => {
  return new DataSource({
    ...databaseConfig(config) as DataSourceOptions
  });
};

// Función de validación (Si no has configurado alguna variable de entorno te lo dirá)
function comprobarVariables(config: ConfigService) {
  const requiredVars = ['DB_TYPE', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD'];
  const missingVars = requiredVars.filter(v => !config.get(v));
  
  if (missingVars.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missingVars.join(', ')}`);
  }
}

// Adaptación para TypeORM CLI
if (require.main === module) {
  const { config } = require('dotenv');
  const { createDataSource } = require('./typeorm-config');
  
  config();
  const dataSource = createDataSource({
    get: (key: string) => process.env[key]
  });
  
  module.exports = dataSource;
}