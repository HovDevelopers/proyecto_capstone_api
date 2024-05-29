import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearComisionIngresoProfesional } from '../interfaces/ComisionIngresoProfesional';
import { actualizarComisionIngresoProfesional } from '../interfaces/ComisionIngresoProfesional';
import { ComisionIngresoProfesional } from 'src/modelos/clases/comision_ingreso_profesional.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComisionIngresoProfesionalService {

    constructor(@InjectRepository(ComisionIngresoProfesional) private repoComisionIngresoProfesional: Repository<ComisionIngresoProfesional>){}

    crearComisionIngresoProfesional(comisionIngresoProfesional: crearComisionIngresoProfesional){
        const comisionIngresoProfesionalNuevo = this.repoComisionIngresoProfesional.create(comisionIngresoProfesional);
        return this.repoComisionIngresoProfesional.save(comisionIngresoProfesionalNuevo);
    }

    async buscarTodo(): Promise<ComisionIngresoProfesional[]> {
        return await this.repoComisionIngresoProfesional.find({ 
            relations: ['id_comision_ingreso',
            'id_comision_ingreso.id_paciente',
            'id_comision_ingreso.id_dispositivo',
            'id_comision_ingreso.id_procedencia',
            'id_comision_ingreso.id_procedencia_nuevo',
            'id_comision_ingreso.id_actividad',
            'id_comision_ingreso.id_tipo_paciente',
            'id_comision_ingreso.id_factor',
            'profesional', 
            'profesional.id_especialidad'],
         });
    }

    async obtenerInformesPorProfesional(id: number): Promise<ComisionIngresoProfesional[] | undefined> {
        return await this.repoComisionIngresoProfesional.find({
          where: { profesional: { id_profesional: id } },
          relations: ['id_comision_ingreso',
            'id_comision_ingreso.id_paciente',
            'id_comision_ingreso.id_dispositivo',
            'id_comision_ingreso.id_procedencia',
            'id_comision_ingreso.id_procedencia_nuevo',
            'id_comision_ingreso.id_actividad',
            'id_comision_ingreso.id_tipo_paciente',
            'id_comision_ingreso.id_factor',
            'profesional', 
            'profesional.id_especialidad'],
        });
  }

    async getComisionIngresoProfesionalById(id: number): Promise<ComisionIngresoProfesional | undefined> {
        return await this.repoComisionIngresoProfesional.findOne({ where: { id_comision_profesional: id }, 
            relations: ['id_comision_ingreso',
            'id_comision_ingreso.id_paciente',
            'id_comision_ingreso.id_dispositivo',
            'id_comision_ingreso.id_procedencia',
            'id_comision_ingreso.id_procedencia_nuevo',
            'id_comision_ingreso.id_actividad',
            'id_comision_ingreso.id_tipo_paciente',
            'id_comision_ingreso.id_factor',
            'profesional', 
            'profesional.id_especialidad'], });
    }

    async actualizar(id: number, actualizarComisionIngresoProfesional: actualizarComisionIngresoProfesional): Promise<ComisionIngresoProfesional> {
        const comisionIngresoProfesional = await this.repoComisionIngresoProfesional.findOne({ where: { id_comision_profesional: id } });
        if (!comisionIngresoProfesional) {
            return null;
        }
        Object.assign(comisionIngresoProfesional, actualizarComisionIngresoProfesional);
        return await this.repoComisionIngresoProfesional.save(comisionIngresoProfesional);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoComisionIngresoProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la comision ingreso profesional con ID ${id}`);
        }
    }
}
