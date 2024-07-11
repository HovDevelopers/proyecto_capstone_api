import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearActividadGrupalProfesional } from '../interfaces/actividadGrupalProfesional.interface';
import { actualizarActividadGrupalProfesional } from '../interfaces/actividadGrupalProfesional.interface';
import { ActividadGrupalProfesional } from 'src/modelos/clases/actividad_grupal_profesional.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class ActividadGrupalProfesionalService {

    constructor(@InjectRepository(ActividadGrupalProfesional) private repoActividadGrupalProfesional: Repository<ActividadGrupalProfesional>,
    private readonly logActividadService: LogActividadService){}

    async crearActividadGrupalProfesional(actividadGrupalProfesional: crearActividadGrupalProfesional, req: any){
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Actividad Grupal Profesional',
            actividadGrupalProfesional
        );

        const actividadGrupalProfesionalNuevo = this.repoActividadGrupalProfesional.create(actividadGrupalProfesional);
        return this.repoActividadGrupalProfesional.save(actividadGrupalProfesionalNuevo);
    }

    async buscarTodo(): Promise<ActividadGrupalProfesional[]> {
        return await this.repoActividadGrupalProfesional.find({ 
            relations: ['id_actividad_grupal',
            'id_actividad_grupal.id_actividad',
            'profesional', 
            'profesional.id_especialidad'],
         });
    }

    async obtenerInformesPorProfesional(id: number): Promise<ActividadGrupalProfesional[] | undefined> {
        return await this.repoActividadGrupalProfesional.find({
          where: { profesional: { id_profesional: id } },
          relations: ['id_actividad_grupal',
          'id_actividad_grupal.id_actividad',
          'profesional', 
          'profesional.id_especialidad'],
        });
    } 

    async getActividadGrupalProfesionalById(id: number): Promise<ActividadGrupalProfesional | undefined> {
        return await this.repoActividadGrupalProfesional.findOne({ where: { id_actividad_grupal_profesional: id }, 
            relations: ['id_actividad_grupal',
            'id_actividad_grupal.id_actividad',
            'profesional', 
            'profesional.id_especialidad'], });
    }

    async actualizar(id: number, actualizarActividadGrupalProfesional: actualizarActividadGrupalProfesional): Promise<ActividadGrupalProfesional> {
        const actividadGrupalProfesional = await this.repoActividadGrupalProfesional.findOne({ where: { id_actividad_grupal_profesional: id } });
        if (!actividadGrupalProfesional) {
            return null;
        }
        Object.assign(actividadGrupalProfesional, actualizarActividadGrupalProfesional);
        return await this.repoActividadGrupalProfesional.save(actividadGrupalProfesional);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoActividadGrupalProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la actividad_grupal profesional con ID ${id}`);
        }
    }
}
