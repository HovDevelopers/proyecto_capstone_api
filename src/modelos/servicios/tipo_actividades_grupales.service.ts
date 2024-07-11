import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoActividadesGrupales } from 'src/modelos/clases/tipo_actividades_grupales.entity';
import { nombre } from '../interfaces/nombre.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TipoActividadesGrupalesService {

    constructor(@InjectRepository(TipoActividadesGrupales) private repoTipoActividadesGrupales: Repository<TipoActividadesGrupales>){}

    async crearTipoActividadesGrupales(nombreTipoActividadesGrupales: nombre){
        const tipoActividadesGrupalesNueva = this.repoTipoActividadesGrupales.create(nombreTipoActividadesGrupales);
        return await this.repoTipoActividadesGrupales.save(tipoActividadesGrupalesNueva);
    }

    async buscarTodo(): Promise<TipoActividadesGrupales[]> {
        return await this.repoTipoActividadesGrupales.find();
    }

    async getTipoActividadesGrupalesById(id: number): Promise<TipoActividadesGrupales | undefined> {
        return await this.repoTipoActividadesGrupales.findOne({ where: { id_tipo_actividades_grupales: id }});
    }

    async actualizar(id: number, actualizarTipoActividadesGrupales: nombre): Promise<TipoActividadesGrupales> {
        const tipoActividadesGrupales = await this.repoTipoActividadesGrupales.findOne({ where: { id_tipo_actividades_grupales: id } });
        if (!tipoActividadesGrupales) {
            return null;
        }
        Object.assign(tipoActividadesGrupales, actualizarTipoActividadesGrupales);
        return await this.repoTipoActividadesGrupales.save(tipoActividadesGrupales);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoTipoActividadesGrupales.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la TipoActividadesGrupales con ID ${id}`);
        }
    }
}
