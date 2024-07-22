import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearPacientesActividadGrupal } from '../interfaces/pacientesActividadGrupal.interface';
import { actualizarPacientesActividadGrupal } from '../interfaces/pacientesActividadGrupal.interface';
import { PacientesActividadGrupal } from 'src/modelos/clases/pacientes_actividad_grupal.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';
import { PacienteService } from './paciente.service';

@Injectable()
export class PacientesActividadGrupalService {

    constructor(@InjectRepository(PacientesActividadGrupal) private repoPacientesActividadGrupal: Repository<PacientesActividadGrupal>,
    private readonly logActividadService: LogActividadService,
    private pacienteService: PacienteService){}

    async crearPacientesActividadGrupal(pacientesactividadGrupal: crearPacientesActividadGrupal, req: any){
        
        const idPacienteAud = await this.pacienteService.crearVersionPaciente(pacientesactividadGrupal.paciente, req);
        const pacientesactividadGrupalNuevo = this.repoPacientesActividadGrupal.create({
            ...pacientesactividadGrupal,
            paciente: idPacienteAud // Asigna el id del paciente auditoría aquí
        });

        await this.logActividadService.insertarActividad(
            req,
            'Inserción Pacientes Actividad Grupal',
            pacientesactividadGrupal
        );

        return await this.repoPacientesActividadGrupal.save(pacientesactividadGrupalNuevo);
    }

    async buscarTodo(): Promise<PacientesActividadGrupal[]> {
        return await this.repoPacientesActividadGrupal.find({ 
            relations: ['id_actividad_grupal',
            'id_actividad_grupal.id_actividad',
            'id_actividad_grupal.id_dispositivo',
            'paciente']
         });
    }

    async obtenerInformesPorSesion(id: number): Promise<PacientesActividadGrupal[] | undefined> {
        return await this.repoPacientesActividadGrupal.find({
          where: { id_actividad_grupal: { id_actividad_grupal: id } },
          relations: ['paciente']
        });
    } 

    async getPacientesActividadGrupalById(id: number): Promise<PacientesActividadGrupal | undefined> {
        return await this.repoPacientesActividadGrupal.findOne({ where: { id_paciente_actividad_grupal: id }, 
            relations: ['id_actividad_grupal',
                'paciente']
        });
    }

    async actualizar(id: number, actualizarPacientesActividadGrupal: actualizarPacientesActividadGrupal, req:any): Promise<PacientesActividadGrupal> {
        const pacientesActividadGrupal = await this.repoPacientesActividadGrupal.findOne({ where: { id_paciente_actividad_grupal: id } });
        if (!pacientesActividadGrupal) {
            return null;
        }

        // Clonar el objeto para guardar la información antigua
        const pacientesActividadGrupalAUX = JSON.parse(JSON.stringify(pacientesActividadGrupal));

        Object.assign(pacientesActividadGrupal, actualizarPacientesActividadGrupal);
        const actividadPacGrupalGuardado = await this.repoPacientesActividadGrupal.save(pacientesActividadGrupal);

        await this.logActividadService.modificarActividad(
            req,
            'Actualización Pacientes Actividad Grupal',
            pacientesActividadGrupalAUX,
            actualizarPacientesActividadGrupal
        );

        return actividadPacGrupalGuardado;
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoPacientesActividadGrupal.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el paciente actividad_grupal con ID ${id}`);
        }
    }
}
