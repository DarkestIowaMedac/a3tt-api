import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, } from 'class-validator';

export class UpdateTaskCategoryDto {
    @ApiProperty({ description: 'ID de la categoría (-1 para sin categoría)', example: 1,
    required: true })
    @IsNumber({}, { message: 'La categoría debe ser un ID numérico o -1 para tareas sin categoría' })
    categoryId: number; 
}