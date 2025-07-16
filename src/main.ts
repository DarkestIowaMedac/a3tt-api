import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"; 
import { SwaggerModuleSetup } from './config/swagger.module';
import { CreateUserDto } from "./users/dto/create-users.dto";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  SwaggerModuleSetup.init(app);

  // Habilitar validación global  //TODO Entender qué es esto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  
  // Habilitar CORS para el frontend Angular
  app.enableCors({
    origin: "http://localhost:4200",
    credentials: true,
  })

  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Swagger UI en http://localhost:${port}/api-docs`);
}

bootstrap()
