export interface crearPaciente {
    n_ficha: number;
    rut?: string;
    pasaporte?: string;
    fecha_nacimiento: Date;
    nombres: string;
    nombre_social?: string;
    apellido_paterno: string;
    apellido_materno?: string;
    prevision: string;
    sexo: string;
    genero?: string;
  }
  
  export interface actualizarPaciente {
    n_ficha?: number;
    rut?: string;
    pasaporte?: string;
    fecha_nacimiento?: Date;
    nombres?: string;
    nombre_social?: string;
    apellido_paterno?: string;
    apellido_materno?: string;
    prevision?: string;
    sexo?: string;
    genero?: string;
  }
  