import { InformeDiario } from "../clases/informe_diario.entity";
import { Profesional } from "../clases/profesional.entity";

export interface crearInformeDiarioProfesional {
  id_informe_diario: InformeDiario;
  profesional: Profesional;
}

export interface actualizarInformeDiarioProfesional {
  id_informe_diario?: InformeDiario;
  profesional?: Profesional;
}
