import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('procedimiento')
export class Procedimiento {

  @PrimaryGeneratedColumn()
  id_procedimiento: number;

  @Column({ type: 'text'})
  nombre: string;

  @Column({ nullable: true })
  codigo: number;
}
