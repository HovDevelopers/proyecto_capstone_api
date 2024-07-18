import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';
import { EstadoInforme } from './estado_informe.entity';
import { Diagnostico } from './diagnostico.entity';
import { PacienteAuditoria } from './paciente_auditoria.entity';

@Entity('consultoria')
export class Consultoria {
  @PrimaryGeneratedColumn()
  id_consultoria: number;

  @ManyToOne(() => PacienteAuditoria, paciente => paciente.id_paciente_auditoria)
  @JoinColumn({ name: 'id_paciente_auditoria' })
  id_paciente_auditoria: PacienteAuditoria;

  @Column({ type: 'text' })
  nombre_consultorio: string;

  @Column({ type: 'timestamp' })
  fecha_envio: Date;

  @Column({ type: 'date' })
  fecha_consulta: Date;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.id_dispositivo)
  @JoinColumn({ name: 'id_dispositivo' })
  id_dispositivo: Dispositivo;

  @Column({ type: 'text' })
  consulta: string;

  @Column({ type: 'text' })
  tipo_consultoria: string;

  @Column({ type: 'text' })
  revision_consulta: string;

  @Column({ type: 'bit' })
  sename: boolean;

  @Column({ type: 'bit' })
  interconsulta: boolean;

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
