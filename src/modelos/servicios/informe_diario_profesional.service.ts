import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearInformeDiarioProfesional } from '../interfaces/informeDiarioProfesional.interface';
import { actualizarInformeDiarioProfesional } from '../interfaces/informeDiarioProfesional.interface';
import { InformeDiarioProfesional } from 'src/modelos/clases/informe_diario_profesional.entity';
import { Repository } from 'typeorm';
import { InformeDiario } from '../clases/informe_diario.entity';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class InformeDiarioProfesionalService {

    constructor(@InjectRepository(InformeDiarioProfesional) 
    private repoInformeDiarioProfesional: Repository<InformeDiarioProfesional>,
    private readonly logActividadService: LogActividadService){}

    async crearInformeDiarioProfesional(informeDiarioProfesional: crearInformeDiarioProfesional, req: any){
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Informe Diario Profesional',
            informeDiarioProfesional
        );

        const informeDiarioProfesionalNuevo = this.repoInformeDiarioProfesional.create(informeDiarioProfesional);
        return this.repoInformeDiarioProfesional.save(informeDiarioProfesionalNuevo);
    }

    async buscarTodo(): Promise<InformeDiarioProfesional[]> {
        return await this.repoInformeDiarioProfesional.find({ 
            relations: ['id_informe_diario',
            'id_informe_diario.id_paciente_auditoria',
            'id_informe_diario.id_dispositivo',
            'id_informe_diario.id_procedencia',
            'id_informe_diario.id_actividad',
            'id_informe_diario.id_tipo_paciente',
            'id_informe_diario.id_visita_salud_mental',
            'id_informe_diario.id_procedimiento',
            'id_informe_diario.id_factor',
            'id_informe_diario.id_test',
            'id_informe_diario.diagnostico_principal',
            'profesional', 
            'profesional.id_especialidad'],
        });
    }

    async obtenerInformesPorProfesional(id: number): Promise<InformeDiario[] | undefined> {
        const informes =  await this.repoInformeDiarioProfesional.find({
            where: { profesional: { id_profesional: id } },
            relations: ['id_informe_diario',
                'id_informe_diario.id_paciente_auditoria',
                'id_informe_diario.id_dispositivo',
                'id_informe_diario.id_procedencia',
                'id_informe_diario.id_actividad',
                'id_informe_diario.id_dispositivo',
                'id_informe_diario.id_tipo_paciente',
                'id_informe_diario.id_visita_salud_mental',
                'id_informe_diario.id_procedimiento',
                'id_informe_diario.id_factor',
                'id_informe_diario.id_test',
                'id_informe_diario.diagnostico_principal'],
        });

        // Transformar los datos para devolver solo id_informe_diario
        return informes.map(informe => informe.id_informe_diario);
    }     
    
    async getInformeDiarioProfesionalById(id: number): Promise<InformeDiarioProfesional | undefined> {
        return await this.repoInformeDiarioProfesional.findOne({ where: { id_informe_profesional: id }, 
            relations: ['id_informe_diario',
            'id_informe_diario.id_paciente_auditoria',
            'id_informe_diario.id_dispositivo',
            'id_informe_diario.id_procedencia',
            'id_informe_diario.id_actividad',
            'id_informe_diario.id_tipo_paciente',
            'id_informe_diario.id_visita_salud_mental',
            'id_informe_diario.id_procedimiento',
            'id_informe_diario.id_factor',
            'id_informe_diario.id_test',
            'id_informe_diario.diagnostico_principal',
            'profesional', 
            'profesional.id_especialidad']});
    }

    async actualizar(id: number, actualizarInformeDiarioProfesional: actualizarInformeDiarioProfesional): Promise<InformeDiarioProfesional> {
        const informeDiarioProfesional = await this.repoInformeDiarioProfesional.findOne({ where: { id_informe_profesional: id } });
        if (!informeDiarioProfesional) {
            return null;
        }
        Object.assign(informeDiarioProfesional, actualizarInformeDiarioProfesional);
        return await this.repoInformeDiarioProfesional.save(informeDiarioProfesional);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoInformeDiarioProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el informe diario profesional con ID ${id}`);
        }
    }
}
