import { Module } from '@nestjs/common';
import { DiagnosticoController } from '../controladores/diagnostico.controller';
import { DiagnosticoService } from '../modelos/servicios/diagnostico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico])],
  controllers: [DiagnosticoController],
  providers: [DiagnosticoService]
})
export class DiagnosticoModule {}
