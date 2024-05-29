import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarInformeDiario } from 'src/modelos/interfaces/informeDiario';
import { crearInformeDiario } from 'src/modelos/interfaces/informeDiario';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformeDiarioService {

    constructor(@InjectRepository(InformeDiario) private repoInformeDiario: Repository<InformeDiario>){}

    crearInformeDiario(informeDiario: crearInformeDiario){
        const informeDiarioNuevo = this.repoInformeDiario.create(informeDiario);
        return this.repoInformeDiario.save(informeDiarioNuevo);
    }

    async buscarTodo(): Promise<InformeDiario[]> {
        return await this.repoInformeDiario.find({ relations: ['id_paciente', 'id_dispositivo', 'id_procedencia',
                                                 'id_actividad', 'id_tipo_paciente', 'id_visita_salud_mental', 
                                                 'id_procedimiento', 'id_factor', 'id_test', 'id_estado_informe'] });
    }

    async getInformeDiarioById(id: number): Promise<InformeDiario | undefined> {
        return await this.repoInformeDiario.findOne({ where: { id_informe_diario: id }, relations: ['id_paciente', 
                                                    'id_dispositivo', 'id_procedencia','id_actividad', 
                                                    'id_tipo_paciente', 'id_visita_salud_mental', 
                                                    'id_procedimiento', 'id_factor', 'id_test', 'id_estado_informe'] });
    }

    async actualizar(id: number, actualizarInformeDiario: actualizarInformeDiario): Promise<InformeDiario> {
        const informeDiario = await this.repoInformeDiario.findOne({ where: { id_informe_diario: id } });
        if (!informeDiario) {
            return null;
        }
        Object.assign(informeDiario, actualizarInformeDiario);
        return await this.repoInformeDiario.save(informeDiario);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoInformeDiario.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el InformeDiario con ID ${id}`);
        }
    }
}
