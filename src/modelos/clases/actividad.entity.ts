import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('actividad')
export class Actividad {

  @PrimaryGeneratedColumn()
  id_actividad: number;

  @Column({ type: 'text'})
  nombre: string;

  
}