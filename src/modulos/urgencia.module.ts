import { Module } from '@nestjs/common';
import { UrgenciaController } from '../controladores/urgencia.controller';
import { UrgenciaService } from '../modelos/servicios/urgencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { UrgenciaProfesional } from 'src/modelos/clases/urgencia_profesional.entity';
import { UrgenciaProfesionalController } from 'src/controladores/urgencia_profesional.controller';
import { UrgenciaProfesionalService } from 'src/modelos/servicios/urgencia_profesional.service';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { PacienteAuditoria } from 'src/modelos/clases/paciente_auditoria.entity';
import { PacienteService } from 'src/modelos/servicios/paciente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Urgencia, UrgenciaProfesional, Paciente, PacienteAuditoria])],
  controllers: [UrgenciaController, UrgenciaProfesionalController],
  providers: [UrgenciaService, UrgenciaProfesionalService, PacienteService]
})
export class UrgenciaModule {}
