import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('procedencia_consulta')
export class ProcedenciaConsulta {

  @PrimaryGeneratedColumn()
  id_procedencia_consulta: number;

  @Column({ type: 'text'})
  nombre: string;

  
}