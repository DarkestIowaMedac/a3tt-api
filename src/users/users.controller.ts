import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/users.entity';

@ApiTags('Users - Gestión de usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios',
      description: 'Retorna una lista completa de todos los usuarios registrados en el sistema'})
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente', type: [Users]})
    @ApiResponse({ status: 500, description: 'Error interno del servidor'})

    getAll() {
        return this.usersService.getAll();
    }
    
    @Get('id/:id')
    @ApiOperation({ summary: 'Obtener usuario por ID', 
      description: 'Retorna un usuario específico basado en su ID numérico'
    })
    @ApiParam({ name: 'id', type: Number, description: 'ID del usuario', example: 1 })
    @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Users })
    @ApiNotFoundResponse({ description: 'Usuario no encontrado' })

    getById(@Param('id') id: number) {
        return this.usersService.getById(id);
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Obtener usuario por email',
        description: 'Retorna un usuario específico basado en su dirección de email' })
    @ApiParam({ name: 'email', type: String, description: 'Email del usuario', 
      example: 'usuario@ejemplo.com' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Users
    })
    @ApiNotFoundResponse({ description: 'Usuario no encontrado' })

    getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }
    
    @Post()
    @ApiOperation({ summary: 'Crear nuevo usuario',
        description: 'Registra un nuevo usuario en el sistema' })
    @ApiBody({ type: CreateUserDto, description: 'Datos requeridos para crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: Users
    })
    @ApiConflictResponse({ description: 'El email ya está registrado' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })

    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch('me') 
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard) 
    @ApiOperation({ summary: 'Actualizar usuario actual', 
      description: 'Actualiza la información del usuario autenticado'
    })
    @ApiBody({ type: UpdateUserDto, description: 'Datos a actualizar del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: Users })
    @ApiUnauthorizedResponse({ description: 'No autorizado - Se requiere autenticación' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })

    update(
      @Req() req, 
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.usersService.update(req.user.sub,updateUserDto); 
    }

    @Delete('me') 
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard) 
    @ApiOperation({ summary: 'Eliminar cuenta de usuario actual',
        description: 'Elimina permanentemente la cuenta del usuario autenticado. Requiere confirmación con contraseña.'})
    @ApiBody({ type: LoginUserDto, description: 'Credenciales para confirmar la eliminación' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente',
        schema: {
            example: {
                success: true,
                message: 'User deleted successfully'
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'No autorizado - Credenciales inválidas' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })

    async delete(
      @Req() req, 
      @Body() loginUserDto: LoginUserDto,
    ) {
      await this.usersService.delete(req.user.email,loginUserDto);
      return { 
        success: true,
        message: `User deleted successfully`,
      };
    }
}
