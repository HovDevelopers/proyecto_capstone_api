import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearNombre } from '../interfaces/nombre';
import { actualizarNombre } from '../interfaces/nombre';
import { Rol } from 'src/modelos/clases/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {

    constructor(@InjectRepository(Rol) private repoRol: Repository<Rol>){}

    async crearRol(nombreRol: crearNombre){
        const RolNueva = this.repoRol.create(nombreRol);
        return await this.repoRol.save(RolNueva);
    }

    async buscarTodo(): Promise<Rol[]> {
        return await this.repoRol.find();
    }

    async getRolById(id: number): Promise<Rol | undefined> {
        return await this.repoRol.findOne({ where: { id_rol: id }});
    }

    async actualizar(id: number, actualizarRol: actualizarNombre): Promise<Rol> {
        const rol = await this.repoRol.findOne({ where: { id_rol: id } });
        if (!rol) {
            return null;
        }
        Object.assign(rol, actualizarRol);
        return await this.repoRol.save(rol);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoRol.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el Rol con ID ${id}`);
        }
    }
}
