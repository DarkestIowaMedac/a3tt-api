import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  @MinLength(8)
  password: string;
}