import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarActividadGrupal } from '../interfaces/actividadGrupal.interface';
import { crearActividadGrupal } from '../interfaces/actividadGrupal.interface';
import { ActividadGrupal } from 'src/modelos/clases/actividad_grupal.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class ActividadGrupalService {

    constructor(@InjectRepository(ActividadGrupal) private repoActividadGrupal: Repository<ActividadGrupal>,
    private readonly logActividadService: LogActividadService){}

    async crearActividadGrupal(actividadGrupal: crearActividadGrupal, req: any){
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Actividad Grupal',
            actividadGrupal
        );
        const actividadGrupalNuevo = this.repoActividadGrupal.create(actividadGrupal);
        return this.repoActividadGrupal.save(actividadGrupalNuevo);
    }

    async buscarTodo(): Promise<ActividadGrupal[]> {
        return await this.repoActividadGrupal.find({ relations: ['id_actividad','id_estado_informe'] });
    }

    async getActividadGrupalById(id: number): Promise<ActividadGrupal | undefined> {
        return await this.repoActividadGrupal.findOne({ where: { id_actividad_grupal: id }, 
                                                    relations: ['id_actividad','id_estado_informe'] });
    }

    async actualizar(id: number, actualizarActividadGrupal: actualizarActividadGrupal): Promise<ActividadGrupal> {
        const actividadGrupal = await this.repoActividadGrupal.findOne({ where: { id_actividad_grupal: id } });
        if (!actividadGrupal) {
            return null;
        }
        Object.assign(actividadGrupal, actualizarActividadGrupal);
        return await this.repoActividadGrupal.save(actividadGrupal);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoActividadGrupal.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la actividad grupal con ID ${id}`);
        }
    }
}
