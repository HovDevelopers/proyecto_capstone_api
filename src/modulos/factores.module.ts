import { Module } from '@nestjs/common';
import { FactoresController } from '../controladores/factores.controller';
import { FactoresService } from '../modelos/servicios/factores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factores } from 'src/modelos/clases/factores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factores])],
  controllers: [FactoresController],
  providers: [FactoresService]
})
export class FactoresModule {}
