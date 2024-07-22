import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { Especialidad } from 'src/modelos/clases/especialidad.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class EspecialidadService {

    constructor(@InjectRepository(Especialidad) private repoEspecialidad: Repository<Especialidad>,
    private readonly logActividadService: LogActividadService,){}

    async crearEspecialidad(nombreEspecialidad: nombre, req:any){
        const especialidadNueva = this.repoEspecialidad.create(nombreEspecialidad);
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Especialidad',
            nombreEspecialidad
        );
        return await this.repoEspecialidad.save(especialidadNueva);
    }

    async buscarTodo(): Promise<Especialidad[]> {
        return await this.repoEspecialidad.find();
    }

    async getEspecialidadById(id: number): Promise<Especialidad | undefined> {
        return await this.repoEspecialidad.findOne({ where: { id_especialidad: id }});
    }

    async actualizar(id: number, actualizarEspecialidad: nombre): Promise<Especialidad> {
        const especialidad = await this.repoEspecialidad.findOne({ where: { id_especialidad: id } });
        if (!especialidad) {
            return null;
        }
        Object.assign(especialidad, actualizarEspecialidad);
        return await this.repoEspecialidad.save(especialidad);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoEspecialidad.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la especialidad con ID ${id}`);
        }
    }
}
