import { Especialidad } from "../clases/especialidad.entity";

export interface crearProfesional {
    rut_profesional: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    id_especialidad: Especialidad;
  }
  
  export interface actualizarProfesional {
    rut_profesional?: string;
    nombres?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    correo?: string;
    id_especialidad?: Especialidad;
  }
  