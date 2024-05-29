import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/modelos/clases/rol.entity';
import { RolController } from '../controladores/rol.controller';
import { RolService } from '../modelos/servicios/rol.service';

@Module({
    imports: [TypeOrmModule.forFeature([Rol])],
    controllers: [RolController],
    providers: [RolService]
})
export class RolModule {}
