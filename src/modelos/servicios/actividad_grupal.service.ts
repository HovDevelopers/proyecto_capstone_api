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
        return await this.repoActividadGrupal.find({ relations: ['id_dispositivo','id_actividad','id_estado_informe'] });
    }

    async getActividadGrupalById(id: number): Promise<ActividadGrupal | undefined> {
        return await this.repoActividadGrupal.findOne({ where: { id_actividad_grupal: id }, 
                                                    relations: ['id_dispositivo','id_actividad','id_estado_informe'] });
    }

    async actualizar(id: number, actualizarActividadGrupal: actualizarActividadGrupal, req:any): Promise<ActividadGrupal> {
        const actividadGrupal = await this.repoActividadGrupal.findOne({ where: { id_actividad_grupal: id } });
        if (!actividadGrupal) {
            return null;
        }

        // Clonar el objeto para guardar la información antigua
        const actividadGrupalAUX = JSON.parse(JSON.stringify(actividadGrupal));

        Object.assign(actividadGrupal, actualizarActividadGrupal);
        const actividadGrupalGuardado = await this.repoActividadGrupal.save(actividadGrupal);

        await this.logActividadService.modificarActividad(
            req,
            'Actualización Actividad Grupal',
            actividadGrupalAUX,
            actualizarActividadGrupal
        );

        return actividadGrupalGuardado;
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoActividadGrupal.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la actividad grupal con ID ${id}`);
        }
    }
}
