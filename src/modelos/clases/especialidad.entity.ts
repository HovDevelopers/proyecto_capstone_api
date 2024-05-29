import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('especialidad')
export class Especialidad {
  
  @PrimaryGeneratedColumn()
  id_especialidad: number;

  @Column({ type: 'text' })
  nombre: string;
}
