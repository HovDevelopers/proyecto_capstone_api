import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';

@Entity('urgencia_profesional')
export class UrgenciaProfesional {

  @PrimaryGeneratedColumn()
  id_urgencia_profesional: number;

  @ManyToOne(() => Urgencia, urgencia => urgencia.id_urgencia)
  @JoinColumn({ name: 'id_urgencia' })
  id_urgencia: Urgencia;

  @ManyToOne(() => Profesional, profesional => profesional.id_profesional)
  @JoinColumn({ name: 'id_profesional' })
  profesional: Profesional;
} 
