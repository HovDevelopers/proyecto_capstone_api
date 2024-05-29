import { Module } from '@nestjs/common';
import { VisitaSaludMentalController } from '../controladores/visita_salud_mental.controller';
import { VisitaSaludMentalService } from '../modelos/servicios/visita_salud_mental.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitaSaludMental])],
  controllers: [VisitaSaludMentalController],
  providers: [VisitaSaludMentalService]
})
export class VisitaSaludMentalModule {}
