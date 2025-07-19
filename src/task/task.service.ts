import { Inject } from '@nestjs/common';
import { CreateTaskDto } from './dto/createUpdate-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskRepository } from './repositories/task.repository.interface';

@Injectable()
export class TaskService {

  constructor(
        @Inject('ITaskRepository') // 👈 Inyecta la interfaz
        private readonly taskRepository: ITaskRepository,
      ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create()
  }

  getByCategory() {
    return this.taskRepository.getByCategory()
  }

  getById(id: number) {
    return this.taskRepository.getById()
  }

  updateDetails(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateDetails()
  }

  updateState(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateState()
  }

  updateCategory(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.updateCategory()
  }

  delete(id: number) {
    return this.taskRepository.delete()
  }
}
