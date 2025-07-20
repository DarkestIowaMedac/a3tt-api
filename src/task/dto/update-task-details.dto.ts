import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, MinLength, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateTaskDetailsDto {
  @ApiProperty({ description: 'Nombre de la tarea', example: 'Revisar documentación', required: false })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder los 255 caracteres' })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Descripción detallada de la tarea', example: 'Faltan etiquetas swagger', 
    required: false })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(4000, { message: 'La descripción no puede exceder los 4000 caracteres' })
  @IsOptional()
  description?: string;
}