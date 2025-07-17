import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
        @Req() req, 
        @Body() createCategoryDto: CreateCategoryDto,
      ) {
        createCategoryDto.user_id = req.user.id;
        return this.categoryService.create(createCategoryDto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.categoryService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
