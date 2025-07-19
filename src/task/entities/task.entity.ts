import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Users } from '@/users/entities/users.entity';
import { Category } from '@/category/entities/category.entity';

@Entity({ name: 'TASK', schema: 'A3TT' })
export class Task {
    
  @PrimaryColumn({ name: 'ID', type: 'number', generated: 'identity', precision: 19,
    scale: 0, comment: 'Clave primaria'
  })
  id: number;

  @Column({ name: 'NAME', type: 'varchar2', length: 255, default: 'Inserta Nombre', 
    nullable: true })
  name: string;

  @Column({ name: 'DESCRIPTION', type: 'varchar2', length: 4000, default: 'Inserta Descripcion',
    nullable: true })
  description: string;

  @Column({ name: 'STATE', type: 'number', precision: 1, scale: 0, default: 0, nullable: false,
    comment: '0 -> pendiente, 1 -> completada' })
  state: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'USER_ID', referencedColumnName: 'id', foreignKeyConstraintName: 'USERS_FK' })
  user: Users;

  @ManyToOne(() => Category, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'CATEGORY_ID', referencedColumnName: 'id', 
    foreignKeyConstraintName: 'CATEGORY_FK'})
  category: Category;
}