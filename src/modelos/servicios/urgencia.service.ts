import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarUrgencia } from 'src/modelos/interfaces/Urgencia';
import { crearUrgencia } from 'src/modelos/interfaces/Urgencia';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrgenciaService {

    constructor(@InjectRepository(Urgencia) private repoUrgencia: Repository<Urgencia>){}

    crearUrgencia(urgencia: crearUrgencia){
        const urgenciaNuevo = this.repoUrgencia.create(urgencia);
        return this.repoUrgencia.save(urgenciaNuevo);
    }

    async buscarTodo(): Promise<Urgencia[]> {
        return await this.repoUrgencia.find({ relations: ['id_paciente', 'id_dispositivo', 'id_procedencia',
                                            'id_actividad', 'id_tipo_paciente', 'id_procedimiento', 
                                            'id_factor', 'id_test', 'id_estado_informe'] });
    }

    async getUrgenciaById(id: number): Promise<Urgencia | undefined> {
        return await this.repoUrgencia.findOne({ where: { id_urgencia: id }, relations: ['id_paciente', 
                                                'id_dispositivo', 'id_procedencia','id_actividad',
                                                'id_tipo_paciente', 'id_procedimiento', 
                                                'id_factor', 'id_test', 'id_estado_informe'] });
    }

    async actualizar(id: number, actualizarUrgencia: actualizarUrgencia): Promise<Urgencia> {
        const urgencia = await this.repoUrgencia.findOne({ where: { id_urgencia: id } });
        if (!urgencia) {
            return null;
        }
        Object.assign(urgencia, actualizarUrgencia);
        return await this.repoUrgencia.save(urgencia);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoUrgencia.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la Urgencia con ID ${id}`);
        }
    }
}
