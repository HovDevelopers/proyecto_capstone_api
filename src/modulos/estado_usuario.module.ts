import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoUsuario } from 'src/modelos/clases/estado_usuario.entity';
import { EstadoUsuarioController } from '../controladores/estado_usuario.controller';
import { EstadoUsuarioService } from '../modelos/servicios/estado_usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([EstadoUsuario])],
    controllers: [EstadoUsuarioController],
    providers: [EstadoUsuarioService]
})
export class EstadoUsuarioModule {}
