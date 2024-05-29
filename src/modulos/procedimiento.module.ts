import { Module } from '@nestjs/common';
import { ProcedimientoService } from '../modelos/servicios/procedimiento.service';
import { ProcedimientoController } from '../controladores/procedimiento.controller';
import { Procedimiento } from 'src/modelos/clases/procedimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Procedimiento])],
  providers: [ProcedimientoService],
  controllers: [ProcedimientoController]
})
export class ProcedimientoModule {}
