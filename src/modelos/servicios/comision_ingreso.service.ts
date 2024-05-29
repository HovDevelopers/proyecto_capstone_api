import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarComisionIngreso } from 'src/modelos/interfaces/ComisionIngreso';
import { crearComisionIngreso } from 'src/modelos/interfaces/ComisionIngreso';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComisionIngresoService {

    constructor(@InjectRepository(ComisionIngreso) private repoComisionIngreso: Repository<ComisionIngreso>){}

    crearComisionIngreso(comisionIngreso: crearComisionIngreso){
        const comisionIngresoNuevo = this.repoComisionIngreso.create(comisionIngreso);
        return this.repoComisionIngreso.save(comisionIngresoNuevo);
    }

    async buscarTodo(): Promise<ComisionIngreso[]> {
        return await this.repoComisionIngreso.find({ relations: ['id_paciente', 'id_dispositivo', 'id_procedencia',
                                                 'id_actividad', 'id_tipo_paciente', 'id_factor', 
                                                 'id_estado_informe', 'id_procedencia_nuevo'] });
    }

    async getComisionIngresoById(id: number): Promise<ComisionIngreso | undefined> {
        return await this.repoComisionIngreso.findOne({ where: { id_comision_ingreso: id }, relations: ['id_paciente', 
                                                    'id_dispositivo', 'id_procedencia','id_actividad', 'id_tipo_paciente',
                                                    'id_factor', 'id_estado_informe', 'id_procedencia_nuevo'] });
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
