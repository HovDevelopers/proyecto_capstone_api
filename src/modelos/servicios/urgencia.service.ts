import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarUrgencia } from '../interfaces/urgencia.interface';
import { crearUrgencia } from '../interfaces/urgencia.interface';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';
import { PacienteService } from './paciente.service';

@Injectable()
export class UrgenciaService {

    constructor(@InjectRepository(Urgencia) private repoUrgencia: Repository<Urgencia>,
    private readonly logActividadService: LogActividadService,
    private pacienteService: PacienteService){}

    async crearUrgencia(urgencia: crearUrgencia, req: any){

        const idPacienteAud = await this.pacienteService.crearVersionPaciente(urgencia.id_paciente, req);
        const urgenciaNuevo = this.repoUrgencia.create({
            ...urgencia,
            id_paciente_auditoria: idPacienteAud // Asigna el id del paciente auditoría aquí
        });

        await this.logActividadService.insertarActividad(
            req,
            'Inserción Urgencia',
            urgencia
        );
        
        return await this.repoUrgencia.save(urgenciaNuevo);
    }

    async buscarTodo(): Promise<Urgencia[]> {
        return await this.repoUrgencia.find({ relations: ['id_paciente_auditoria', 'id_dispositivo', 'id_procedencia',
                                            'id_actividad', 'id_tipo_paciente', 'id_factor', 
                                            'id_estado_informe', 'diagnostico_principal'] });
    }

    async getUrgenciaById(id: number): Promise<Urgencia | undefined> {
        return await this.repoUrgencia.findOne({ where: { id_urgencia: id }, relations: ['id_paciente_auditoria', 
                                                'id_dispositivo', 'id_procedencia', 'id_actividad', 
                                                'id_tipo_paciente', 'id_factor', 'id_estado_informe',
                                                'diagnostico_principal']});
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
