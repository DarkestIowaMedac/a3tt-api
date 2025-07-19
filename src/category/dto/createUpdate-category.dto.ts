import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUpdateCategoryDto {
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Tareas personales',
    minLength: 3, maxLength: 255, })
  @IsString({ message: 'El nombre debe ser una cadena de texto válida' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 255, { message: 'El nombre debe tener entre 3 y 255 caracteres' })
  name: string;

}