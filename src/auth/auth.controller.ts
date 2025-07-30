import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('login')
  @ApiOperation({ summary: 'User login', description: 'Authenticates user and returns JWT token' 
  })
  @ApiBody({ type: LoginUserDto, description: 'User credentials for authentication' })
  @ApiResponse({ status: 200, description: 'Successfully authenticated', 
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })

  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('getProfile')
  @ApiOperation({ summary: 'Get user profile', description: 'Returns authenticated user profile information' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Missing or invalid JWT token' })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })

  getProfile(@Request() req) {
    return req.user;
  }
}