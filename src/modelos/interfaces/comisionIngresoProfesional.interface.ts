import { ComisionIngreso } from "../clases/comision_ingreso.entity";
import { Profesional } from "../clases/profesional.entity";

export interface crearComisionIngresoProfesional {
  id_comision_ingreso: ComisionIngreso;
  profesional: Profesional;
}

export interface actualizarComisionIngresoProfesional {
  id_comision_ingreso?: ComisionIngreso;
  profesional?: Profesional;
}
