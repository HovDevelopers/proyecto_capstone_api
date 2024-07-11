import { Global, Module } from '@nestjs/common';
import { LogActividadService } from '../modelos/servicios/log_actividad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogActividad } from 'src/modelos/clases/log_actividad.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LogActividad])],
  providers: [LogActividadService],
  exports: [LogActividadService, TypeOrmModule],
})
export class LogActividadModule {}
