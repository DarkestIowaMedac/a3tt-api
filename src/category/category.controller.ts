import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateUpdateCategoryDto } from './dto/createUpdate-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Post()
  create(
        @Req() req, 
        @Body() createCategoryDto: CreateUpdateCategoryDto,
      ) {
        return this.categoryService.create(req.user.sub, createCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('user/')
  getbyUser(@Req() req) {
    return this.categoryService.getByUser(req.user.sub);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(
        @Req() req, 
        @Param('id') id: number
      ) {
        return this.categoryService.getById(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(  
        @Req() req, 
        @Param('id') id: number, 
        @Body() CreateUpdateCategoryDto: CreateUpdateCategoryDto) {
    return await this.categoryService.update(req.user.sub, id, CreateUpdateCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
        @Req() req, 
        @Param('id') id: number, ) {
    await this.categoryService.delete(req.user.sub, id);
    return { 
      success: true,
      message: `Category ${id} deleted successfully`,
      deletedId: id
    };
  }
}
