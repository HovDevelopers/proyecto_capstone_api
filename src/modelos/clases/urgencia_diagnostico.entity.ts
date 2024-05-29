import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';


@Entity('urgencia_diagnostico')
export class UrgenciaDiagnostico {

  @PrimaryGeneratedColumn()
  id_urgencia_diagnostico: number;

  @ManyToOne(() => Urgencia, urgencia => urgencia.id_urgencia)
  @JoinColumn({ name: 'id_urgencia' })
  id_urgencia: Urgencia;

  @ManyToOne(() => Diagnostico, diagnostico => diagnostico.id_diagnostico)
  @JoinColumn({ name: 'id_diagnostico' })
  diagnostico: Diagnostico;
} 