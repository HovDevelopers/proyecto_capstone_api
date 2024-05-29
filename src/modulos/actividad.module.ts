import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { ActividadService } from '../modelos/servicios/actividad.service';
import { ActividadController } from '../controladores/actividad.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Actividad])],
    controllers: [ActividadController],
    providers: [ActividadService]
})
export class ActividadModule {}
