import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitaSaludMentalService {

    constructor(@InjectRepository(VisitaSaludMental) private repoVisitaSaludMental: Repository<VisitaSaludMental>){}

    async crearVisitaSaludMental(nombreVisitaSaludMental: nombre){
        const VisitaSaludMentalNueva = this.repoVisitaSaludMental.create(nombreVisitaSaludMental);
        return await this.repoVisitaSaludMental.save(VisitaSaludMentalNueva);
    }

    async buscarTodo(): Promise<VisitaSaludMental[]> {
        return await this.repoVisitaSaludMental.find();
    }

    async getVisitaSaludMentalById(id: number): Promise<VisitaSaludMental | undefined> {
        return await this.repoVisitaSaludMental.findOne({ where: { id_visita_salud_mental: id }});
    }

    async actualizar(id: number, actualizarVisitaSaludMental: nombre): Promise<VisitaSaludMental> {
        const visitaSaludMental = await this.repoVisitaSaludMental.findOne({ where: { id_visita_salud_mental: id } });
        if (!visitaSaludMental) {
            return null;
        }
        Object.assign(visitaSaludMental, actualizarVisitaSaludMental);
        return await this.repoVisitaSaludMental.save(visitaSaludMental);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoVisitaSaludMental.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró la visita de salud mental con ID ${id}`);
        }
    }
}
