import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from './task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDetailsDto } from '../dto/update-task-details.dto';
import { UpdateTaskCategoryDto } from '../dto/update-task-category.dto';

@Injectable()
export class TaskRepository implements ITaskRepository {
    
constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  async create(taskData: { name?: string; description?: string, state: number, categoryId: number, user: { id: number }  }): Promise<Task>{
        const category = this.repository.create(taskData);
        return this.repository.save(category);
    }

  async getByCategory(userId: number, category_id: number, state: 0|1): Promise<Task[]> {
      const whereCondition: any = { 
        user: { id: userId },  
        category: category_id !== -1 ? { id: category_id } : IsNull(),
        state: state
        };

        return this.repository.find({ 
            where: whereCondition,
            order: { name: 'DESC' }  // Orden opcional
        });
    }
  
    async getById(id: number): Promise<Task | null> {
        return this.repository.findOne({ 
            where: { id },  
            relations: ['user', 'category'],
            loadEagerRelations: false      
        })       
    }
  
    async updateDetails(id: number, taskData: UpdateTaskDetailsDto) {
        await this.repository.update(id, taskData);
        return this.repository.findOne({ 
        where: { id }, 
        relations: ['user', 'category'],
        loadEagerRelations: false       
        });
    }
    
    async updateState(id: number, taskData: Task) {
        await this.repository.update(id, taskData);
        return this.repository.findOne({ 
        where: { id }, 
        relations: ['user', 'category'],
        loadEagerRelations: false       
        });
    }
  
    async updateCategory(id: number, taskData: {category: {id: number}}) {
        await this.repository.update(id, taskData);
        return this.repository.findOne({ 
        where: { id }, 
        relations: ['user', 'category'],
        loadEagerRelations: false       
        });
    }
  
    async delete(id: number) {
      await this.repository.delete({ id });
    }
}