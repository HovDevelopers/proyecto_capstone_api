import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarConsultoria } from '../interfaces/consultoria.interface';
import { crearConsultoria } from '../interfaces/consultoria.interface';
import { Consultoria } from 'src/modelos/clases/consultoria.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';
import { PacienteService } from './paciente.service';

@Injectable()
export class ConsultoriaService {

    constructor(@InjectRepository(Consultoria) private repoConsultoria: Repository<Consultoria>,
    private readonly logActividadService: LogActividadService,
    private pacienteService: PacienteService){}

    async crearConsultoria(consultoria: crearConsultoria, req: any){

        const idPacienteAud = await this.pacienteService.crearVersionPaciente(consultoria.id_paciente, req);
        const ConsultoriaNuevo = this.repoConsultoria.create({
            ...consultoria,
            id_paciente_auditoria: idPacienteAud // Asigna el id del paciente auditoría aquí
        });

        await this.logActividadService.insertarActividad(
            req,
            'Inserción Consultoria',
            consultoria
        );
        
        return await this.repoConsultoria.save(ConsultoriaNuevo);
    }

    async buscarTodo(): Promise<Consultoria[]> {
        return await this.repoConsultoria.find({ relations: ['id_paciente_auditoria',
                                                'id_dispositivo', 'id_estado_informe',
                                                'diagnostico_principal'] });
    }

    async getConsultoriaById(id: number): Promise<Consultoria | undefined> {
        return await this.repoConsultoria.findOne({ where: { id_consultoria: id }, relations: ['id_paciente_auditoria',
                                                'id_dispositivo', 'id_estado_informe','diagnostico_principal'] });
    }

    async actualizar(id: number, actualizarConsultoria: actualizarConsultoria): Promise<Consultoria> {
        const consultoria = await this.repoConsultoria.findOne({ where: { id_consultoria: id } });
        if (!consultoria) {
            return null;
        }
        Object.assign(consultoria, actualizarConsultoria);
        return await this.repoConsultoria.save(consultoria);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoConsultoria.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la consultoria con ID ${id}`);
        }
    }
}
