import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'USERS' }) // Especifica el nombre real de la tabla
export class Users {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'EMAIL' })
  email: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'PASSWORD' })
  password: string;
}