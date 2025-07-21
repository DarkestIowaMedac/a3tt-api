import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Users } from '@/users/entities/users.entity';
import { Category } from '@/category/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'TASK', schema: 'A3TT' })
export class Task {
  @ApiProperty({ description: 'Primary key identifier', example: 1, type: Number })
  @PrimaryColumn({ name: 'ID', type: 'number', generated: 'identity', precision: 19,
    scale: 0, comment: 'Clave primaria'
  })
  id: number;

  @ApiProperty({ description: 'Name of the task', example: 'Complete project documentation', maxLength: 255,
    default: 'Insert Name',required: false })
  @Column({ name: 'NAME', type: 'varchar2', length: 255, default: 'Inserta Nombre', 
    nullable: true })
  name: string;

  @ApiProperty({ description: 'Detailed description of the task', example: 'Document all API endpoints with Swagger',
    maxLength: 4000, default: 'Insert Description', required: false })
  @Column({ name: 'DESCRIPTION', type: 'varchar2', length: 4000, default: 'Inserta Descripcion',
    nullable: true })
  description: string; 

  @ApiProperty({ description: 'Current state of the task (0 -> Pending, 1 -> Completed)', example: 0, enum: [0, 1], 
    default: 0, type: Number, required: true, })
  @Column({ name: 'STATE', type: 'number', precision: 1, scale: 0, default: 0, nullable: false,
    comment: '0 -> pendiente, 1 -> completada' })
  state: number;

  @ApiProperty({ description: 'User who owns this task', type: () => Users, required: true })
  @ManyToOne(() => Users, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'USER_ID', referencedColumnName: 'id', foreignKeyConstraintName: 'USERS_FK' })
  user: Users;

 @ApiProperty({ description: 'Associated category (Special value (-1) indicates no category relation)', 
  type: () => Category, required: false, nullable: true, example: null })
  @ManyToOne(() => Category, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'CATEGORY_ID', referencedColumnName: 'id', 
    foreignKeyConstraintName: 'CATEGORY_FK'})
  category: Category | null; 

}