import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { Users } from './entities/users.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => UsersModule),],
  controllers: [UsersController],
  providers: [UsersService, 
    {
      provide: 'IUsersRepository', // Token para inyección //TODO Entender a qué se refiere esto
      useClass: UsersRepository,   // Implementación concreta
    },
  ],
  exports: [UsersService]
})
export class UsersModule {}
