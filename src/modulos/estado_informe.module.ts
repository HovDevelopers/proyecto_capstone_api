import { Module } from '@nestjs/common';
import { EstadoInformeController } from '../controladores/estado_informe.controller';
import { EstadoInformeService } from '../modelos/servicios/estado_informe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoInforme } from 'src/modelos/clases/estado_informe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoInforme])],
  controllers: [EstadoInformeController],
  providers: [EstadoInformeService]
})
export class EstadoInformeModule {}
