import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    getAll() {
        return this.usersService.getAll();
    }
    
    @Get('id/:id')
    getById(@Param('id') id: number) {
        return this.usersService.getById(id);
    }

    @Get('email/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }
    
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch('me') 
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard) 
    update(
      @Req() req, 
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.usersService.update(req.user.sub,updateUserDto); 
    }

    @Delete('me') 
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard) 
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
