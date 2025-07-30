import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan54rex',
      minLength: 3, maxLength: 30})
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre no puede exceder los 30 caracteres' })
    name: string;

    @ApiProperty({ description: 'Email del usuario', example: 'usuario@ejemplo.com', maxLength: 255 })
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    @MaxLength(255, { message: 'El email no puede exceder los 255 caracteres' })
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario (mínimo 8 caracteres, 1 mayúscula, 1 número)',
        example: 'MiContraseña123', minLength: 8, maxLength: 255
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(255, { message: 'La contraseña no puede exceder los 255 caracteres' })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¡"#$%&'()*+,-./:;<=>¿?@[\\\]^_`{|}~]).*/, {
    message: 'La contraseña debe contener al menos: 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial'})
    password: string;
}