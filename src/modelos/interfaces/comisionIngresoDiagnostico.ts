import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';

export class crearComisionIngresoDiagnostico {

  @IsInt()
  @IsNotEmpty()
  id_comision_ingreso: ComisionIngreso;

  @IsInt()
  @IsNotEmpty()
  diagnostico: Diagnostico;
}

export class actualizarComisionIngresoDiagnostico {

    @IsInt()
    @IsOptional()
    id_comision_ingreso: ComisionIngreso;
  
    @IsInt()
    @IsOptional()
    diagnostico: Diagnostico;
}
