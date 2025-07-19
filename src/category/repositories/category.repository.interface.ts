import { Category } from '../entities/category.entity';

export interface ICategoryRepository {

create(categoryData: { name: string; user: { id: number } }): Promise<Category>;
getByUser(userId: number): Promise<Category[] | null>; 
getById(id: number): Promise<Category | null> ;
update(id, categoryData: { name: string} ): Promise<Category>;
delete(id: number): Promise<void>;
}