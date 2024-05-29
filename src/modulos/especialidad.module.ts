import { Module } from '@nestjs/common';
import { EspecialidadController } from '../controladores/especialidad.controller';
import { EspecialidadService } from '../modelos/servicios/especialidad.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Especialidad } from 'src/modelos/clases/especialidad.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Especialidad])],
  controllers: [EspecialidadController],
  providers: [EspecialidadService]
})
export class EspecialidadModule {}
