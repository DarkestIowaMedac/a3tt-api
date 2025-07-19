import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { ICategoryRepository } from './category.repository.interface';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    
constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

async create(categoryData: { name: string; user: { id: number }  }): Promise<Category> {
    const category = this.repository.create(categoryData);
    return this.repository.save(category);
  }

async getByUser(user_id: number): Promise<Category[] | null> {
    return this.repository.find({ where: { user: { id: user_id } } });
  }

async getById(id: number): Promise<Category | null> {
    return this.repository.findOne({ 
      where: { id }, 
      relations: ['user'],
    });
  }

async update(id: number, categoryData: { name: string} ): Promise<Category> {
    await this.repository.update(id, categoryData);
    return this.repository.findOne({ 
      where: { id }, 
      relations: ['user'],
    });
}

async delete(id: number): Promise<void> {
  await this.repository.delete({ id });
}

}