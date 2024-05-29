import { IsEmail, IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { Especialidad } from 'src/modelos/clases/especialidad.entity';

export class crearProfesional {

    @IsString()
    @IsNotEmpty()
    rut_profesional: string;

    @IsString()
    @IsNotEmpty()
    nombres: string;

    @IsString()
    @IsNotEmpty()
    apellido_paterno: string;

    @IsString()
    apellido_materno: string;

    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsInt()
    @IsNotEmpty()
    id_especialidad: Especialidad;
}

export class actualizarProfesional {

    @IsString()
    @IsOptional()
    rut_profesional: string;

    @IsString()
    @IsOptional()
    nombres: string;

    @IsString()
    @IsOptional()
    apellido_paterno: string;

    @IsString()
    @IsOptional()
    apellido_materno: string;

    @IsEmail()
    @IsOptional()
    correo: string;

    @IsInt()
    @IsOptional()
    id_especialidad: Especialidad;
}
