import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateCategoryDto } from './dto/createUpdate-category.dto';
import { ICategoryRepository } from './repositories/category.repository.interface';
import { Users } from '@/users/entities/users.entity';
import { Category } from './entities/category.entity';


@Injectable()
export class CategoryService {
  constructor(
      @Inject('ICategoryRepository') // 👈 Inyecta la interfaz
      private readonly categoryRepository: ICategoryRepository,
    ) {}
     
  getByUser(userId: number) {
    return this.categoryRepository.getByUser(userId)
  }

  getById(userId: number, id: number) {
    return this.checkPermission(userId, id)
  }

  async create(userId: number, createUpdateCategoryDto: CreateUpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.create({
      name: createUpdateCategoryDto.name,
      user: { id: userId }
    });
  }

  async update(userId: number, id: number, CreateUpdateCategoryDto: CreateUpdateCategoryDto) {
    await this.checkPermission(userId, id)
    return this.categoryRepository.update(id, {
      name: CreateUpdateCategoryDto.name
    });
  }

  async delete(userId: number, id: number) {
    await this.checkPermission(userId, id)
    return this.categoryRepository.delete(id)
  }

  private async checkPermission(userId: number, categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.getById(categoryId);
    
    if (!category) {
    throw new NotFoundException('Category not found');
    }
    
    if (!category.user) {
    throw new ForbiddenException('Not a valid category for that user');
    }

    if (category.user.id !== userId) {
      throw new ForbiddenException('You do not have permissions');
    }

    return category; 
  }
}
