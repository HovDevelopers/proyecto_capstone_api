import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogAcceso } from 'src/modelos/clases/log_acceso.entity';
import { crearLogAcceso } from '../interfaces/logAcceso.interface';
import { Repository } from 'typeorm';

@Injectable()
export class LogAccesoService {

    constructor(@InjectRepository(LogAcceso) private repoLogAcceso: Repository<LogAcceso>){}

    async crearLogAcceso(nombreLogAcceso: crearLogAcceso){
        const LogAccesoNueva = this.repoLogAcceso.create(nombreLogAcceso);
        return await this.repoLogAcceso.save(LogAccesoNueva);
    }

    async buscarTodo(): Promise<LogAcceso[]> {
        return await this.repoLogAcceso.find();
    }

    async getLogAccesoById(id: number): Promise<LogAcceso | undefined> {
        return await this.repoLogAcceso.findOne({ where: { id_log_acceso: id }});
    }

    async getUltimoAccesoByIdUsuario(id: number): Promise<Date | undefined> {
        const result = await this.repoLogAcceso.createQueryBuilder('log_acceso')
          .select('log_acceso.fecha_registro')
          .where('log_acceso.id_usuario = :id', { id })
          .andWhere('log_acceso.resultado_acceso = :resultado', { resultado: 'ingreso exitoso' })
          .orderBy('log_acceso.fecha_registro', 'DESC')
          .getOne();
    
        return result ? result.fecha_registro : undefined;
      }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoLogAcceso.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el LogAcceso con ID ${id}`);
        }
    }
}
