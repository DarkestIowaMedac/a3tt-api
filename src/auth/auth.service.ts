import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; 
import { LoginUserDto } from '@/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user; 
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getByEmail(loginUserDto.email); 
    //De esta forma ya puedo acceder a todos los datos y no me veo limitado por los del DTO                                                                      
    const payload = { 
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Date.now(), // 👈 Añade timestamp único
    jti: uuidv4()    // 👈 ID único para el token 
  };
  return {
    access_token: this.jwtService.sign(payload),
  };
  }
}