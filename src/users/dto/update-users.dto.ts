import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'Nuevo nombre del usuario', example: 'María15', minLength: 3,
        maxLength: 50 })
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre no puede exceder los 50 caracteres' })
    name?: string;

    @ApiPropertyOptional({ description: 'Nueva contraseña (mínimo 8 caracteres, 1 mayúscula, 1 número)',
        example: 'NuevaContraseña456', minLength: 8, maxLength: 255 })
    @IsOptional()
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(255, { message: 'La contraseña no puede exceder los 255 caracteres' })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¡"#$%&'()*+,-./:;<=>¿?@[\\\]^_`{|}~]).*/, {
    message: 'La contraseña debe contener al menos: 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial'})
    password?: string;
}