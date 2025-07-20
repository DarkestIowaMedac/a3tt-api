import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
//import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repositories/task.repository.interface';
import { CategoryRepository } from '@/category/repositories/category.repository';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
        @Inject('ITaskRepository') // 👈 Inyecta la interfaz
        private readonly taskRepository: ITaskRepository,
        private readonly categoryRepository: CategoryRepository,
      ) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
     await this.validateCategory(userId, createTaskDto.categoryId);
     const taskData = Object.assign({}, createTaskDto, { 
        state: 0, 
        user: { id: userId }, 
        category: createTaskDto.categoryId === -1 ? { id: null } : { id: createTaskDto.categoryId }
      });
      return this.taskRepository.create(taskData)
  }

  async getByCategory(userId: number, category_id: number, state: 0|1) {
    if(category_id != -1){
        await this.validateCategory(userId, category_id)
    }
    return this.taskRepository.getByCategory(userId, category_id, state)
  }

  getById(userId: number, id: number) {
    return this.validateTask(userId, id);
  }

  // updateDetails(id: number, updateTaskDto: UpdateTaskDto) {
  //   return this.taskRepository.updateDetails()
  // }

  // updateState(id: number, updateTaskDto: UpdateTaskDto) {
  //   return this.taskRepository.updateState()
  // }

  // updateCategory(id: number, updateTaskDto: UpdateTaskDto) {
  //   return this.taskRepository.updateCategory()
  // }

  // delete(id: number) {
  //   return this.taskRepository.delete()
  // }

  private async validateTask(userId: number, id: number): Promise<Task> {

  const task = await this.taskRepository.getById(id);
  
  if (!task) {
    throw new ForbiddenException(
      'La tarea no existe')
  }
  if (task.user.id != userId){
    throw new ForbiddenException('La tarea no te pertenece')
  }
  return task;
 }

  private async validateCategory(userId: number, categoryId: number): Promise<void> {

  if (categoryId === -1) return;

  const category = await this.categoryRepository.getById(categoryId);
  
  if (!category) {
    throw new ForbiddenException(
      'La categoría no existe')
  }
  if (category.user.id != userId){
    throw new ForbiddenException('La categoría no te pertenece')
  }
}
}
