import { ActividadGrupal } from 'src/modelos/clases/actividad_grupal.entity';

export interface crearPacientesActividadGrupal {
  id_actividad_grupal: ActividadGrupal;
  paciente: number;
  sename: boolean;
}

export interface actualizarPacientesActividadGrupal {
  id_actividad_grupal?: ActividadGrupal;
  paciente?: number;
  sename?: boolean;
}
