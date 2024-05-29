import { Module } from '@nestjs/common';
import { UsuarioController } from '../controladores/usuario.controller';
import { UsuarioService } from '../modelos/servicios/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/modelos/clases/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule {}
