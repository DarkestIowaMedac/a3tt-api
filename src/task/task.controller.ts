import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({  summary: 'Create a new task', description: 'Creates a task associated with the authenticated user' })
  @ApiBody({ type: CreateTaskDto, description: 'Task data to create', required: true })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente', type: Task, })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  @ApiResponse({ status: 401, description: 'No autorizado (token inválido o expirado)' })
  @ApiResponse({ status: 403, description: 'No tienes permisos para esta categoría' })
  @ApiResponse({ status: 404, description: 'Not found - Category not found' })

  create(
        @Req() req, 
        @Body() createTaskDto: CreateTaskDto,
      ) {
        return this.taskService.create(req.user.sub, createTaskDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Get('category/:category_id/:state')
  @ApiOperation({ summary: 'Get tasks by category and state', 
    description: 'Returns tasks filtered by category and state' })
  @ApiParam({ name: 'category_id', type: Number, description: 'ID of the category', example: 1, required: true })
  @ApiParam({ name: 'state', type: Number, description: 'Task state (0: Pending, 1: Completed)', example: 0, 
    required: true })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully', type: [Task] })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token'
  })
  @ApiResponse({ status: 403, description: 'Forbidden - No permission for this category' })

  getByCategory(
        @Req() req, 
        @Param('category_id') category_id: number,
        @Param('state') state: 0|1
  ) {
    return this.taskService.getByCategory(req.user.sub, category_id, state);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID', description: 'Returns a specific task by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task', example: 1, required: true })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully', type: Task })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token' })
  @ApiResponse({ status: 403, description: 'Forbidden - No permission for this task' })
  @ApiResponse({ status: 404, description: 'Not found - Task not found' })

  getById(
        @Req() req,
        @Param('id') id: number
  ) {
    return this.taskService.getById(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Patch('details/:id')
  @ApiOperation({ summary: 'Update task details', description: 'Updates the details of a specific task' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to update', example: 1, required: true })
  @ApiBody({ type: UpdateTaskDetailsDto, description: 'Task details to update', required: true })
  @ApiResponse({ status: 200, description: 'Task details updated successfully', type: Task })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token' })
  @ApiResponse({ status: 403, description: 'Forbidden - No permission for this task' })
  @ApiResponse({ status: 404, description: 'Not found - Task not found' })

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
  @ApiOperation({ summary: 'Toggle task state', description: 'Toggles the completion state of a task' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to update', example: 1, required: true })
  @ApiResponse({ status: 200, description: 'Task state updated successfully', type: Task })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token' })
  @ApiResponse({ status: 403, description: 'Forbidden - No permission for this task' })
  @ApiResponse({ status: 404, description: 'Not found - Task not found' })

  updateState(
    @Req() req,
    @Param('id') id: number
  ) {
    return this.taskService.updateState(req.user.sub, id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Patch('category/:id')
  @ApiOperation({ summary: 'Update task category', description: 'Changes the category of a specific task' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to update', example: 1, required: true })
  @ApiBody({ type: UpdateTaskCategoryDto, description: 'New category data', required: true })
  @ApiResponse({ status: 200, description: 'Task category updated successfully', type: Task })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token'})
  @ApiResponse({ status: 403, description: 'Forbidden - No permission for this task or category' })
  @ApiResponse({ status: 404, description: 'Not found - Task or category not found' })

  updateCategory(
    @Req() req,
    @Param('id') id: number, 
    @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskService.updateCategory(req.user.sub, id, updateTaskCategoryDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  @ApiOperation({ summary: 'Delete task', description: 'Deletes a specific task' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to delete', example: 1, required: true })
  @ApiResponse({ status: 200, description: 'Task deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Task deleted successfully',
        deletedId: 1
      }
    }})
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or expired token' })
  @ApiResponse({ status: 403, description: 'Forbidden - No permission for this task' })
  @ApiResponse({ status: 404, description: 'Not found - Task not found' })
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
