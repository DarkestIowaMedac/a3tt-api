import { Task } from '../entities/task.entity';

export interface ITaskRepository {

create(categoryData: { name: string; user: { id: number } }): Promise<Task>;
getByCategory(userId: number): Promise<Task[] | null>; 
getById(id: number): Promise<Task | null> ;
updateDetails(id, categoryData: { name: string} ): Promise<Task>;
updateState(id, categoryData: { name: string} ): Promise<Task>;
updateCategory(id, categoryData: { name: string} ): Promise<Task>;
delete(id: number): Promise<void>;
}