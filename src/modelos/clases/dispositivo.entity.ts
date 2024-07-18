import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dispositivo')
export class Dispositivo {

  @PrimaryGeneratedColumn()
  id_dispositivo: number;

  @Column({ type: 'text'})
  nombre: string;

  @Column({ type: 'boolean'})
  estado: boolean;  
}