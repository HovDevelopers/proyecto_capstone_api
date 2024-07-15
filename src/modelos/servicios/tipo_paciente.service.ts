import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoPacienteService {

    constructor(@InjectRepository(TipoPaciente) private repoTipoPaciente: Repository<TipoPaciente>){}

    async crearTipoPaciente(nombreTipoPaciente: nombre){
        const TipoPacienteNueva = this.repoTipoPaciente.create(nombreTipoPaciente);
        return await this.repoTipoPaciente.save(TipoPacienteNueva);
    }

    async buscarTodo(): Promise<TipoPaciente[]> {
        return await this.repoTipoPaciente.find();
    }

    async getTipoPacienteById(id: number): Promise<TipoPaciente | undefined> {
        return await this.repoTipoPaciente.findOne({ where: { id_tipo_paciente: id }});
    }

    async actualizar(id: number, actualizarTipoPaciente: nombre): Promise<TipoPaciente> {
        const tipoPaciente = await this.repoTipoPaciente.findOne({ where: { id_tipo_paciente: id } });
        if (!tipoPaciente) {
            return null;
        }
        Object.assign(tipoPaciente, actualizarTipoPaciente);
        return await this.repoTipoPaciente.save(tipoPaciente);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoTipoPaciente.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el tipo de paciente con ID ${id}`);
        }
    }
}
