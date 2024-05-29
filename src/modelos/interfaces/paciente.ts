import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class crearPaciente {

    @IsNumber()
    @IsNotEmpty()
    n_ficha: number;

    @IsString()
    @IsOptional()
    rut: string;

    @IsString()
    @IsOptional()
    pasaporte: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: Date;

    @IsString()
    @IsNotEmpty()
    nombres: string;

    @IsString()
    @IsOptional()
    nombre_social: string;

    @IsString()
    @IsNotEmpty()
    apellido_paterno: string;

    @IsString()
    @IsOptional()
    apellido_materno: string;

    @IsString()
    @IsNotEmpty()
    prevision: string;

    @IsString()
    @IsNotEmpty()
    sexo: string;

    @IsString()
    @IsOptional()
    genero: string;
}

export class actualizarPaciente {

    @IsNumber()
    @IsOptional()
    n_ficha: number;

    @IsString()
    @IsOptional()
    rut: string;

    @IsString()
    @IsOptional()
    pasaporte: string;

    @IsDateString()
    @IsOptional()
    fecha_nacimiento: Date;

    @IsString()
    @IsOptional()
    nombres: string;

    @IsString()
    @IsOptional()
    nombre_social: string;

    @IsString()
    @IsOptional()
    apellido_paterno: string;

    @IsString()
    @IsOptional()
    apellido_materno: string;

    @IsString()
    @IsOptional()
    prevision: string;

    @IsString()
    @IsOptional()
    sexo: string;

    @IsString()
    @IsOptional()
    genero: string;
}
