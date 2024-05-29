import { Module } from '@nestjs/common';
import { PacienteController } from '../controladores/paciente.controller';
import { PacienteService } from '../modelos/servicios/paciente.service';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  controllers: [PacienteController],
  providers: [PacienteService]
})
export class PacienteModule {}
