import { Module } from '@nestjs/common';
import { ComisionIngresoController } from '../controladores/comision_ingreso.controller';
import { ComisionIngresoService } from '../modelos/servicios/comision_ingreso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { ComisionIngresoProfesional } from 'src/modelos/clases/comision_ingreso_profesional.entity';
import { ComisionIngresoProfesionalController } from 'src/controladores/comision_ingreso_profesional.controller';
import { ComisionIngresoProfesionalService } from 'src/modelos/servicios/comision_ingreso_profesional.service';
import { ProcedenciaConsultaNuevo } from 'src/modelos/clases/procedencia_consulta_nuevo.entity';
import { ProcedenciaConsultaNuevoController } from 'src/controladores/procedencia_consulta_nuevo.controller';
import { ProcedenciaConsultaNuevoService } from 'src/modelos/servicios/procedencia_consulta_nuevo.service';
import { ProcedenciaComisionIngreso } from 'src/modelos/clases/procedencia_comision_ingreso.entity';
import { ProcedenciaComisionIngresoController } from 'src/controladores/procedencia_comision_ingreso.controller';
import { ProcedenciaComisionIngresoService } from 'src/modelos/servicios/procedencia_comision_ingreso.service';
import { PacienteService } from 'src/modelos/servicios/paciente.service';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { PacienteAuditoria } from 'src/modelos/clases/paciente_auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComisionIngreso, ComisionIngresoProfesional, Paciente, PacienteAuditoria,
                                     ProcedenciaComisionIngreso,ProcedenciaConsultaNuevo])],
  controllers: [ComisionIngresoController, ComisionIngresoProfesionalController, 
                ProcedenciaComisionIngresoController,ProcedenciaConsultaNuevoController],
  providers: [ComisionIngresoService, ComisionIngresoProfesionalService,
              ProcedenciaComisionIngresoService,ProcedenciaConsultaNuevoService,PacienteService]
})
export class ComisionIngresoModule {}
