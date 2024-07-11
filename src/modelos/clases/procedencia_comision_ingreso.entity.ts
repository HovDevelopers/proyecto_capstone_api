import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('procedencia_comision_ingreso')
export class ProcedenciaComisionIngreso {

  @PrimaryGeneratedColumn()
  id_procedencia_comision_ingreso: number;

  @Column({ type: 'text'})
  nombre: string;

  
}