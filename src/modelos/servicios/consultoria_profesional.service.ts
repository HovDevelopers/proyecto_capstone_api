import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearConsultoriaProfesional } from '../interfaces/consultoriaProfesional.interface';
import { actualizarConsultoriaProfesional } from '../interfaces/consultoriaProfesional.interface';
import { ConsultoriaProfesional } from 'src/modelos/clases/consultoria_profesional.entity';
import { Repository } from 'typeorm';
import { Consultoria } from '../clases/consultoria.entity';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class ConsultoriaProfesionalService {

    constructor(@InjectRepository(ConsultoriaProfesional) private repoConsultoriaProfesional: Repository<ConsultoriaProfesional>,
    private readonly logActividadService: LogActividadService){}

    async crearConsultoriaProfesional(consultoriaProfesional: crearConsultoriaProfesional, req: any){
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Consultoria Profesional',
            consultoriaProfesional
        );

        const consultoriaProfesionalNuevo = this.repoConsultoriaProfesional.create(consultoriaProfesional);
        return this.repoConsultoriaProfesional.save(consultoriaProfesionalNuevo);
    }

    async buscarTodo(): Promise<ConsultoriaProfesional[]> {
        return await this.repoConsultoriaProfesional.find({ 
            relations: ['id_consultoria',
            'id_consultoria.id_paciente_auditoria',
            'id_consultoria.id_dispositivo',
            'id_consultoria.diagnostico_principal',
            'profesional', 
            'profesional.id_especialidad'],
         });
    }

    async obtenerInformesPorProfesional(id: number): Promise<Consultoria[] | undefined> {
        const informes = await this.repoConsultoriaProfesional.find({
          where: { profesional: { id_profesional: id } },
          relations: ['id_consultoria',
            'id_consultoria.id_paciente_auditoria',
            'id_consultoria.id_dispositivo',
            'id_consultoria.diagnostico_principal',
            'profesional',
            'profesional.id_especialidad'],
        });

        // Transformar los datos para devolver solo id_consultoria
        return informes.map(informe => informe.id_consultoria);
    } 

    async getConsultoriaProfesionalById(id: number): Promise<ConsultoriaProfesional | undefined> {
        return await this.repoConsultoriaProfesional.findOne({ where: { id_consultoria_profesional: id }, 
            relations: ['id_consultoria',
            'id_consultoria.id_paciente_auditoria',
            'id_consultoria.id_dispositivo',
            'id_consultoria.diagnostico_principal',
            'profesional', 
            'profesional.id_especialidad'], });
    }

    async actualizar(id: number, actualizarConsultoriaProfesional: actualizarConsultoriaProfesional): Promise<ConsultoriaProfesional> {
        const consultoriaProfesional = await this.repoConsultoriaProfesional.findOne({ where: { id_consultoria_profesional: id } });
        if (!consultoriaProfesional) {
            return null;
        }
        Object.assign(consultoriaProfesional, actualizarConsultoriaProfesional);
        return await this.repoConsultoriaProfesional.save(consultoriaProfesional);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoConsultoriaProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la consultoria profesional con ID ${id}`);
        }
    }
}
