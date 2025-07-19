import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from './task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
    
constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

    create(createTaskDto: CreateTaskDto) {
      return 'This action adds a new task';
    }
  
    getByCategory() {
      return `This action returns all task`;
    }
  
    getById(id: number) {
      return `This action returns single task`;
    }
  
    updateDetails(id: number, updateTaskDto: UpdateTaskDto) {
      return `This action updates a #${id} task`;
    }
  
    updateState(id: number, updateTaskDto: UpdateTaskDto) {
      return `This action updates a #${id} task`;
    }
  
    updateCategory(id: number, updateTaskDto: UpdateTaskDto) {
      return `This action updates a #${id} task`;
    }
  
    delete(id: number) {
      return `This action removes a #${id} task`;
    }
}