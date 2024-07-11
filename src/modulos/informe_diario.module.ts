import { Module } from '@nestjs/common';
import { InformeDiarioController } from '../controladores/informe_diario.controller';
import { InformeDiarioService } from '../modelos/servicios/informe_diario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { InformeDiarioProfesional } from 'src/modelos/clases/informe_diario_profesional.entity';
import { InformeDiarioProfesionalController } from 'src/controladores/informe_diario_profesional.controller';
import { InformeDiarioProfesionalService } from 'src/modelos/servicios/informe_diario_profesional.service';
import { PacienteService } from 'src/modelos/servicios/paciente.service';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { PacienteAuditoria } from 'src/modelos/clases/paciente_auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InformeDiario, InformeDiarioProfesional, Paciente, PacienteAuditoria])],
  controllers: [InformeDiarioController, InformeDiarioProfesionalController],
  providers: [InformeDiarioService, InformeDiarioProfesionalService, PacienteService]
})
export class InformeDiarioModule {}
