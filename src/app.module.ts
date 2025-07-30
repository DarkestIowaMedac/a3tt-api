import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./users/users.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { DatabaseModule } from "./database/database.module"
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env' //En nestJs las rutas relativas funcionan desde el directorio de trabajo
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
