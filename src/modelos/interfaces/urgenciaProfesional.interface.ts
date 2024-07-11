import { Profesional } from "../clases/profesional.entity";
import { Urgencia } from "../clases/urgencia.entity";

export interface crearUrgenciaProfesional {
  id_urgencia: Urgencia;
  profesional: Profesional;
}

export interface actualizarUrgenciaProfesional {
  id_urgencia?: Urgencia;
  profesional?: Profesional;
}
