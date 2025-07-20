import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
//import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repositories/task.repository.interface';
import { CategoryRepository } from '@/category/repositories/category.repository';

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

  // getByCategory() {
  //   return this.taskRepository.getByCategory()
  // }

  // getById(id: number) {
  //   return this.taskRepository.getById()
  // }

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
