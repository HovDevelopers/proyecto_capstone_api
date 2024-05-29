import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearComisionIngresoDiagnostico } from '../interfaces/ComisionIngresoDiagnostico';
import { actualizarComisionIngresoDiagnostico } from '../interfaces/ComisionIngresoDiagnostico';
import { ComisionIngresoDiagnostico } from 'src/modelos/clases/comision_ingreso_Diagnostico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComisionIngresoDiagnosticoService {

    constructor(@InjectRepository(ComisionIngresoDiagnostico) private repoComisionIngresoDiagnostico: Repository<ComisionIngresoDiagnostico>){}

    crearComisionIngresoDiagnostico(comisionIngresoDiagnostico: crearComisionIngresoDiagnostico){
        const comisionIngresoDiagnosticoNuevo = this.repoComisionIngresoDiagnostico.create(comisionIngresoDiagnostico);
        return this.repoComisionIngresoDiagnostico.save(comisionIngresoDiagnosticoNuevo);
    }

    async buscarTodo(): Promise<ComisionIngresoDiagnostico[]> {
        return await this.repoComisionIngresoDiagnostico.find({ relations: ['id_comision_ingreso', 'diagnostico'] });
    }

    async getComisionIngresoDiagnosticoById(id: number): Promise<ComisionIngresoDiagnostico | undefined> {
        return await this.repoComisionIngresoDiagnostico.findOne({ where: { id_comision_diagnostico: id }, 
                                                                relations: ['id_comision_ingreso', 'diagnostico'] });
    }

    async actualizar(id: number, actualizarComisionIngresoDiagnostico: actualizarComisionIngresoDiagnostico): Promise<ComisionIngresoDiagnostico> {
        const comisionIngresoDiagnostico = await this.repoComisionIngresoDiagnostico.findOne({ where: { id_comision_diagnostico: id } });
        if (!comisionIngresoDiagnostico) {
            return null;
        }
        Object.assign(comisionIngresoDiagnostico, actualizarComisionIngresoDiagnostico);
        return await this.repoComisionIngresoDiagnostico.save(comisionIngresoDiagnostico);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoComisionIngresoDiagnostico.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la comision ingreso diagnostico con ID ${id}`);
        }
    }
}
