import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateUpdateCategoryDto } from './dto/createUpdate-category.dto';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('user/')
  @ApiOperation({ summary: 'Get user categories', description: 'Returns all categories belonging to the authenticated user' })
  @ApiResponse({ status: 200, description: 'Category list retrieved successfully', type: [Category]})
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Authentication required'})

  getbyUser(@Req() req) {
    return this.categoryService.getByUser(req.user.sub);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID', description: 'Returns a specific category belonging to the authenticated user'})
  @ApiParam({ name: 'id', type: Number, description: 'Category ID', example: 1})
  @ApiResponse({ status: 200, description: 'Category found', type: Category})
  @ApiNotFoundResponse({ description: 'Categoría not found'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Authentication required'})

  getById(
        @Req() req, 
        @Param('id') id: number
      ) {
        return this.categoryService.getById(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Post()
  @ApiOperation({ summary: 'Create new category', description: 'Creates a new category associated with the authenticated user'})
  @ApiBody({ type: CreateUpdateCategoryDto, description: 'Required data to create the category', required: true })
  @ApiResponse({ status: 201, description: 'Category created successfully', type: Category})
  @ApiUnauthorizedResponse({ description: 'Invalid input data'})
  @ApiResponse({ status: 400, description: 'Conflict - Category with this name already exists'})

  create(
        @Req() req, 
        @Body() createUpdateCategoryDto: CreateUpdateCategoryDto,
      ) {
        return this.categoryService.create(req.user.sub, createUpdateCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update category', description: 'Updates a specific category belonging to the authenticated user'})
  @ApiParam({ name: 'id', type: Number, description: 'ID of the category to update', example: 1})
  @ApiBody({ type: CreateUpdateCategoryDto, description: 'Category data to update'})
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: Category})
  @ApiNotFoundResponse({ description: 'Category not found'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Authentication required'})
  @ApiResponse({ status: 400, description: 'Invalid input data'})

  async update(  
        @Req() req, 
        @Param('id') id: number, 
        @Body() createUpdateCategoryDto: CreateUpdateCategoryDto) {
    return await this.categoryService.update(req.user.sub, id, createUpdateCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete category', description: 'Deletes a specific category belonging to the authenticated user'})
  @ApiParam({ name: 'id', type: Number, description: 'ID of the category to delete', example: 1})
  @ApiResponse({ status: 200, description: 'Category deleted successfully', schema: {
    example: {
      success: true,
      message: 'Category deleted successfully',
      deletedId: 1
    }
  }})
  @ApiNotFoundResponse({ description: 'Category not found'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Authentication required'})
  
  async delete(
        @Req() req, 
        @Param('id') id: number, ) {
    await this.categoryService.delete(req.user.sub, id);
    return { 
      success: true,
      message: `Category deleted successfully`,
      deletedId: id
    };
  }
}
