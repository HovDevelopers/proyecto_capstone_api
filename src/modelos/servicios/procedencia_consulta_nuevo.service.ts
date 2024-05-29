import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearNombreCodigo } from '../interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../interfaces/nombreCodigo';
import { ProcedenciaConsultaNuevo } from 'src/modelos/clases/procedencia_consulta_nuevo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedenciaConsultaNuevoService {

    constructor(@InjectRepository(ProcedenciaConsultaNuevo) private repoProcedenciaConsultaNuevo: Repository<ProcedenciaConsultaNuevo>){}

    async crearProcedenciaConsultaNuevo(nombreProcedenciaConsultaNuevo: crearNombreCodigo){
        const ProcedenciaConsultaNuevoNueva = this.repoProcedenciaConsultaNuevo.create(nombreProcedenciaConsultaNuevo);
        return await this.repoProcedenciaConsultaNuevo.save(ProcedenciaConsultaNuevoNueva);
    }

    async buscarTodo(): Promise<ProcedenciaConsultaNuevo[]> {
        return await this.repoProcedenciaConsultaNuevo.find();
    }

    async getProcedenciaConsultaNuevoById(id: number): Promise<ProcedenciaConsultaNuevo | undefined> {
        return await this.repoProcedenciaConsultaNuevo.findOne({ where: { id_procedencia_nuevo: id }});
    }

    async actualizar(id: number, actualizarProcedenciaConsultaNuevo: actualizarNombreCodigo): Promise<ProcedenciaConsultaNuevo> {
        const procedenciaConsultaNuevo = await this.repoProcedenciaConsultaNuevo.findOne({ where: { id_procedencia_nuevo: id } });
        if (!procedenciaConsultaNuevo) {
            return null;
        }
        Object.assign(procedenciaConsultaNuevo, actualizarProcedenciaConsultaNuevo);
        return await this.repoProcedenciaConsultaNuevo.save(procedenciaConsultaNuevo);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoProcedenciaConsultaNuevo.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la procedencia consulta nuevo con ID ${id}`);
        }
    }
}
