import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateUpdateCategoryDto } from './dto/createUpdate-category.dto';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('user/')
  @ApiOperation({ summary: 'Obtener categorías del usuario', description: 'Retorna todas las categorías del usuario autenticado'})
  @ApiResponse({ status: 200, description: 'Lista de categorías obtenida exitosamente', type: [Category]})
  @ApiUnauthorizedResponse({ description: 'No autorizado - Se requiere autenticación'})

  getbyUser(@Req() req) {
    return this.categoryService.getByUser(req.user.sub);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría por ID', description: 'Retorna una categoría específica del usuario autenticado'})
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría', example: 1})
  @ApiResponse({ status: 200, description: 'Categoría encontrada', type: Category})
  @ApiNotFoundResponse({ description: 'Categoría no encontrada'})
  @ApiUnauthorizedResponse({ description: 'No autorizado - Se requiere autenticación'})

  getById(
        @Req() req, 
        @Param('id') id: number
      ) {
        return this.categoryService.getById(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Post()
  @ApiOperation({ summary: 'Crear nueva categoría', description: 'Crea una nueva categoría asociada al usuario autenticado'})
  @ApiBody({ type: CreateUpdateCategoryDto, description: 'Datos requeridos para crear la categoría'})
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente', type: Category})
  @ApiUnauthorizedResponse({ description: 'No autorizado - Se requiere autenticación'})
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos'})

  create(
        @Req() req, 
        @Body() createUpdateCategoryDto: CreateUpdateCategoryDto,
      ) {
        return this.categoryService.create(req.user.sub, createUpdateCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría', description: 'Actualiza una categoría específica del usuario autenticado'})
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría a actualizar', example: 1})
  @ApiBody({ type: CreateUpdateCategoryDto, description: 'Datos a actualizar de la categoría'})
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente', type: Category})
  @ApiNotFoundResponse({ description: 'Categoría no encontrada'})
  @ApiUnauthorizedResponse({ description: 'No autorizado - Se requiere autenticación'})
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos'})

  async update(  
        @Req() req, 
        @Param('id') id: number, 
        @Body() createUpdateCategoryDto: CreateUpdateCategoryDto) {
    return await this.categoryService.update(req.user.sub, id, createUpdateCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar categoría', description: 'Elimina una categoría específica del usuario autenticado'})
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría a eliminar', example: 1})
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente', schema: {
    example: {
      success: true,
      message: 'Category {id} deleted successfully',
      deletedId: 1
    }
  }})
  @ApiNotFoundResponse({ description: 'Categoría no encontrada'})
  @ApiUnauthorizedResponse({ description: 'No autorizado - Se requiere autenticación'})
  
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
