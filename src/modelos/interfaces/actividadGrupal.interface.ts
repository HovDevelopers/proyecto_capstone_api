import { Dispositivo } from '../clases/dispositivo.entity';
import { EstadoInforme } from '../clases/estado_informe.entity';
import { TipoActividadesGrupales } from '../clases/tipo_actividades_grupales.entity';

export interface crearActividadGrupal {
  fecha_envio: Date;
  fecha_consulta: Date;
  id_dispositivo: Dispositivo;
  hora_inicio: string;
  hora_termino: string;
  id_actividad: TipoActividadesGrupales;
  presentes?: number;
  otra_actividad?: string;
  id_estado_informe: EstadoInforme;
}

export interface actualizarActividadGrupal {
  fecha_envio?: Date;
  fecha_consulta?: string;
  id_dispositivo?: Dispositivo;
  hora_inicio?: string;
  hora_termino?: Date;
  id_actividad?: TipoActividadesGrupales;
  presentes?: number;
  otra_actividad?: string;
  id_estado_informe?: EstadoInforme;
}

