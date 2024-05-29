import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';
import { Urgencia } from '../clases/urgencia.entity';

export class crearUrgenciaDiagnostico {

  @IsInt()
  @IsNotEmpty()
  id_urgencia: Urgencia;

  @IsInt()
  @IsNotEmpty()
  diagnostico: Diagnostico;
}

export class actualizarUrgenciaDiagnostico {

    @IsInt()
    @IsOptional()
    id_urgencia: Urgencia;
  
    @IsInt()
    @IsOptional()
    diagnostico: Diagnostico;
}
