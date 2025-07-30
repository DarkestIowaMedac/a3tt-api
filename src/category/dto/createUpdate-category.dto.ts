import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUpdateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Personal tasks',
    minLength: 3, maxLength: 255, })
  @IsString({ message: 'Name must be a valid string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters long' })
  name: string;

}