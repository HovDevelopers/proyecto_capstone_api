import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { crearNombreCodigo } from '../interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../interfaces/nombreCodigo';
import { Repository } from 'typeorm';

@Injectable()
export class DispositivoService {

    constructor(@InjectRepository(Dispositivo) private repoDispositivo: Repository<Dispositivo>){}

    async crearDispositivo(nombreDispositivo: crearNombreCodigo){
        const DispositivoNueva = this.repoDispositivo.create(nombreDispositivo);
        return await this.repoDispositivo.save(DispositivoNueva);
    }

    async buscarTodo(): Promise<Dispositivo[]> {
        return await this.repoDispositivo.find();
    }

    async getDispositivoById(id: number): Promise<Dispositivo | undefined> {
        return await this.repoDispositivo.findOne({ where: { id_dispositivo: id }});
    }

    async actualizar(id: number, actualizarDispositivo: actualizarNombreCodigo): Promise<Dispositivo> {
        const dispositivo = await this.repoDispositivo.findOne({ where: { id_dispositivo: id } });
        if (!dispositivo) {
            return null;
        }
        Object.assign(dispositivo, actualizarDispositivo);
        return await this.repoDispositivo.save(dispositivo);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoDispositivo.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el dispositivo con ID ${id}`);
        }
    }
}
