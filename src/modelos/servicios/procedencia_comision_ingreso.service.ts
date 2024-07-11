import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { ProcedenciaComisionIngreso } from 'src/modelos/clases/procedencia_comision_ingreso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedenciaComisionIngresoService {

    constructor(@InjectRepository(ProcedenciaComisionIngreso) private repoProcedenciaComisionIngreso: Repository<ProcedenciaComisionIngreso>){}

    async crearProcedenciaComisionIngreso(nombreProcedenciaComisionIngreso: nombre){
        const ProcedenciaComisionIngresoNueva = this.repoProcedenciaComisionIngreso.create(nombreProcedenciaComisionIngreso);
        return await this.repoProcedenciaComisionIngreso.save(ProcedenciaComisionIngresoNueva);
    }

    async buscarTodo(): Promise<ProcedenciaComisionIngreso[]> {
        return await this.repoProcedenciaComisionIngreso.find();
    }

    async getProcedenciaComisionIngresoById(id: number): Promise<ProcedenciaComisionIngreso | undefined> {
        return await this.repoProcedenciaComisionIngreso.findOne({ where: { id_procedencia_comision_ingreso: id }});
    }

    async actualizar(id: number, actualizarProcedenciaComisionIngreso: nombre): Promise<ProcedenciaComisionIngreso> {
        const procedenciaComisionIngreso = await this.repoProcedenciaComisionIngreso.findOne({ where: { id_procedencia_comision_ingreso: id } });
        if (!procedenciaComisionIngreso) {
            return null;
        }
        Object.assign(procedenciaComisionIngreso, actualizarProcedenciaComisionIngreso);
        return await this.repoProcedenciaComisionIngreso.save(procedenciaComisionIngreso);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoProcedenciaComisionIngreso.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la procedencia comision ingreso con ID ${id}`);
        }
    }
}
