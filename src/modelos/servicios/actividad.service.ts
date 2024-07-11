import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { nombre } from '../interfaces/nombre.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadService {

    constructor(@InjectRepository(Actividad) private repoActividad: Repository<Actividad>){}

    async crearActividad(nombreActividad: nombre){
        const actividadNueva = this.repoActividad.create(nombreActividad);
        return await this.repoActividad.save(actividadNueva);
    }

    async buscarTodo(): Promise<Actividad[]> {
        return await this.repoActividad.find();
    }

    async getActividadById(id: number): Promise<Actividad | undefined> {
        return await this.repoActividad.findOne({ where: { id_actividad: id }});
    }

    async actualizar(id: number, actualizarActividad: nombre): Promise<Actividad> {
        const actividad = await this.repoActividad.findOne({ where: { id_actividad: id } });
        if (!actividad) {
            return null;
        }
        Object.assign(actividad, actualizarActividad);
        return await this.repoActividad.save(actividad);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoActividad.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la actividad con ID ${id}`);
        }
    }
}
