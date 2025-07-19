import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ description: 'Email del usuario', example: 'usuario@ejemplo.com', maxLength: 255 })
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    @MaxLength(255, { message: 'El email no puede exceder los 255 caracteres' })
    email: string;
  
    @ApiProperty({ description: 'Contraseña del usuario', example: 'MiContraseñaSegura123',
        minLength: 8, maxLength: 255 })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(255, { message: 'La contraseña no puede exceder los 255 caracteres' })
    password: string;
}