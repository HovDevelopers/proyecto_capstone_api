import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';

export class crearInformeDiarioDiagnostico {

  @IsInt()
  @IsNotEmpty()
  id_informe_diario: InformeDiario;

  @IsInt()
  @IsNotEmpty()
  diagnostico: Diagnostico;
}

export class actualizarInformeDiarioDiagnostico {

    @IsInt()
    @IsOptional()
    id_informe_diario: InformeDiario;
  
    @IsInt()
    @IsOptional()
    diagnostico: Diagnostico;
}
