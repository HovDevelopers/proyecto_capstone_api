import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { Factores } from 'src/modelos/clases/factores.entity';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente.entity';
import { EstadoInforme } from '../clases/estado_informe.entity';
import { Diagnostico } from '../clases/diagnostico.entity';

export interface crearUrgencia {
  id_paciente: number;
  en_turno: boolean;
  fecha_envio: Date;
  fecha_consulta: Date;
  id_dispositivo: Dispositivo;
  id_procedencia: ProcedenciaConsulta;
  id_actividad: Actividad;
  id_tipo_paciente: TipoPaciente;
  id_factor: Factores;
  id_estado_informe: EstadoInforme;
  diagnostico_principal: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
}

export interface actualizarUrgencia {
  id_paciente?: number;
  en_turno?: boolean;
  fecha_envio?: Date;
  fecha_consulta?: Date;
  id_dispositivo?: Dispositivo;
  id_procedencia?: ProcedenciaConsulta;
  id_actividad?: Actividad;
  id_tipo_paciente?: TipoPaciente;
  id_factor?: Factores;
  id_estado_informe?: EstadoInforme;
  diagnostico_principal?: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
}
