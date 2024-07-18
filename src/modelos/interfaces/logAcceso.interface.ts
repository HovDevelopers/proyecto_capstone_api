import { Usuario } from '../clases/usuario.entity';

export interface crearLogAcceso {
    fecha_registro: Date;
    id_usuario?: Usuario;
    ip_privada: string;
    ip_publica: string;
    informacion_dispositivo: string;
    resultado_acceso: string;
  }
  

