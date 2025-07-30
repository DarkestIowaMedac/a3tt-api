import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskCategoryDto } from '../dto/update-task-category.dto';
import { UpdateTaskDetailsDto } from '../dto/update-task-details.dto';
import { Task } from '../entities/task.entity';

export interface ITaskRepository {

create(taskData: { name?: string; description?: string, categoryId: number, user: { id: number }  }): Promise<Task>
getByCategory(userId: number, category_id: number, state: 0|1): Promise<Task[]> 
getById(id: number): Promise<Task | null> 
updateDetails(id: number, taskData: UpdateTaskDetailsDto): Promise<Task>;
updateState(id: number, taskData: Task): Promise<Task>;
updateCategory(id: number, taskData: {category: {id: number}}): Promise<Task>; 
delete(id: number): Promise<void>;
}