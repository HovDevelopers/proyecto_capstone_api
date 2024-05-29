import { Module } from '@nestjs/common';
import { ProcedenciaConsultaNuevoController } from '../controladores/procedencia_consulta_nuevo.controller';
import { ProcedenciaConsultaNuevoService } from '../modelos/servicios/procedencia_consulta_nuevo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedenciaConsultaNuevo } from 'src/modelos/clases/procedencia_consulta_nuevo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedenciaConsultaNuevo])],
  controllers: [ProcedenciaConsultaNuevoController],
  providers: [ProcedenciaConsultaNuevoService]
})
export class ProcedenciaConsultaNuevoModule {}
