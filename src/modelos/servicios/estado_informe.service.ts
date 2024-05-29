import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearNombre } from '../interfaces/nombre';
import { actualizarNombre } from '../interfaces/nombre';
import { EstadoInforme } from 'src/modelos/clases/estado_informe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoInformeService {

    constructor(@InjectRepository(EstadoInforme) private repoEstadoInforme: Repository<EstadoInforme>){}

    async crearEstadoInforme(nombreEstadoInforme: crearNombre){
        const EstadoInformeNuevo = this.repoEstadoInforme.create(nombreEstadoInforme);
        return await this.repoEstadoInforme.save(EstadoInformeNuevo);
    }

    async buscarTodo(): Promise<EstadoInforme[]> {
        return await this.repoEstadoInforme.find();
    }

    async getEstadoInformeById(id: number): Promise<EstadoInforme | undefined> {
        return await this.repoEstadoInforme.findOne({ where: { id_estado_informe: id }});
    }

    async actualizar(id: number, actualizarEstadoInforme: actualizarNombre): Promise<EstadoInforme> {
        const estadoInforme = await this.repoEstadoInforme.findOne({ where: { id_estado_informe: id } });
        if (!estadoInforme) {
            return null;
        }
        Object.assign(estadoInforme, actualizarEstadoInforme);
        return await this.repoEstadoInforme.save(estadoInforme);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoEstadoInforme.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el Estado de Informe con ID ${id}`);
        }
    }
}
