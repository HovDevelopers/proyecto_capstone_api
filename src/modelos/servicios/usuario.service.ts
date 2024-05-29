import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarUsuario } from '../interfaces/usuario';
import { crearUsuario } from '../interfaces/usuario';
import { Usuario } from 'src/modelos/clases/usuario.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';


@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private repoUsuario: Repository<Usuario>){}

    async crearUsuario(usuario: crearUsuario){
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

    async actualizar(id: number, actualizarUsuario: actualizarUsuario): Promise<Usuario> {
        const usuario = await this.repoUsuario.findOne({ where: { id_usuario: id } });
        if (!usuario) {
            return null;
        }
        Object.assign(usuario, actualizarUsuario);
        return await this.repoUsuario.save(usuario);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoUsuario.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el Usuario con ID ${id}`);
        }
    }
}