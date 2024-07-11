import { EstadoUsuario } from "../clases/estado_usuario.entity";
import { Profesional } from "../clases/profesional.entity";
import { Rol } from "../clases/rol.entity";

export interface crearUsuario {
    id_profesional: Profesional;
    fecha_creacion: Date;
    nombre_usuario: string;
    clave: string;
    id_rol: Rol;
    id_estado_usuario: EstadoUsuario;
}

export interface actualizarUsuario {
    id_profesional?: Profesional;
    fecha_creacion?: Date;
    nombre_usuario?: string;
    clave?: string;
    id_rol?: Rol;
    id_estado_usuario?: EstadoUsuario;
}
