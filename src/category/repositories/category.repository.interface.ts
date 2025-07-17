import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
create(categoryData: { name: string; user: { id: number } }): Promise<Category>;
}