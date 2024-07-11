import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { EstadoUsuarioService } from 'src/modelos/servicios/estado_usuario.service';
import { InitService } from 'src/modelos/servicios/inicializados.service';
import { ProfesionalService } from 'src/modelos/servicios/profesional.service';
import { RolService } from 'src/modelos/servicios/rol.service';
import { Rol } from 'src/modelos/clases/rol.entity';
import { EstadoUsuario } from 'src/modelos/clases/estado_usuario.entity';
import { UsuarioService } from 'src/modelos/servicios/usuario.service';
import { Usuario } from 'src/modelos/clases/usuario.entity';
import { EspecialidadService } from 'src/modelos/servicios/especialidad.service';
import { Especialidad } from 'src/modelos/clases/especialidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesional, Rol, EstadoUsuario, Usuario, Especialidad])],
  providers: [InitService, ProfesionalService, RolService, EstadoUsuarioService, UsuarioService,
            EspecialidadService]
})
export class InitModule {}
