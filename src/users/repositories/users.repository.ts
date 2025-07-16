import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>
  ) {}

  async getAll(): Promise<Users[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<Users | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(userData: Partial<Users>): Promise<Users> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async update(id: number, userData: Partial<Users>) {
    await this.repository.update(id, userData);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async getByEmail(email: string): Promise<Users | null> {
    return this.repository.findOne({ where: { email } });
  }
}