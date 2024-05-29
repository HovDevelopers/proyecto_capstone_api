import { Module } from '@nestjs/common';
import { ComisionIngresoController } from '../controladores/comision_ingreso.controller';
import { ComisionIngresoService } from '../modelos/servicios/comision_ingreso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { ComisionIngresoProfesional } from 'src/modelos/clases/comision_ingreso_profesional.entity';
import { ComisionIngresoDiagnostico } from 'src/modelos/clases/comision_ingreso_diagnostico.entity';
import { ComisionIngresoProfesionalController } from 'src/controladores/comision_ingreso_profesional.controller';
import { ComisionIngresoDiagnosticoController } from 'src/controladores/comision_ingreso_diagnostico.controller';
import { ComisionIngresoProfesionalService } from 'src/modelos/servicios/comision_ingreso_profesional.service';
import { ComisionIngresoDiagnosticoService } from 'src/modelos/servicios/comision_ingreso_diagnostico.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComisionIngreso, ComisionIngresoProfesional, ComisionIngresoDiagnostico])],
  controllers: [ComisionIngresoController, ComisionIngresoProfesionalController, ComisionIngresoDiagnosticoController],
  providers: [ComisionIngresoService, ComisionIngresoProfesionalService, ComisionIngresoDiagnosticoService]
})
export class ComisionIngresoModule {}
