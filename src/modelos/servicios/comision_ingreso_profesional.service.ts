import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearComisionIngresoProfesional } from '../interfaces/comisionIngresoProfesional.interface';
import { actualizarComisionIngresoProfesional } from '../interfaces/comisionIngresoProfesional.interface';
import { ComisionIngresoProfesional } from 'src/modelos/clases/comision_ingreso_profesional.entity';
import { Repository } from 'typeorm';
import { ComisionIngreso } from '../clases/comision_ingreso.entity';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class ComisionIngresoProfesionalService {

    constructor(@InjectRepository(ComisionIngresoProfesional) private repoComisionIngresoProfesional: Repository<ComisionIngresoProfesional>,
    private readonly logActividadService: LogActividadService){}

    async crearComisionIngresoProfesional(comisionIngresoProfesional: crearComisionIngresoProfesional, req:any){
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Comisión Ingreso Profesional',
            comisionIngresoProfesional
        );
        const comisionIngresoProfesionalNuevo = this.repoComisionIngresoProfesional.create(comisionIngresoProfesional);
        return this.repoComisionIngresoProfesional.save(comisionIngresoProfesionalNuevo);
    }

    async buscarTodo(): Promise<ComisionIngresoProfesional[]> {
        return await this.repoComisionIngresoProfesional.find({ 
            relations: ['id_comision_ingreso',
            'id_comision_ingreso.id_paciente_auditoria',
            'id_comision_ingreso.id_dispositivo',
            'id_comision_ingreso.id_procedencia_comision_ingreso',
            'id_comision_ingreso.id_procedencia_nuevo',
            'id_comision_ingreso.id_actividad',
            'id_comision_ingreso.id_tipo_paciente',
            'id_comision_ingreso.id_factor',
            'id_comision_ingreso.diagnostico_principal',
            'profesional', 
            'profesional.id_especialidad'],
         });
    }

    async obtenerInformesPorProfesional(id: number): Promise<ComisionIngreso[] | undefined> {
        const informes = await this.repoComisionIngresoProfesional.find({
          where: { profesional: { id_profesional: id } },
          relations: ['id_comision_ingreso',
            'id_comision_ingreso.id_paciente_auditoria',
            'id_comision_ingreso.id_dispositivo',
            'id_comision_ingreso.id_procedencia_comision_ingreso',
            'id_comision_ingreso.id_procedencia_nuevo',
            'id_comision_ingreso.id_actividad',
            'id_comision_ingreso.id_tipo_paciente',
            'id_comision_ingreso.id_factor',
            'id_comision_ingreso.diagnostico_principal',
            'profesional', 
            'profesional.id_especialidad'],
        });

        // Transformar los datos para devolver solo id_comision_ingreso
        return informes.map(informe => informe.id_comision_ingreso);
  }

    async getComisionIngresoProfesionalById(id: number): Promise<ComisionIngresoProfesional | undefined> {
        return await this.repoComisionIngresoProfesional.findOne({ where: { id_comision_profesional: id }, 
            relations: ['id_comision_ingreso',
            'id_comision_ingreso.id_paciente_auditoria',
            'id_comision_ingreso.id_dispositivo',
            'id_comision_ingreso.id_procedencia_comision_ingreso',
            'id_comision_ingreso.id_procedencia_nuevo',
            'id_comision_ingreso.id_actividad',
            'id_comision_ingreso.id_tipo_paciente',
            'id_comision_ingreso.id_factor',
            'id_comision_ingreso.diagnostico_principal',
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
