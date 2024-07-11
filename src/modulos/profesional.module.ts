import { Module } from '@nestjs/common';
import { ProfesionalController } from '../controladores/profesional.controller';
import { ProfesionalService } from '../modelos/servicios/profesional.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Profesional } from 'src/modelos/clases/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional])],
  controllers: [ProfesionalController],
  providers: [ProfesionalService]
})
export class ProfesionalModule {}
