import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedenciaConsultaService {

    constructor(@InjectRepository(ProcedenciaConsulta) private repoProcedenciaConsulta: Repository<ProcedenciaConsulta>){}

    async crearProcedenciaConsulta(nombreProcedenciaConsulta: nombre){
        const ProcedenciaConsultaNueva = this.repoProcedenciaConsulta.create(nombreProcedenciaConsulta);
        return await this.repoProcedenciaConsulta.save(ProcedenciaConsultaNueva);
    }

    async buscarTodo(): Promise<ProcedenciaConsulta[]> {
        return await this.repoProcedenciaConsulta.find();
    }

    async getProcedenciaConsultaById(id: number): Promise<ProcedenciaConsulta | undefined> {
        return await this.repoProcedenciaConsulta.findOne({ where: { id_procedencia_consulta: id }});
    }

    async actualizar(id: number, actualizarProcedenciaConsulta: nombre): Promise<ProcedenciaConsulta> {
        const procedenciaConsulta = await this.repoProcedenciaConsulta.findOne({ where: { id_procedencia_consulta: id } });
        if (!procedenciaConsulta) {
            return null;
        }
        Object.assign(procedenciaConsulta, actualizarProcedenciaConsulta);
        return await this.repoProcedenciaConsulta.save(procedenciaConsulta);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoProcedenciaConsulta.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la procedencia consulta con ID ${id}`);
        }
    }
}
