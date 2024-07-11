import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('procedencia_consulta_nuevo')
export class ProcedenciaConsultaNuevo {

  @PrimaryGeneratedColumn()
  id_procedencia_nuevo: number;

  @Column({ type: 'text'})
  nombre: string;

  
}