import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne} from 'typeorm';
import { Especialidad } from './especialidad.entity';

@Entity('profesional')
export class Profesional {
  
  @PrimaryGeneratedColumn()
  id_profesional: number;

  @Column({ type: 'text' })
  rut_profesional: string;

  @Column({ type: 'text' })
  nombres: string;

  @Column({ type: 'text' })
  apellido_paterno: string;

  @Column({ type: 'text', nullable: true })
  apellido_materno: string;

  @Column({ type: 'text'})
  correo: string;

  @ManyToOne(() => Especialidad, especialidad => especialidad.id_especialidad)
  @JoinColumn({ name: 'id_especialidad' })
  id_especialidad: Especialidad;
}
