import { Category } from '../entities/category.entity';

export interface ICategoryRepository {

getByUser(userId: number): Promise<Category[] | null>; 
getById(id: number): Promise<Category | null> ;
create(categoryData: { name: string; user: { id: number } }): Promise<Category>;
update(id, categoryData: { name: string} ): Promise<Category>;
delete(id: number): Promise<void>;
}