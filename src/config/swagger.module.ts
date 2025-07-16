import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerCustomOptions } from '../config/swagger.config';

//Módulo de swagger con la configuración en otra hoja para mayor limpieza
@Module({})
export class SwaggerModuleSetup {
  static init(app) {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(
      'api-docs',
      app,
      document,
      swaggerCustomOptions,
    );
  }
}