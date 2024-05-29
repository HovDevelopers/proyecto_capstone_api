import { Module } from '@nestjs/common';
import { TestController } from '../controladores/test.controller';
import { TestService } from '../modelos/servicios/test.service';
import { Test } from 'src/modelos/clases/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
