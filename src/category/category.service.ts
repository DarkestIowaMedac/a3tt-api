import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryRepository } from './repositories/category.repository.interface';
import { Users } from '@/users/entities/users.entity';


@Injectable()
export class CategoryService {
  constructor(
      @Inject('ICategoryRepository') // 👈 Inyecta la interfaz
      private readonly categoryRepository: ICategoryRepository,
    ) {}
  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto.name, userId)
    return this.categoryRepository.create({
      name: createCategoryDto.name,
      user: { id: userId }
    });
  }
     
  getAll() {
    return `This action returns all category`;
  }

  getById(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
