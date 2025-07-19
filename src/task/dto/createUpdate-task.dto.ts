import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUpdateTaskDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder los 255 caracteres' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(4000, { message: 'La descripción no puede exceder los 4000 caracteres' })
  @IsOptional()
  description?: string;
}
