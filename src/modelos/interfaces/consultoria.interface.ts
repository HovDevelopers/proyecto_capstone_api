import { Paciente } from 'src/modelos/clases/paciente.entity';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { EstadoInforme } from '../clases/estado_informe.entity';
import { Diagnostico } from '../clases/diagnostico.entity';

export interface crearConsultoria {
  id_paciente: number;
  nombre_consultorio: string;
  fecha_envio: Date;
  fecha_consulta: Date;
  id_dispositivo: Dispositivo;
  consulta: string;
  tipo_consultoria: string;
  revision_consulta: string;
  sename: boolean;
  interconsulta: boolean;
  id_estado_informe: EstadoInforme;
  diagnostico_principal: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
}

export interface actualizarConsultoria {
  id_paciente?: number;
  nombre_consultorio?: string;
  fecha_envio?: Date;
  fecha_consulta?: Date;
  id_dispositivo?: Dispositivo;
  consulta?: boolean;
  tipo_consulta?: boolean;
  revision_consulta?: boolean;
  sename?: boolean;
  interconsulta?: boolean;
  id_estado_informe?: EstadoInforme;
  diagnostico_principal?: Diagnostico;
  diagnosticos_secundarios?: string;
  otro_diagnostico?: string;
}
