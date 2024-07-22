import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoInforme } from './estado_informe.entity';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaComisionIngreso } from 'src/modelos/clases/procedencia_comision_ingreso.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { ProcedenciaConsultaNuevo } from './procedencia_consulta_nuevo.entity';
import { Diagnostico } from './diagnostico.entity';
import { PacienteAuditoria } from './paciente_auditoria.entity';

@Entity('comision_ingreso')
export class ComisionIngreso {
  @PrimaryGeneratedColumn()
  id_comision_ingreso: number;

  @ManyToOne(() => PacienteAuditoria, paciente => paciente.id_paciente_auditoria)
  @JoinColumn({ name: 'id_paciente_auditoria' })
  id_paciente_auditoria: PacienteAuditoria;

  @Column({ type: 'timestamp' })
  fecha_envio: Date;

  @Column({ type: 'date' })
  fecha_consulta: Date;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.id_dispositivo)
  @JoinColumn({ name: 'id_dispositivo' })
  id_dispositivo: Dispositivo;

  @ManyToOne(() => ProcedenciaComisionIngreso, procedenciaComisionIngreso => procedenciaComisionIngreso.id_procedencia_comision_ingreso)
  @JoinColumn({ name: 'id_procedencia_comision_ingreso' })
  id_procedencia_comision_ingreso: ProcedenciaComisionIngreso;

  @ManyToOne(() => Actividad, actividad => actividad.id_actividad)
  @JoinColumn({ name: 'id_actividad' })
  id_actividad: Actividad;

  @Column({ type: 'text'})
  id_tipo_paciente: string;

  @Column({ type: 'text'})
  id_factor: string;

  @ManyToOne(() => EstadoInforme, estadoInforme => estadoInforme.id_estado_informe)
  @JoinColumn({ name: 'id_estado_informe' })
  id_estado_informe: EstadoInforme;

  @ManyToOne(() => ProcedenciaConsultaNuevo, procedenciaConsultaNuevo => procedenciaConsultaNuevo.id_procedencia_nuevo)
  @JoinColumn({ name: 'id_procedencia_nuevo' })
  id_procedencia_nuevo: ProcedenciaConsultaNuevo;

  @ManyToOne(() => Diagnostico, diagnostico => diagnostico.id_diagnostico)
  @JoinColumn({ name: 'diagnostico_principal' })
  diagnostico_principal: Diagnostico;

  @Column({ type: 'text' })
  diagnosticos_secundarios: string;

  @Column({ type: 'text', nullable: true })
  otro_diagnostico: string;
}
