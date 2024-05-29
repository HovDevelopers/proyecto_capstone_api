import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarInformeDiarioDiagnostico } from '../interfaces/informeDiarioDiagnostico';
import { crearInformeDiarioDiagnostico } from '../interfaces/informeDiarioDiagnostico';
import { InformeDiarioDiagnostico } from 'src/modelos/clases/informe_diario_diagnostico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformeDiarioDiagnosticoService {

    constructor(@InjectRepository(InformeDiarioDiagnostico) private repoInformeDiarioDiagnostico: Repository<InformeDiarioDiagnostico>){}

    crearInformeDiarioDiagnostico(informeDiarioDiagnostico: crearInformeDiarioDiagnostico){
        const InformeDiarioDiagnosticoNuevo = this.repoInformeDiarioDiagnostico.create(informeDiarioDiagnostico);
        return this.repoInformeDiarioDiagnostico.save(InformeDiarioDiagnosticoNuevo);
    }

    async buscarTodo(): Promise<InformeDiarioDiagnostico[]> {
        return await this.repoInformeDiarioDiagnostico.find({ relations: ['id_informe_diario', 'diagnostico'] });
    }

    async getInformeDiarioDiagnosticoById(id: number): Promise<InformeDiarioDiagnostico | undefined> {
        return await this.repoInformeDiarioDiagnostico.findOne({ where: { id_informe_diagnostico: id }, relations: ['id_informe_diario', 'diagnostico'] });
    }

    async actualizar(id: number, actualizarInformeDiarioDiagnostico: actualizarInformeDiarioDiagnostico): Promise<InformeDiarioDiagnostico> {
        const informeDiarioDiagnostico = await this.repoInformeDiarioDiagnostico.findOne({ where: { id_informe_diagnostico: id } });
        if (!informeDiarioDiagnostico) {
            return null;
        }
        Object.assign(informeDiarioDiagnostico, actualizarInformeDiarioDiagnostico);
        return await this.repoInformeDiarioDiagnostico.save(informeDiarioDiagnostico);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoInformeDiarioDiagnostico.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el informe diario diagnostico con ID ${id}`);
        }
    }
}
