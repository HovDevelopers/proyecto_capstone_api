import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from './paciente.entity';
import { EstadoInforme } from './estado_informe.entity';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente..entity';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';
import { Procedimiento } from 'src/modelos/clases/procedimiento.entity';
import { Factores } from 'src/modelos/clases/factores.entity';
import { Test } from 'src/modelos/clases/test.entity';

@Entity('informe_diario')
export class InformeDiario {
  @PrimaryGeneratedColumn()
  id_informe_diario: number;

  @ManyToOne(() => Paciente, paciente => paciente.id_paciente)
  @JoinColumn({ name: 'id_paciente' })
  id_paciente: Paciente;

  @Column({ type: 'date' })
  fecha_envio: Date;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.id_dispositivo)
  @JoinColumn({ name: 'id_dispositivo' })
  id_dispositivo: Dispositivo;

  @ManyToOne(() => ProcedenciaConsulta, procedenciaConsulta => procedenciaConsulta.id_procedencia_consulta)
  @JoinColumn({ name: 'id_procedencia' })
  id_procedencia: ProcedenciaConsulta;

  @ManyToOne(() => Actividad, actividad => actividad.id_actividad)
  @JoinColumn({ name: 'id_actividad' })
  id_actividad: Actividad;

  @ManyToOne(() => TipoPaciente, tipoPaciente => tipoPaciente.id_tipo_paciente)
  @JoinColumn({ name: 'id_tipo_paciente' })
  id_tipo_paciente: TipoPaciente;

  @ManyToOne(() => VisitaSaludMental, visitaSaludMental => visitaSaludMental.id_visita_salud_mental)
  @JoinColumn({ name: 'id_visita_salud_mental' })
  id_visita_salud_mental: VisitaSaludMental;

  @ManyToOne(() => Procedimiento, procedimiento => procedimiento.id_procedimiento)
  @JoinColumn({ name: 'id_procedimiento' })
  id_procedimiento: Procedimiento;

  @ManyToOne(() => Factores, factores => factores.id_factor)
  @JoinColumn({ name: 'id_factor' })
  id_factor: Factores;

  @ManyToOne(() => Test, test => test.id_test)
  @JoinColumn({ name: 'id_test' })
  id_test: Test;

  @ManyToOne(() => EstadoInforme, estadoInforme => estadoInforme.id_estado_informe)
  @JoinColumn({ name: 'id_estado_informe' })
  id_estado_informe: EstadoInforme;

  @Column({ type: 'text' })
  diagnostico_principal: string;
}
