import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ActividadGrupal } from 'src/modelos/clases/actividad_grupal.entity';
import { PacienteAuditoria } from './paciente_auditoria.entity';

@Entity('pacientes_actividad_grupal')
export class PacientesActividadGrupal {

  @PrimaryGeneratedColumn()
  id_paciente_actividad_grupal: number;

  @ManyToOne(() => ActividadGrupal, actividadGrupal => actividadGrupal.id_actividad_grupal)
  @JoinColumn({ name: 'id_actividad_grupal' })
  id_actividad_grupal: ActividadGrupal;

  @ManyToOne(() => PacienteAuditoria, paciente => paciente.id_paciente_auditoria)
  @JoinColumn({ name: 'id_paciente_auditoria' })
  paciente: PacienteAuditoria;

  @Column({ type: 'boolean' })
  sename: boolean;
} 
