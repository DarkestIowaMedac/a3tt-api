
import { Users } from '@/users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CATEGORY' }) 
export class Category {

  @ApiProperty({ description: 'Unique identifier of the category', example: 1, type: Number })
  @PrimaryColumn({ name: 'ID', type: 'number', precision: 19, scale: 0, generated: 'identity', })
  id: number;

  @ApiProperty({ description: 'Name of the category', example: 'Personal Tasks', minLength: 3, maxLength: 255,
    required: true })
  @Column({ name: 'NAME', type: 'varchar2', length: 255, nullable: false })
  name: string;

  @ApiProperty({ description: 'User who owns this category', type: () => Users, required: true })
  @ManyToOne(() => Users, { onDelete: 'CASCADE', nullable: false}) // ¡No hay (user) => user.categories!
  @JoinColumn({ name: 'USER_ID', foreignKeyConstraintName: 'USER_ID' }) // Columna FK 
  user: Users; // Se Accede al usuario con `category.user` 
}