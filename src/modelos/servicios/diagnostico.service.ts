import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';
import { actualizarDiagnostico } from '../interfaces/diagnostico.interface';
import { crearDiagnostico } from '../interfaces/diagnostico.interface';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticoService {

    constructor(@InjectRepository(Diagnostico) private repoDiagnostico: Repository<Diagnostico>){}

    async crearDiagnostico(nombreDiagnostico: crearDiagnostico){
        const DiagnosticoNueva = this.repoDiagnostico.create(nombreDiagnostico);
        return await this.repoDiagnostico.save(DiagnosticoNueva);
    }

    async buscarTodo(): Promise<Diagnostico[]> {
        return await this.repoDiagnostico.find();
    }

    async getDiagnosticoById(id: number): Promise<Diagnostico | undefined> {
        return await this.repoDiagnostico.findOne({ where: { id_diagnostico: id }});
    }

    async actualizar(id: number, actualizarDiagnostico: actualizarDiagnostico): Promise<Diagnostico> {
        const diagnostico = await this.repoDiagnostico.findOne({ where: { id_diagnostico: id } });
        if (!diagnostico) {
            return null;
        }
        Object.assign(diagnostico, actualizarDiagnostico);
        return await this.repoDiagnostico.save(diagnostico);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoDiagnostico.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el diagnostico con ID ${id}`);
        }
    }
}
