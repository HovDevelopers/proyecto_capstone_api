import { Module } from '@nestjs/common';
import { UrgenciaController } from '../controladores/urgencia.controller';
import { UrgenciaService } from '../modelos/servicios/urgencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { UrgenciaProfesional } from 'src/modelos/clases/urgencia_profesional.entity';
import { UrgenciaDiagnostico } from 'src/modelos/clases/urgencia_diagnostico.entity';
import { UrgenciaProfesionalController } from 'src/controladores/urgencia_profesional.controller';
import { UrgenciaDiagnosticoController } from 'src/controladores/urgencia_diagnostico.controller';
import { UrgenciaProfesionalService } from 'src/modelos/servicios/urgencia_profesional.service';
import { UrgenciaDiagnosticoService } from 'src/modelos/servicios/urgencia_diagnostico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Urgencia, UrgenciaProfesional, UrgenciaDiagnostico])],
  controllers: [UrgenciaController, UrgenciaProfesionalController, UrgenciaDiagnosticoController],
  providers: [UrgenciaService, UrgenciaProfesionalService, UrgenciaDiagnosticoService]
})
export class UrgenciaModule {}
