import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { EstadoUsuario } from 'src/modelos/clases/estado_usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoUsuarioService {

    constructor(@InjectRepository(EstadoUsuario) private repoEstadoUsuario: Repository<EstadoUsuario>){}

    async crearEstadoUsuario(nombreEstadoUsuario: nombre){
        const estadoUsuarioNuevo = this.repoEstadoUsuario.create(nombreEstadoUsuario);
        return await this.repoEstadoUsuario.save(estadoUsuarioNuevo);
    }

    async buscarTodo(): Promise<EstadoUsuario[]> {
        return await this.repoEstadoUsuario.find();
    }

    async getEstadoUsuarioById(id: number): Promise<EstadoUsuario | undefined> {
        return await this.repoEstadoUsuario.findOne({ where: { id_estado_usuario: id }});
    }

    async actualizar(id: number, actualizarEstadoUsuario: nombre): Promise<EstadoUsuario> {
        const estadoUsuario = await this.repoEstadoUsuario.findOne({ where: { id_estado_usuario: id } });
        if (!estadoUsuario) {
            return null;
        }
        Object.assign(estadoUsuario, actualizarEstadoUsuario);
        return await this.repoEstadoUsuario.save(estadoUsuario);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoEstadoUsuario.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la EstadoUsuario con ID ${id}`);
        }
    }
}
