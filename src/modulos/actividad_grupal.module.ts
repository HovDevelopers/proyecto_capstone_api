import { Module } from '@nestjs/common';
import { ActividadGrupalController } from '../controladores/actividad_grupal.controller';
import { ActividadGrupalService } from '../modelos/servicios/actividad_grupal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadGrupal } from 'src/modelos/clases/actividad_grupal.entity';
import { ActividadGrupalProfesional } from 'src/modelos/clases/actividad_grupal_profesional.entity';
import { ActividadGrupalProfesionalController } from 'src/controladores/actividad_grupal_profesional.controller';
import { ActividadGrupalProfesionalService } from 'src/modelos/servicios/actividad_grupal_profesional.service';
import { PacientesActividadGrupal } from 'src/modelos/clases/pacientes_actividad_grupal.entity';
import { PacientesActividadGrupalController } from 'src/controladores/pacientes_actividad_grupal.controller';
import { PacientesActividadGrupalService } from 'src/modelos/servicios/pacientes_actividad_grupal.service';
import { TipoActividadesGrupales } from 'src/modelos/clases/tipo_actividades_grupales.entity';
import { TipoActividadesGrupalesController } from 'src/controladores/tipo_actividades_grupales.controller';
import { TipoActividadesGrupalesService } from 'src/modelos/servicios/tipo_actividades_grupales.service';
import { PacienteAuditoria } from 'src/modelos/clases/paciente_auditoria.entity';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { PacienteService } from 'src/modelos/servicios/paciente.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadGrupal, ActividadGrupalProfesional, PacientesActividadGrupal,
    TipoActividadesGrupales, Paciente, PacienteAuditoria])],
  controllers: [ActividadGrupalController, ActividadGrupalProfesionalController, PacientesActividadGrupalController,
    TipoActividadesGrupalesController],
  providers: [ActividadGrupalService, ActividadGrupalProfesionalService, PacientesActividadGrupalService,
    TipoActividadesGrupalesService, PacienteService]
})
export class ActividadGrupalModule {}
