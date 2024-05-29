import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearUrgenciaProfesional } from '../interfaces/UrgenciaProfesional';
import { actualizarUrgenciaProfesional } from '../interfaces/UrgenciaProfesional';
import { UrgenciaProfesional } from 'src/modelos/clases/urgencia_profesional.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrgenciaProfesionalService {

    constructor(@InjectRepository(UrgenciaProfesional) private repoUrgenciaProfesional: Repository<UrgenciaProfesional>){}

    crearUrgenciaProfesional(urgenciaProfesional: crearUrgenciaProfesional){
        const UrgenciaProfesionalNuevo = this.repoUrgenciaProfesional.create(urgenciaProfesional);
        return this.repoUrgenciaProfesional.save(UrgenciaProfesionalNuevo);
    }

    async buscarTodo(): Promise<UrgenciaProfesional[]> {
        return await this.repoUrgenciaProfesional.find({ 
            relations: ['id_urgencia',
            'id_urgencia.id_paciente',
            'id_urgencia.id_procedencia',
            'id_urgencia.id_actividad',
            'id_urgencia.id_tipo_paciente',
            'id_urgencia.id_procedimiento',
            'id_urgencia.id_factor',
            'id_urgencia.id_test',
            'profesional', 
            'profesional.id_especialidad'],
         });
    }

    async obtenerInformesPorProfesional(id: number): Promise<UrgenciaProfesional[] | undefined> {
        return await this.repoUrgenciaProfesional.find({
          where: { profesional: { id_profesional: id } },
          relations: ['id_urgencia',
            'id_urgencia.id_paciente',
            'id_urgencia.id_procedencia',
            'id_urgencia.id_actividad',
            'id_urgencia.id_tipo_paciente',
            'id_urgencia.id_procedimiento',
            'id_urgencia.id_factor',
            'id_urgencia.id_test',
            'profesional', 
            'profesional.id_especialidad'],
        });
    } 

    async getUrgenciaProfesionalById(id: number): Promise<UrgenciaProfesional | undefined> {
        return await this.repoUrgenciaProfesional.findOne({ where: { id_urgencia_profesional: id }, 
            relations: ['id_urgencia',
            'id_urgencia.id_paciente',
            'id_urgencia.id_procedencia',
            'id_urgencia.id_actividad',
            'id_urgencia.id_tipo_paciente',
            'id_urgencia.id_procedimiento',
            'id_urgencia.id_factor',
            'id_urgencia.id_test',
            'profesional', 
            'profesional.id_especialidad'], });
    }

    async actualizar(id: number, actualizarUrgenciaProfesional: actualizarUrgenciaProfesional): Promise<UrgenciaProfesional> {
        const urgenciaProfesional = await this.repoUrgenciaProfesional.findOne({ where: { id_urgencia_profesional: id } });
        if (!urgenciaProfesional) {
            return null;
        }
        Object.assign(urgenciaProfesional, actualizarUrgenciaProfesional);
        return await this.repoUrgenciaProfesional.save(urgenciaProfesional);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoUrgenciaProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la urgencia profesional con ID ${id}`);
        }
    }
}
