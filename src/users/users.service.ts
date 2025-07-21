// src/users/users.service.ts
import { Injectable, ConflictException, Inject, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { IUsersRepository } from './repositories/users.repository.interface';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository') // 👈 Inyecta la interfaz
    private readonly usersRepository: IUsersRepository,
  ) {}

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getById(id: number) {
    return this.usersRepository.getById(id);
  }

  async getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.getByEmail(createUserDto?.email);
    
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const currentUser = await this.usersRepository.getById(id);
    
    if (!currentUser) {
      throw new ConflictException('Invalid Email, Account does not exist');
    }

  const updates: Partial<Users> = {};
  
  if (updateUserDto.name) updates.name = updateUserDto.name;
  
  if (updateUserDto.password) {
    updates.password = await bcrypt.hash(updateUserDto.password, 10);
  }
    
    return this.usersRepository.update(id, updates);
  }

  async delete(reqEmail: string, loginUserDto: LoginUserDto) {
    const currentUser = await this.usersRepository.getByEmail(loginUserDto.email);
    
    if (!currentUser) {
      throw new ConflictException('Invalid Email, Account does not exist');
    }

    if (currentUser.email != reqEmail){
      throw new ForbiddenException('You do not have permission to remove this account');
    }
    
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      currentUser.password
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.usersRepository.delete(currentUser.id);
  }
}