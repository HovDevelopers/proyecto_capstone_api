import { Module } from '@nestjs/common';
import { TipoPacienteService } from '../modelos/servicios/tipo_paciente.service';
import { TipoPacienteController } from '../controladores/tipo_paciente.controller';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente..entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPaciente])],
  providers: [TipoPacienteService],
  controllers: [TipoPacienteController]
})
export class TipoPacienteModule {}
