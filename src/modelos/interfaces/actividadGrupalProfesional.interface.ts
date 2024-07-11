import { ActividadGrupal } from "../clases/actividad_grupal.entity";
import { Profesional } from "../clases/profesional.entity";

export interface crearActividadGrupalProfesional {
  id_actividad_grupal: ActividadGrupal;
  profesional: Profesional;
}

export interface actualizarActividadGrupalProfesional {
  id_actividad_grupal?: ActividadGrupal;
  profesional?: Profesional;
}
