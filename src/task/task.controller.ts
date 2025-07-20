import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Task } from './entities/task.entity';
import { UpdateTaskDetailsDto } from './dto/update-task-details.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Post()
  @ApiOperation({  summary: 'Crear una nueva tarea', description: 'Crea una tarea asociada al usuario autenticado', })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente', type: Task, })
  @ApiResponse({ status: 401, description: 'No autorizado (token inválido o expirado)' })
  @ApiResponse({ status: 403, description: 'No tienes permisos para esta categoría' })
  create(
        @Req() req, 
        @Body() createTaskDto: CreateTaskDto,
      ) {
        return this.taskService.create(req.user.sub, createTaskDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @ApiParam({ name: 'category_id', type: Number, description: 'ID de la categoría', example: 1})
  @ApiParam({ name: 'state', type: Number, description: 'Estado de la tarea (0: Pendiente, 1: Completada)', example: 0 })
  @Get('category/:category_id/:state')
  getByCategory(
        @Req() req, 
        @Param('category_id') category_id: number,
        @Param('state') state: 0|1
  ) {
    return this.taskService.getByCategory(req.user.sub, category_id, state);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea', example: 1})
  @Get(':id')
  getById(
        @Req() req,
        @Param('id') id: number
  ) {
    return this.taskService.getById(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Patch('details/:id')
  updateDetails(
        @Req() req,
        @Param('id') id: number, 
        @Body() updateTaskDetailsDto: UpdateTaskDetailsDto
  ) {
    return this.taskService.updateDetails(req.user.sub, id, updateTaskDetailsDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Patch('state/:id')
  updateState(
    @Req() req,
    @Param('id') id: number
  ) {
    return this.taskService.updateState(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Patch('category/:id')
  updateCategory(
    @Req() req,
    @Param('id') id: number, 
    @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskService.updateCategory(req.user.sub, id, updateTaskCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  async delete(
    @Req() req,
    @Param('id') id: number) {
    await this.taskService.delete(req.user.sub, id);
    return { 
      success: true,
      message: `Task deleted successfully`,
      deletedId: id
    };
  }
}
