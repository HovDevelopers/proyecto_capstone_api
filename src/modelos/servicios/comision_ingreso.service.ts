import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarComisionIngreso } from 'src/modelos/interfaces/comisionIngreso.interface';
import { crearComisionIngreso } from 'src/modelos/interfaces/comisionIngreso.interface';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';
import { PacienteService } from './paciente.service';

@Injectable()
export class ComisionIngresoService {

    constructor(@InjectRepository(ComisionIngreso) private repoComisionIngreso: Repository<ComisionIngreso>,
    private readonly logActividadService: LogActividadService,
    private pacienteService: PacienteService){}

    async crearComisionIngreso(comisionIngreso: crearComisionIngreso, req: any){

        const idPacienteAud = await this.pacienteService.crearVersionPaciente(comisionIngreso.id_paciente, req);
        const comisionIngresoNuevo = this.repoComisionIngreso.create({
            ...comisionIngreso,
            id_paciente_auditoria: idPacienteAud // Asigna el id del paciente auditoría aquí
        });
        
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Comisión Ingreso',
            comisionIngreso
        );

        return await this.repoComisionIngreso.save(comisionIngresoNuevo);

    }

    async buscarTodo(): Promise<ComisionIngreso[]> {
        return await this.repoComisionIngreso.find({ relations: ['id_paciente_auditoria', 'id_dispositivo', 'id_procedencia',
                                                 'id_actividad', 'id_tipo_paciente', 'id_factor', 
                                                 'id_estado_informe', 'id_procedencia_nuevo', 'diagnostico_principal'] });
    }

    async getComisionIngresoById(id: number): Promise<ComisionIngreso | undefined> {
        return await this.repoComisionIngreso.findOne({ where: { id_comision_ingreso: id }, relations: ['id_paciente_auditoria', 
                                                    'id_dispositivo', 'id_procedencia','id_actividad', 'id_tipo_paciente',
                                                    'id_factor', 'id_estado_informe', 'id_procedencia_nuevo', 'diagnostico_principal'] });
    }

    async actualizar(id: number, actualizarComisionIngreso: actualizarComisionIngreso): Promise<ComisionIngreso> {
        const comisionIngreso = await this.repoComisionIngreso.findOne({ where: { id_comision_ingreso: id } });
        if (!comisionIngreso) {
            return null;
        }
        Object.assign(comisionIngreso, actualizarComisionIngreso);
        return await this.repoComisionIngreso.save(comisionIngreso);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoComisionIngreso.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la Comision Ingreso con ID ${id}`);
        }
    }
}
