
import { Users } from '@/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'CATEGORY' }) 
export class Category {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' }) // ¡No hay (user) => user.categories!
  @JoinColumn({ name: 'USER_ID' }) // Columna FK en BD
  user: Users; // Accedes al usuario con `category.user` (opcional)
}