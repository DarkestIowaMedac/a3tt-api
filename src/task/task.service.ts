import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
//import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repositories/task.repository.interface';
import { CategoryRepository } from '@/category/repositories/category.repository';
import { Task } from './entities/task.entity';
import { UpdateTaskDetailsDto } from './dto/update-task-details.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { IUsersRepository } from '@/users/repositories/users.repository.interface';

@Injectable()
export class TaskService {

  constructor(
        @Inject('ITaskRepository') // 👈 Inyecta la interfaz
        private readonly taskRepository: ITaskRepository,
        private readonly categoryRepository: CategoryRepository,
        @Inject('IUsersRepository') 
        private readonly userRepository: IUsersRepository,
      ) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
     await this.checkUserPermission(userId)
     await this.validateCategory(userId, createTaskDto.categoryId);
     const taskData = Object.assign({}, createTaskDto, { 
        state: 0, 
        user: { id: userId }, 
        category: createTaskDto.categoryId === -1 ? { id: null } : { id: createTaskDto.categoryId }
      });
      return this.taskRepository.create(taskData)
  }

  async getByCategory(userId: number, category_id: number, state: 0|1) {
    await this.checkUserPermission(userId)
    if(category_id != -1){
        await this.validateCategory(userId, category_id)
    }
    return this.taskRepository.getByCategory(userId, category_id, state)
  }

  async getById(userId: number, id: number) {
    await this.checkUserPermission(userId)
    return this.validateTask(userId, id);
  }

  async updateDetails(userId: number, id: number, updateTaskDto: UpdateTaskDetailsDto) {
    await this.checkUserPermission(userId)
    await this.validateTask(userId, id);
    return this.taskRepository.updateDetails(id, updateTaskDto)
  }

  async updateState(userId: number, id: number) {
    await this.checkUserPermission(userId)
    const result = await this.validateTask(userId, id);
    let taskData = new Task()
   
    result.state == 0? taskData.state = 1: taskData.state = 0;
    return this.taskRepository.updateState(id, taskData)
  }

  async updateCategory(userId: number, id: number, updateTaskCategoryDto: UpdateTaskCategoryDto) {
    await this.checkUserPermission(userId)
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
    await this.checkUserPermission(userId)
    const task = await this.validateTask(userId, id);
    await this.taskRepository.delete(id);
  }

  private async checkUserPermission(userId: number){
    const user = await this.userRepository.getById(userId)
    if(!user){
      throw new ForbiddenException('Your account has been deleted and you do not have permission')
    }
  }

  private async validateTask(userId: number, id: number): Promise<Task> {

  const task = await this.taskRepository.getById(id);
  
  if (!task) {
    throw new ForbiddenException(
      'Task not found')
  }
  if (task.user.id != userId){
    throw new ForbiddenException('You do not own that task')
  }
  return task;
 }

  private async validateCategory(userId: number, categoryId: number): Promise<void> {

  if (categoryId === -1) return;

  const category = await this.categoryRepository.getById(categoryId);
  
  if (!category) {
    throw new ForbiddenException(
      'Category not found')
  }
  if (category.user.id != userId){
    throw new ForbiddenException('You do not own that category')
  }
}
}
