import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaComisionIngreso } from 'src/modelos/clases/procedencia_comision_ingreso.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { Factores } from 'src/modelos/clases/factores.entity';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente.entity';
import { EstadoInforme } from '../clases/estado_informe.entity';
import { ProcedenciaConsultaNuevo } from '../clases/procedencia_consulta_nuevo.entity';
import { Diagnostico } from '../clases/diagnostico.entity';

export interface crearComisionIngreso {
  id_paciente: number;
  fecha_envio: Date;
  fecha_consulta: Date;
  id_dispositivo: Dispositivo;
  id_procedencia_comision_ingreso: ProcedenciaComisionIngreso;
  id_actividad: Actividad;
  id_tipo_paciente: TipoPaciente;
  id_factor: Factores;
  id_estado_informe: EstadoInforme;
  id_procedencia_nuevo: ProcedenciaConsultaNuevo;
  diagnostico_principal: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
}

export interface actualizarComisionIngreso {
  id_paciente?: number;
  fecha_envio?: Date;
  fecha_consulta?: Date;
  id_dispositivo?: Dispositivo;
  id_procedencia_comision_ingreso?: ProcedenciaComisionIngreso;
  id_actividad?: Actividad;
  id_tipo_paciente?: TipoPaciente;
  id_factor?: Factores;
  id_estado_informe?: EstadoInforme;
  id_procedencia_nuevo?: ProcedenciaConsultaNuevo;
  diagnostico_principal?: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
}
