import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class crearNombre {

    @IsString()
    @IsNotEmpty()
    nombre: string;
}

export class actualizarNombre {

    @IsString()
    @IsOptional()
    nombre: string;
}
