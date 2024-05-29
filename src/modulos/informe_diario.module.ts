import { Module } from '@nestjs/common';
import { InformeDiarioController } from '../controladores/informe_diario.controller';
import { InformeDiarioService } from '../modelos/servicios/informe_diario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { InformeDiarioProfesional } from 'src/modelos/clases/informe_diario_profesional.entity';
import { InformeDiarioDiagnostico } from 'src/modelos/clases/informe_diario_diagnostico.entity';
import { InformeDiarioProfesionalController } from 'src/controladores/informe_diario_profesional.controller';
import { InformeDiarioDiagnosticoController } from 'src/controladores/informe_diario_diagnostico.controller';
import { InformeDiarioProfesionalService } from 'src/modelos/servicios/informe_diario_profesional.service';
import { InformeDiarioDiagnosticoService } from 'src/modelos/servicios/informe_diario_diagnostico.service';

@Module({
  imports: [TypeOrmModule.forFeature([InformeDiario, InformeDiarioProfesional, InformeDiarioDiagnostico])],
  controllers: [InformeDiarioController, InformeDiarioProfesionalController, InformeDiarioDiagnosticoController],
  providers: [InformeDiarioService, InformeDiarioProfesionalService, InformeDiarioDiagnosticoService]
})
export class InformeDiarioModule {}
