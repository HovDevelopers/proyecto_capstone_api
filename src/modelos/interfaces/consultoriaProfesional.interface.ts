import { Consultoria } from "../clases/consultoria.entity";
import { Profesional } from "../clases/profesional.entity";

export interface crearConsultoriaProfesional {
  id_consultoria: Consultoria;
  profesional: Profesional;
}

export interface actualizarConsultoriaProfesional {
  id_consultoria?: Consultoria;
  profesional?: Profesional;
}
