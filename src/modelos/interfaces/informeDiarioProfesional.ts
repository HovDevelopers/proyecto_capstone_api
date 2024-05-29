import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';

export class crearInformeDiarioProfesional {

  @IsInt()
  @IsNotEmpty()
  id_informe_diario: InformeDiario;

  @IsInt()
  @IsNotEmpty()
  profesional: Profesional;
}

export class actualizarInformeDiarioProfesional {

    @IsInt()
    @IsOptional()
    id_informe_diario: InformeDiario;
  
    @IsInt()
    @IsOptional()
    profesional: Profesional;
}
