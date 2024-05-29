import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';

@Entity('comision_ingreso_profesional')
export class ComisionIngresoProfesional {

  @PrimaryGeneratedColumn()
  id_comision_profesional: number;

  @ManyToOne(() => ComisionIngreso, comisionIngreso => comisionIngreso.id_comision_ingreso)
  @JoinColumn({ name: 'id_comision_ingreso' })
  id_comision_ingreso: ComisionIngreso;

  @ManyToOne(() => Profesional, profesional => profesional.id_profesional)
  @JoinColumn({ name: 'id_profesional' })
  profesional: Profesional;
} 
