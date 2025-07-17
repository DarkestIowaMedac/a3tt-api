
import { Users } from '@/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CATEGORY' }) 
export class Category {

  @PrimaryColumn({ name: 'ID', type: 'number', precision: 19, scale: 0, generated: 'identity', })
  id: number;

  @Column({ name: 'NAME', type: 'varchar2', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => Users, { onDelete: 'CASCADE', nullable: false}) // ¡No hay (user) => user.categories!
  @JoinColumn({ name: 'USER_ID', foreignKeyConstraintName: 'USER_ID' }) // Columna FK en BD
  user: Users; // Accedes al usuario con `category.user` (opcional)
}