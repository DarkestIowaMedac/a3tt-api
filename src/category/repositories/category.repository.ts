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

async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.repository.create(categoryData);
    return this.repository.save(category);
  }
}