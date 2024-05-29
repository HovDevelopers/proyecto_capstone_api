import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { Urgencia } from '../clases/urgencia.entity';

export class crearUrgenciaProfesional {

  @IsInt()
  @IsNotEmpty()
  id_urgencia: Urgencia;

  @IsInt()
  @IsNotEmpty()
  profesional: Profesional;
}

export class actualizarUrgenciaProfesional {

    @IsInt()
    @IsOptional()
    id_urgencia: Urgencia;
  
    @IsInt()
    @IsOptional()
    profesional: Profesional;
}
