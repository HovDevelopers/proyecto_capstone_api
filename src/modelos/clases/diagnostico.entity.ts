import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('diagnostico')
export class Diagnostico {

  @PrimaryGeneratedColumn()
  id_diagnostico: number;

  @Column({ type: 'text'})
  nombre: string;

  @Column({ nullable: true })
  codigo: number;

  @Column({ type: 'boolean'})
  bool_GES: boolean;
}