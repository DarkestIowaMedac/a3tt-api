import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API A3TT')
  .setDescription('Documentation')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter your token JWT',
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