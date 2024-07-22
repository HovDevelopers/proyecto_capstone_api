import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoInforme } from './estado_informe.entity';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { Diagnostico } from './diagnostico.entity';
import { PacienteAuditoria } from './paciente_auditoria.entity';

@Entity('urgencia')
export class Urgencia {
  @PrimaryGeneratedColumn()
  id_urgencia: number;

  @ManyToOne(() => PacienteAuditoria, paciente => paciente.id_paciente_auditoria)
  @JoinColumn({ name: 'id_paciente_auditoria' })
  id_paciente_auditoria: PacienteAuditoria;

  @Column({ type: 'bit' })
  en_turno: boolean;

  @Column({ type: 'timestamp' })
  fecha_envio: Date;

  @Column({ type: 'date' })
  fecha_consulta: Date;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.id_dispositivo)
  @JoinColumn({ name: 'id_dispositivo' })
  id_dispositivo: Dispositivo;

  @ManyToOne(() => ProcedenciaConsulta, procedenciaConsulta => procedenciaConsulta.id_procedencia_consulta)
  @JoinColumn({ name: 'id_procedencia_consulta' })
  id_procedencia: ProcedenciaConsulta;

  @ManyToOne(() => Actividad, actividad => actividad.id_actividad)
  @JoinColumn({ name: 'id_actividad' })
  id_actividad: Actividad;

  @Column({ type: 'text'})
  id_tipo_paciente: string; // Pueden ser varios

  @Column({ type: 'text'})
  id_factor: string;  // Pueden ser varios
  
  @ManyToOne(() => EstadoInforme, estadoInforme => estadoInforme.id_estado_informe)
  @JoinColumn({ name: 'id_estado_informe' })
  id_estado_informe: EstadoInforme;

  @ManyToOne(() => Diagnostico, diagnostico => diagnostico.id_diagnostico)
  @JoinColumn({ name: 'diagnostico_principal' })
  diagnostico_principal: Diagnostico;

  @Column({ type: 'text' })
  diagnosticos_secundarios: string;

  @Column({ type: 'text', nullable: true })
  otro_diagnostico: string;
}
