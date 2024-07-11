import { Usuario } from '../clases/usuario.entity';

export interface crearLogActividad {
    id_usuario: Usuario;
    ip_privada: string;
    ip_publica: string;
    tipo_actividad: string;
    informacion_anterior?: string;
    informacion_nueva?: string;
  }
  

