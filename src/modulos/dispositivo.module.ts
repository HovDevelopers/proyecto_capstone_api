import { Module } from '@nestjs/common';
import { DispositivoService } from '../modelos/servicios/dispositivo.service';
import { DispositivoController } from '../controladores/dispositivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dispositivo])],
  providers: [DispositivoService],
  controllers: [DispositivoController]
})
export class DispositivoModule {}
