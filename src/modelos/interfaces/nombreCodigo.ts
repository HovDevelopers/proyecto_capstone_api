import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class crearNombreCodigo {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsOptional()
  codigo: number;
}

export class actualizarNombreCodigo {

    @IsString()
    @IsOptional()
    nombre: string;
  
    @IsNumber()
    @IsOptional()
    codigo: number;
  }