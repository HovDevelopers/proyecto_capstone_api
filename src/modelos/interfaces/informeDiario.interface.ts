import { Actividad } from "../clases/actividad.entity";
import { Diagnostico } from "../clases/diagnostico.entity";
import { Dispositivo } from "../clases/dispositivo.entity";
import { EstadoInforme } from "../clases/estado_informe.entity";
import { Factores } from "../clases/factores.entity";
import { Paciente } from "../clases/paciente.entity";
import { ProcedenciaConsulta } from "../clases/procedencia_consulta.entity";
import { Procedimiento } from "../clases/procedimiento.entity";
import { Test } from "../clases/test.entity";
import { TipoPaciente } from "../clases/tipo_paciente..entity";
import { VisitaSaludMental } from "../clases/visita_salud_mental.entity";

export interface crearInformeDiario {
  id_paciente: number;
  fecha_envio: Date;
  fecha_consulta: Date;
  id_dispositivo: Dispositivo;
  id_procedencia: ProcedenciaConsulta;
  id_actividad: Actividad;
  id_tipo_paciente: TipoPaciente;
  id_visita_salud_mental?: VisitaSaludMental;
  id_procedimiento?: Procedimiento;
  id_factor: Factores;
  id_test?: Test;
  id_estado_informe: EstadoInforme;
  diagnostico_principal: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
  otro_procedimiento?: string;
}

export interface actualizarInformeDiario {
  id_paciente?: number;
  fecha_envio?: Date;
  fecha_consulta?: Date;
  id_dispositivo?: Dispositivo;
  id_procedencia?: ProcedenciaConsulta;
  id_actividad?: Actividad;
  id_tipo_paciente?: TipoPaciente;
  id_visita_salud_mental?: VisitaSaludMental;
  id_procedimiento?: Procedimiento;
  id_factor?: Factores;
  id_test?: Test;
  id_estado_informe?: EstadoInforme;
  diagnostico_principal?: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
  otro_procedimiento?: string;
}
