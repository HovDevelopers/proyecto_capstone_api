import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoInforme } from './estado_informe.entity';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';
import { Procedimiento } from 'src/modelos/clases/procedimiento.entity';
import { Test } from 'src/modelos/clases/test.entity';
import { Diagnostico } from './diagnostico.entity';
import { PacienteAuditoria } from './paciente_auditoria.entity';

@Entity('informe_diario')
export class InformeDiario {
  @PrimaryGeneratedColumn()
  id_informe_diario: number;

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

  @ManyToOne(() => ProcedenciaConsulta, procedenciaConsulta => procedenciaConsulta.id_procedencia_consulta)
  @JoinColumn({ name: 'id_procedencia_consulta' })
  id_procedencia: ProcedenciaConsulta;

  @ManyToOne(() => Actividad, actividad => actividad.id_actividad)
  @JoinColumn({ name: 'id_actividad' })
  id_actividad: Actividad;

  @Column({ type: 'text'})
  id_tipo_paciente: string;

  @ManyToOne(() => VisitaSaludMental, visitaSaludMental => visitaSaludMental.id_visita_salud_mental)
  @JoinColumn({ name: 'id_visita_salud_mental' })
  id_visita_salud_mental: VisitaSaludMental;

  @ManyToOne(() => Procedimiento, procedimiento => procedimiento.id_procedimiento)
  @JoinColumn({ name: 'id_procedimiento' })
  id_procedimiento: Procedimiento;

  @Column({ type: 'text'})
  id_factor: string;

  @ManyToOne(() => Test, test => test.id_test)
  @JoinColumn({ name: 'id_test' })
  id_test: Test;

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

  @Column({ type: 'text', nullable: true })
  otro_procedimiento: string;

  @Column({ type: 'boolean' })
  cronico: boolean;
}
