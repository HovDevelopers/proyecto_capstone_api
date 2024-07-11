import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('factores')
export class Factores {

  @PrimaryGeneratedColumn()
  id_factor: number;

  @Column({ type: 'text' })
  nombre: string;

  
}
