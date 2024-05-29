import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';

@Entity('comision_ingreso_diagnostico')
export class ComisionIngresoDiagnostico {

  @PrimaryGeneratedColumn()
  id_comision_diagnostico: number;

  @ManyToOne(() => ComisionIngreso, comisionIngreso => comisionIngreso.id_comision_ingreso)
  @JoinColumn({ name: 'id_comision_ingreso' })
  id_comision_ingreso: ComisionIngreso;

  @ManyToOne(() => Diagnostico, diagnostico => diagnostico.id_diagnostico)
  @JoinColumn({ name: 'id_diagnostico' })
  diagnostico: Diagnostico;
} 