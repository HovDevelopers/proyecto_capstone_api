import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { EstadoUsuario } from 'src/modelos/clases/estado_usuario.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { Rol } from 'src/modelos/clases/rol.entity';

export class crearUsuario {

    @IsInt()
    @IsNotEmpty()
    id_profesional: Profesional;

    @IsDateString()
    @IsNotEmpty()
    fecha_creacion: Date;

    @IsString()
    @IsNotEmpty()
    nombre_usuario: string;

    @IsString()
    @IsNotEmpty()
    clave: string;

    @IsInt()
    @IsNotEmpty()
    id_rol: Rol;

    @IsInt()
    @IsNotEmpty()
    id_estado_usuario: EstadoUsuario;
}

export class actualizarUsuario {

    @IsInt()
    @IsOptional()
    id_profesional: Profesional;

    @IsDateString()
    @IsOptional()
    fecha_creacion: Date;

    @IsString()
    @IsOptional()
    nombre_usuario: string;

    @IsString()
    @IsOptional()
    clave: string;

    @IsInt()
    @IsOptional()
    id_rol: Rol;

    @IsInt()
    @IsOptional()
    id_estado_usuario: EstadoUsuario;
}
