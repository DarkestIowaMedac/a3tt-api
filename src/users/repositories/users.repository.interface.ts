
import { Users } from '../entities/users.entity';

export interface IUsersRepository {
  getAll(): Promise<Users[]>;
  getById(id: number): Promise<Users | null>;
  create(user: Partial<Users>): Promise<Users>;
  getByEmail(email: string): Promise<Users | null>;
  update(id: number, updates: Partial<Users>);
  delete(id: number): Promise<void>;
//   update(id: string, task: Partial<Task>): Promise<Task>;

}