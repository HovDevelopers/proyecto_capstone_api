import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarPaciente } from '../interfaces/paciente';
import { crearPaciente } from '../interfaces/paciente';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {

    constructor(@InjectRepository(Paciente) private repoPaciente: Repository<Paciente>){}

    async crearPaciente(paciente: crearPaciente){
        const pacienteNuevo = this.repoPaciente.create(paciente);
        return await this.repoPaciente.save(pacienteNuevo);
    }

    async buscarTodo(): Promise<Paciente[]> {
        return await this.repoPaciente.find();
    }

    async getPacienteById(id: number): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { id_paciente: id }});
    }

    async getPacienteByFicha(n_ficha: number): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { n_ficha: n_ficha }});
    }

    async getPacienteByRut(rut: string): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { rut : rut}});
    }

    async getPacienteByPasaporte(pasaporte: string): Promise<Paciente | undefined> {
        return await this.repoPaciente.findOne({ where: { pasaporte : pasaporte}});
    }

    async actualizar(id: number, actualizarPaciente: actualizarPaciente): Promise<Paciente> {
        const paciente = await this.repoPaciente.findOne({ where: { id_paciente: id } });
        if (!paciente) {
            return null;
        }
        Object.assign(paciente, actualizarPaciente);
        return await this.repoPaciente.save(paciente);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoPaciente.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el Paciente con ID ${id}`);
        }
    }
}
