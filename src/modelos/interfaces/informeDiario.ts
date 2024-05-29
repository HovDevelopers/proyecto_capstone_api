import { IsNotEmpty, IsInt, IsString, IsOptional, IsDateString } from 'class-validator';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';
import { Procedimiento } from 'src/modelos/clases/procedimiento.entity';
import { Factores } from 'src/modelos/clases/factores.entity';
import { Test } from 'src/modelos/clases/test.entity';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente..entity';
import { EstadoInforme } from '../clases/estado_informe.entity';

export class crearInformeDiario {

  @IsInt()
  @IsNotEmpty()
  id_paciente: Paciente;

  @IsDateString()
  @IsNotEmpty()
  fecha_envio: Date;

  @IsInt()
  @IsNotEmpty()
  id_dispositivo: Dispositivo;

  @IsInt()
  @IsNotEmpty()
  id_procedencia: ProcedenciaConsulta;

  @IsInt()
  @IsNotEmpty()
  id_actividad: Actividad;

  @IsInt()
  @IsNotEmpty()
  id_tipo_paciente: TipoPaciente;

  @IsInt()
  @IsNotEmpty()
  id_visita_salud_mental: VisitaSaludMental;

  @IsInt()
  @IsNotEmpty()
  id_procedimiento: Procedimiento;

  @IsInt()
  @IsNotEmpty()
  id_factor: Factores;

  @IsInt()
  @IsNotEmpty()
  id_test: Test;

  @IsInt()
  @IsNotEmpty()
  id_estado_informe: EstadoInforme;

  @IsString()
  @IsNotEmpty()
  diagnostico_principal: string;
}

export class actualizarInformeDiario {

    @IsInt()
    @IsOptional()
    id_paciente: Paciente;
  
    @IsDateString()
    @IsOptional()
    fecha_envio: Date;
  
    @IsInt()
    @IsOptional()
    id_dispositivo: Dispositivo;
  
    @IsInt()
    @IsOptional()
    id_procedencia: ProcedenciaConsulta;
  
    @IsInt()
    @IsOptional()
    id_actividad: Actividad;
  
    @IsInt()
    @IsOptional()
    id_tipo_paciente: TipoPaciente;
  
    @IsInt()
    @IsOptional()
    id_visita_salud_mental: VisitaSaludMental;
  
    @IsInt()
    @IsOptional()
    id_procedimiento: Procedimiento;
  
    @IsInt()
    @IsOptional()
    id_factor: Factores;
  
    @IsInt()
    @IsOptional()
    id_test: Test;
  
    @IsInt()
    @IsOptional()
    id_estado_informe: EstadoInforme;
  
    @IsString()
    @IsOptional()
    diagnostico_principal: string;
}
