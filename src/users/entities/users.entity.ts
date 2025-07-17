import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'USERS' }) // Especifica el nombre real de la tabla
export class Users {
  @PrimaryColumn({ name: 'ID', type: 'number', precision: 19, scale: 0, generated: 'identity', })
  id: number;

  @Column({ name: 'EMAIL', nullable: false })
  email: string;

  @Column({ name: 'NAME', type: 'varchar2', length: 30, nullable: false, comment: 'UserTag' })
  name: string;

  @Column({ name: 'PASSWORD', type: 'varchar2', length: 255, nullable: false, comment: 'Hashed Password' })
  password: string;
}