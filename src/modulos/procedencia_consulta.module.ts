import { Module } from '@nestjs/common';
import { ProcedenciaConsultaController } from '../controladores/procedencia_consulta.controller';
import { ProcedenciaConsultaService } from '../modelos/servicios/procedencia_consulta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedenciaConsulta])],
  controllers: [ProcedenciaConsultaController],
  providers: [ProcedenciaConsultaService]
})
export class ProcedenciaConsultaModule {}
