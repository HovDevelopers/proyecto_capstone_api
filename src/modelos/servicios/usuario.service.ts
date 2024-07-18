import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarUsuario } from '../interfaces/usuario.interface';
import { crearUsuario } from '../interfaces/usuario.interface';
import { Usuario } from 'src/modelos/clases/usuario.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { LogActividadService } from './log_actividad.service';


@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private repoUsuario: Repository<Usuario>,
    private readonly logActividadService: LogActividadService){}

    async crearUsuario(usuario: crearUsuario, req: any){
        const claveHash = await bcryptjs.hash(usuario.clave, 10);
        usuario.clave = claveHash; // Reemplaza la clave original con la clave hasheada
        const usuarioNuevo = this.repoUsuario.create(usuario);
        const usuarioGuardado = this.repoUsuario.save(usuarioNuevo);

        await this.logActividadService.insertarActividad(
            req,
            'Inserción Usuario',
            usuario
        );
        
        return usuarioGuardado;
    }

    async crearPrimerUsuario(usuario: crearUsuario){
        
        const claveHash = await bcryptjs.hash(usuario.clave, 10);
        usuario.clave = claveHash; // Reemplaza la clave original con la clave hasheada
        const usuarioNuevo = this.repoUsuario.create(usuario);
        return this.repoUsuario.save(usuarioNuevo);
    }

    async buscarTodo(): Promise<Usuario[]> {
        return await this.repoUsuario.find({ relations: ['id_profesional', 'id_rol', 'id_estado_usuario'] });
    }

    async getUsuarioById(id: number): Promise<Usuario | undefined> {
        return await this.repoUsuario.findOne({ where: { id_usuario: id }, relations: ['id_profesional', 'id_rol', 'id_estado_usuario'] });
    }
 
    async getUsuarioByNombreUsuario(nombre_usuario: string): Promise<Usuario | undefined> {
        return await this.repoUsuario.findOne({ where: { nombre_usuario: nombre_usuario }, relations: ['id_profesional', 'id_rol', 'id_estado_usuario'] });
    }

    async actualizar(id: number, actualizarUsuario: actualizarUsuario, req:any ): Promise<Usuario> {
        const usuario = await this.repoUsuario.findOne({ where: { id_usuario: id } });
        if (!usuario) {
            return null;
        }

        // Clonar el objeto usuario para guardar la información antigua
        const usuarioAUX = JSON.parse(JSON.stringify(usuario)); 

        if (actualizarUsuario.clave) {
            const claveHash = await bcryptjs.hash(actualizarUsuario.clave, 10);
            actualizarUsuario.clave = claveHash;
        }

        Object.assign(usuario, actualizarUsuario);
        const usuarioGuardado = await this.repoUsuario.save(usuario);

        await this.logActividadService.modificarActividad(
            req,
            'Actualización Usuario',
            usuarioAUX,
            actualizarUsuario
        );

        return usuarioGuardado;
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoUsuario.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el Usuario con ID ${id}`);
        }
    }
}