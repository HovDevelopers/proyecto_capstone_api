import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { crearNombreCodigo } from '../interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../interfaces/nombreCodigo';
import { Factores } from 'src/modelos/clases/factores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FactoresService {

    constructor(@InjectRepository(Factores) private repoFactores: Repository<Factores>){}

    async crearFactores(nombreFactores: crearNombreCodigo){
        const FactoresNueva = this.repoFactores.create(nombreFactores);
        return await this.repoFactores.save(FactoresNueva);
    }

    async buscarTodo(): Promise<Factores[]> {
        return await this.repoFactores.find();
    }

    async getFactoresById(id: number): Promise<Factores | undefined> {
        return await this.repoFactores.findOne({ where: { id_factor: id }});
    }

    async actualizar(id: number, actualizarFactores: actualizarNombreCodigo): Promise<Factores> {
        const factores = await this.repoFactores.findOne({ where: { id_factor: id } });
        if (!factores) {
            return null;
        }
        Object.assign(factores, actualizarFactores);
        return await this.repoFactores.save(factores);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoFactores.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el factor con ID ${id}`);
        }
    }
}
