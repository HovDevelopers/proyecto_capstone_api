import { Module } from '@nestjs/common';
import { LogAccesoController } from '../controladores/log_acceso.controller';
import { LogAccesoService } from '../modelos/servicios/log_acceso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from 'src/modelos/clases/log_acceso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogAcceso])],
  controllers: [LogAccesoController],
  providers: [LogAccesoService]
})
export class LogAccesoModule {}
