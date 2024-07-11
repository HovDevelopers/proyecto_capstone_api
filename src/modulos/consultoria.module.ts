import { Module } from '@nestjs/common';
import { ConsultoriaController } from '../controladores/consultoria.controller';
import { ConsultoriaService } from '../modelos/servicios/consultoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultoria } from 'src/modelos/clases/consultoria.entity';
import { ConsultoriaProfesional } from 'src/modelos/clases/consultoria_profesional.entity';
import { ConsultoriaProfesionalController } from 'src/controladores/consultoria_profesional.controller';
import { ConsultoriaProfesionalService } from 'src/modelos/servicios/consultoria_profesional.service';
import { PacienteService } from 'src/modelos/servicios/paciente.service';
import { PacienteAuditoria } from 'src/modelos/clases/paciente_auditoria.entity';
import { Paciente } from 'src/modelos/clases/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultoria, ConsultoriaProfesional, Paciente, PacienteAuditoria])],
  controllers: [ConsultoriaController, ConsultoriaProfesionalController],
  providers: [ConsultoriaService, ConsultoriaProfesionalService, PacienteService]
})
export class ConsultoriaModule {}
