import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarPaciente } from '../interfaces/paciente.interface';
import { crearPaciente } from '../interfaces/paciente.interface';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { DeepPartial, Repository } from 'typeorm';
import { PacienteAuditoria } from '../clases/paciente_auditoria.entity';
import { LogActividadService } from './log_actividad.service';

@Injectable()
export class PacienteService {

    constructor(@InjectRepository(Paciente) private repoPaciente: Repository<Paciente>,
    @InjectRepository(PacienteAuditoria)
    private repoPacienteAuditoria: Repository<PacienteAuditoria>,
    private readonly logActividadService: LogActividadService,){}

    async crearPaciente(paciente: crearPaciente, req: any){
        const pacienteNuevo = this.repoPaciente.create(paciente);
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Paciente',
            paciente
        );
        return await this.repoPaciente.save(pacienteNuevo);
    }

    async buscarTodo(): Promise<Paciente[]> {
        return await this.repoPaciente.find();
    }

    async getPacienteAuditoriaByIdPaciente(id: number): Promise<PacienteAuditoria[] | undefined> {
        return await this.repoPacienteAuditoria.createQueryBuilder('pa')
            .innerJoin('pa.id_paciente', 'p', 'p.id_paciente = :id', { id })
            .innerJoin('pa.id_usuario', 'u') // Join con la tabla usuario
            .innerJoinAndSelect('u.id_profesional', 'prof') // Join con la tabla profesional y selecciona todos los campos de profesional
            .addSelect(['p.id_paciente']) // Seleccionar solo id_paciente de la relación paciente
            .addSelect(['u.id_usuario', 'u.id_profesional']) // Seleccionar solo id_usuario e id_profesional de la relación usuario
            .getMany();
    }
    
    
    
    
    
    async getPacienteById(id: number): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { id_paciente: id }});
    }

    async getPacienteByFicha(n_ficha: number): Promise<Paciente | false> {
        const paciente = await this.repoPaciente.findOne({ where: { n_ficha: n_ficha } });
        if (!paciente) {
            return false;
        }
        return paciente;
    }
    

    async getPacienteByRut(rut: string): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { rut : rut}});
    }

    async getPacienteByPasaporte(pasaporte: string): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { pasaporte : pasaporte}});
    }

    async getPaciente(pasaporte: string): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { pasaporte : pasaporte}});
    }

    async crearVersionPaciente(id: number, req: any): Promise<PacienteAuditoria> {
        if (!id) {
            throw new Error('El id del paciente no está definido.');
        }
    
        const paciente = await this.getPacienteById(id);

        // Usar QueryBuilder para buscar el último registro de paciente_auditoria por id_paciente
        const existingPacienteAuditoria = await this.repoPacienteAuditoria.createQueryBuilder('pa')
        .innerJoin('pa.id_paciente', 'p')
        .where('p.id_paciente = :id', { id })
        .orderBy('pa.fecha_modificacion', 'DESC')
        .getOne();
    
        if (existingPacienteAuditoria) {
        // Retornar el último registro si existe
        return existingPacienteAuditoria;
    }   
        // Crear un nuevo registro si no existe uno previo
        const pacienteAuditoria: DeepPartial<PacienteAuditoria> = {
            id_paciente: paciente,  // Asignar el objeto Paciente directamente
            id_usuario: req.user.id_usuario ? req.user.id_usuario : null,
            n_ficha: paciente.n_ficha,
            rut: paciente.rut,
            pasaporte: paciente.pasaporte,
            fecha_nacimiento: paciente.fecha_nacimiento,
            nombres: paciente.nombres,
            nombre_social: paciente.nombre_social,
            apellido_paterno: paciente.apellido_paterno,
            apellido_materno: paciente.apellido_materno,
            prevision: paciente.prevision,
            sexo: paciente.sexo,
            genero: paciente.genero
        };

        const pacienteAud = this.repoPacienteAuditoria.create(pacienteAuditoria);
        const savedPacienteAud = await this.repoPacienteAuditoria.save(pacienteAud);
        await this.logActividadService.insertarActividad(
            req,
            'Inserción Paciente Auditoria',
            pacienteAud
        );
        return savedPacienteAud;
    }
    
    

    async actualizar(id: number, actualizarPaciente: actualizarPaciente, req:any): Promise<Paciente> {
        const paciente = await this.repoPaciente.findOne({ where: { id_paciente: id } });
        if (!paciente) {
            return null;
        }

        // Clonar el objeto paciente para guardar la información antigua
        const pacienteAUX = JSON.parse(JSON.stringify(paciente)); 

        const pacienteAuditoria = new PacienteAuditoria();
        const pacienteReference = new Paciente(); // Crear una referencia del paciente
        pacienteReference.id_paciente = paciente.id_paciente;
        pacienteAuditoria.id_paciente = pacienteReference; // Asignar la referencia al campo de relación
        pacienteAuditoria.id_usuario = req.user.id_usuario ? req.user.id_usuario : null,
        Object.assign(paciente, actualizarPaciente);
        Object.assign(pacienteAuditoria, actualizarPaciente);
        await this.repoPacienteAuditoria.save(pacienteAuditoria);
        const pacienteGuardado = await this.repoPaciente.save(paciente);

        await this.logActividadService.modificarActividad(
            req,
            'Actualización Paciente',
            pacienteAUX,
            actualizarPaciente
        );

        return pacienteGuardado;
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoPaciente.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el Paciente con ID ${id}`);
        }
    }
}
