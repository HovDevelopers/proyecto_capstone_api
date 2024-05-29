import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estado_informe')
export class EstadoInforme {
  
  @PrimaryGeneratedColumn()
  id_estado_informe: number;

  @Column({ type: 'text' })
  nombre: string;
}
