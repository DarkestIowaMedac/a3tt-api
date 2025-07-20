import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
//import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repositories/task.repository.interface';
import { CategoryRepository } from '@/category/repositories/category.repository';
import { Task } from './entities/task.entity';
import { UpdateTaskDetailsDto } from './dto/update-task-details.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';

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

  updateDetails(userId: number, id: number, updateTaskDto: UpdateTaskDetailsDto) {
    this.validateTask(userId, id);
    return this.taskRepository.updateDetails(id, updateTaskDto)
  }

  async updateState(userId: number, id: number) {
    const result = await this.validateTask(userId, id);
    let taskData = new Task()
   
    result.state == 0? taskData.state = 1: taskData.state = 0;
    return this.taskRepository.updateState(id, taskData)
  }

  async updateCategory(userId: number, id: number, updateTaskCategoryDto: UpdateTaskCategoryDto) {
    const task = await this.validateTask(userId, id);
    const newCategory = await this.validateCategory(userId, updateTaskCategoryDto.categoryId)
    const taskData = {
      category: updateTaskCategoryDto.categoryId === -1 
      ? null 
      : { id: updateTaskCategoryDto.categoryId }
    };
    return this.taskRepository.updateCategory(id, taskData)
  }

  async delete(userId: number, id: number) {
    const task = await this.validateTask(userId, id);
    await this.taskRepository.delete(id);
  }

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
