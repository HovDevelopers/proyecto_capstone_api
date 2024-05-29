import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarUrgenciaDiagnostico } from '../interfaces/UrgenciaDiagnostico';
import { crearUrgenciaDiagnostico } from '../interfaces/UrgenciaDiagnostico';
import { UrgenciaDiagnostico } from 'src/modelos/clases/urgencia_diagnostico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrgenciaDiagnosticoService {

    constructor(@InjectRepository(UrgenciaDiagnostico) private repoUrgenciaDiagnostico: Repository<UrgenciaDiagnostico>){}

    crearUrgenciaDiagnostico(urgenciaDiagnostico: crearUrgenciaDiagnostico){
        const UrgenciaDiagnosticoNuevo = this.repoUrgenciaDiagnostico.create(urgenciaDiagnostico);
        return this.repoUrgenciaDiagnostico.save(UrgenciaDiagnosticoNuevo);
    }

    async buscarTodo(): Promise<UrgenciaDiagnostico[]> {
        return await this.repoUrgenciaDiagnostico.find({ relations: ['id_urgencia', 'diagnostico'] });
    }

    async getUrgenciaDiagnosticoById(id: number): Promise<UrgenciaDiagnostico | undefined> {
        return await this.repoUrgenciaDiagnostico.findOne({ where: { id_urgencia_diagnostico: id }, relations: ['id_urgencia', 'diagnostico'] });
    }

    async actualizar(id: number, actualizarUrgenciaDiagnostico: actualizarUrgenciaDiagnostico): Promise<UrgenciaDiagnostico> {
        const urgenciaDiagnostico = await this.repoUrgenciaDiagnostico.findOne({ where: { id_urgencia_diagnostico: id } });
        if (!urgenciaDiagnostico) {
            return null;
        }
        Object.assign(urgenciaDiagnostico, actualizarUrgenciaDiagnostico);
        return await this.repoUrgenciaDiagnostico.save(urgenciaDiagnostico);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoUrgenciaDiagnostico.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la urgencia diagnostico con ID ${id}`);
        }
    }
}
