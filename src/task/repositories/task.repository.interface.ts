import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';

export interface ITaskRepository {

create(taskData: { name?: string; description?: string, categoryId: number, user: { id: number }  }): Promise<Task>
getByCategory(userId: number, category_id: number, state: 0|1): Promise<Task[]> 
getById(id: number): Promise<Task | null> ;
// updateDetails(id, categoryData: { name: string} ): Promise<Task>;
// updateState(id, categoryData: { name: string} ): Promise<Task>;
// updateCategory(id, categoryData: { name: string} ): Promise<Task>;
// delete(id: number): Promise<void>;
}