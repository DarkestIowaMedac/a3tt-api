import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';
import { Users } from '@/users/entities/users.entity';
import { UsersRepository } from '@/users/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Users])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
  ],
})
export class CategoryModule {}
