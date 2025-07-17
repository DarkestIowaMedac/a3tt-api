import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user_id: number; // Asignado desde el JWT (sin decorador para evitar duplicidad)
}