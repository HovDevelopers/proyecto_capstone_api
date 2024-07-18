import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { crearDispositivo } from '../interfaces/dispositivo.interface';
import { actualizarDispositivo } from '../interfaces/dispositivo.interface';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';


@Injectable()
export class DispositivoService {

    constructor(@InjectRepository(Dispositivo) private repoDispositivo: Repository<Dispositivo>,
    private readonly logActividadService: LogActividadService){}

    async crearDispositivo(nombreDispositivo: crearDispositivo, req: any){
        const DispositivoNueva = this.repoDispositivo.create(nombreDispositivo);
        const dispositivoNuevo = await this.repoDispositivo.save(DispositivoNueva);

        await this.logActividadService.insertarActividad(
            req,
            'Inserción Dispositivo',
            nombreDispositivo
        );

        return dispositivoNuevo;
    }

    async buscarTodo(): Promise<Dispositivo[]> {
        return await this.repoDispositivo.find();
    }

    async getDispositivoById(id: number): Promise<Dispositivo | undefined> {
        return await this.repoDispositivo.findOne({ where: { id_dispositivo: id }});
    }

    async actualizar(id: number, actualizarDispositivo: actualizarDispositivo, req: any): Promise<Dispositivo> {
        const dispositivo = await this.repoDispositivo.findOne({ where: { id_dispositivo: id } });
        if (!dispositivo) {
            return null;
        }

        // Clonar el objeto usuario para guardar la información antigua
        const dispositivoAUX = JSON.parse(JSON.stringify(dispositivo)); 

        Object.assign(dispositivo, actualizarDispositivo);
        const dispositivoAct = await this.repoDispositivo.save(dispositivo);

        await this.logActividadService.modificarActividad(
            req,
            'Actualización Dispositivo',
            dispositivoAUX,
            actualizarDispositivo
        );

        return dispositivoAct;
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoDispositivo.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el dispositivo con ID ${id}`);
        }
    }
}
