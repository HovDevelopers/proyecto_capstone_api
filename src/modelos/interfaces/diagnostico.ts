import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class crearDiagnostico {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsOptional()
  codigo: number;

  @IsBoolean()
  @IsNotEmpty()
  bool_GES: boolean;
}

export class actualizarDiagnostico {

    @IsString()
    @IsOptional()
    nombre: string;
  
    @IsNumber()
    @IsOptional()
    codigo: number;
  
    @IsBoolean()
    @IsOptional()
    bool_GES: boolean;
  }
