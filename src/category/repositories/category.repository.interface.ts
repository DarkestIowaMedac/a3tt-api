import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
create(user: Partial<Category>): Promise<Category>;
}