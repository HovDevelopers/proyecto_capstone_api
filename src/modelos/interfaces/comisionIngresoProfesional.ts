import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';

export class crearComisionIngresoProfesional {

  @IsInt()
  @IsNotEmpty()
  id_comision_ingreso: ComisionIngreso;

  @IsInt()
  @IsNotEmpty()
  profesional: Profesional;
}

export class actualizarComisionIngresoProfesional {

    @IsInt()
    @IsOptional()
    id_comision_ingreso: ComisionIngreso;
  
    @IsInt()
    @IsOptional()
    profesional: Profesional;
}
