import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API de tu Aplicación')
  .setDescription('Documentación oficial')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Ingresa tu token JWT',
      in: 'header',
    },
    'JWT-auth', // El nombre de seguridad que debe coincidir con @ApiBearerAuth())
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true, // Mantiene el token entre recargas
  },
  customSiteTitle: 'API Docs', // Título
};