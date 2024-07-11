import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsuarioService } from 'src/modelos/servicios/usuario.service';
import { ProfesionalService } from 'src/modelos/servicios/profesional.service';
import { RolService } from 'src/modelos/servicios/rol.service';
import { EstadoUsuarioService } from 'src/modelos/servicios/estado_usuario.service';
import { crearUsuario } from '../interfaces/usuario.interface';
import { crearProfesional } from '../interfaces/profesional.interface';
import { EspecialidadService } from './especialidad.service';


@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly profesionalService: ProfesionalService,
    private readonly rolService: RolService,
    private readonly estadoUsuarioService: EstadoUsuarioService,
    private readonly especialidadService: EspecialidadService,
  ) {} 

  async onModuleInit() {

    const adminProfesional = await this.profesionalService.getProfesionalByRut('20091616-6');
    if (!adminProfesional) {
      await this.crearprofesionalAdmin();
    } 

    const adminUser = await this.usuarioService.getUsuarioByNombreUsuario('20091616-6');
    if (!adminUser) {
      await this.crearUsuarioAdmin();
    }
  }

  private async crearprofesionalAdmin() {

    const especialidad = await this.especialidadService.getEspecialidadById(1); // especialidad TIC

    const crearProfesional: crearProfesional = {
      rut_profesional: '20091616-6',
      nombres: 'Manuel',
      apellido_paterno: 'Segovia',
      apellido_materno: 'Araya',
      correo: 'manuel.segovia@redsalud.gob.cl',
      id_especialidad: especialidad,
    };

    await this.profesionalService.crearPrimerProfesional(crearProfesional);
  }

  private async crearUsuarioAdmin() {
    
    const profesional = await this.profesionalService.getProfesionalById(1);
    const rol = await this.rolService.getRolById(1); //rol ADMIN
    const estadoUsuario = await this.estadoUsuarioService.getEstadoUsuarioById(1); //Estado ACTIVO
    const clave = profesional.rut_profesional.substring(0, 4); // la clave son los primeros 4 digitos del rut

    const crearUsuario: crearUsuario = {
      id_profesional: profesional,
      fecha_creacion: new Date(),
      nombre_usuario: profesional.rut_profesional, //el nombre de usuario es el rut del profesional
      clave: clave,
      id_rol: rol,
      id_estado_usuario: estadoUsuario,
    };

    await this.usuarioService.crearPrimerUsuario(crearUsuario);
  }
}
