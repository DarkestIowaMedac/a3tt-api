import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ description: 'Nombre del usuario' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'Nombre del usuario' })
    @IsString()
    @MinLength(8)
    password: string;
}