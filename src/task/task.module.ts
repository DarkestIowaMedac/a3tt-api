// task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Category } from '../category/entities/category.entity'; 
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './repositories/task.repository';
import { CategoryRepository } from '../category/repositories/category.repository'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Category]) // 
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    CategoryRepository, // Añade esto como proveedor
  ],
})
export class TaskModule {}