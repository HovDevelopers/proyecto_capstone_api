import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { Repository } from 'typeorm';
import { crearProfesional } from '../interfaces/profesional.interface';
import { actualizarProfesional } from '../interfaces/profesional.interface';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class ProfesionalService {

    constructor(@InjectRepository(Profesional) private repoProfesional: Repository<Profesional>,
    private readonly logActividadService: LogActividadService){}

    async crearProfesional(profesional: crearProfesional, req: any){
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Profesional',
            profesional
        );

        const profesionalNuevo = this.repoProfesional.create(profesional);
        return await this.repoProfesional.save(profesionalNuevo);
    }

    async crearPrimerProfesional(profesional: crearProfesional){
        const profesionalNuevo = this.repoProfesional.create(profesional);
        return await this.repoProfesional.save(profesionalNuevo);
    }
    

    async buscarTodo(): Promise<Profesional[]> {
        return await this.repoProfesional.find({ relations: ['id_especialidad'] });
    }

    async getProfesionalById(id: number): Promise<Profesional | undefined> {
        return this.repoProfesional.findOne({ where: { id_profesional: id }, relations: ['id_especialidad'] });
    }

    async getProfesionalByRut(rut: string): Promise<Profesional | undefined> {
        return await this.repoProfesional.findOne({ where: { rut_profesional: rut }, relations: ['id_especialidad'] });
    }

    async actualizar(id: number, actualizarProfesional: actualizarProfesional, req:any): Promise<Profesional> {
        const profesional = await this.repoProfesional.findOne({ where: { id_profesional: id } });
        if (!profesional) {
            return null;
        }

        // Clonar el objeto profesional para guardar la información antigua
        const profesionalAUX = JSON.parse(JSON.stringify(profesional)); 

        Object.assign(profesional, actualizarProfesional);
        const profesionalGuardado = await this.repoProfesional.save(profesional);

        await this.logActividadService.modificarActividad(
            req,
            'Actualización Profesional',
            profesionalAUX,
            actualizarProfesional
        );

        return profesionalGuardado;

    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el profesional con ID ${id}`);
        }
    }

}
