import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createUpdate-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard) 
    @Post()
    create(
          @Req() req, 
          @Body() createTaskDto: CreateTaskDto,
        ) {
          return this.taskService.create(req.user.sub, createTaskDto);
    }

  @Get('category/:category_id')
  getByCategory() {
    return this.taskService.getByCategory();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.taskService.getById(id);
  }

  @Patch('details/:id')
  updateDetails(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateDetails(id, updateTaskDto);
  }

  @Patch('state/:id')
  updateState(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateState(+id, updateTaskDto);
  }

  @Patch('category/:id')
  updateCategory(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateCategory(+id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
