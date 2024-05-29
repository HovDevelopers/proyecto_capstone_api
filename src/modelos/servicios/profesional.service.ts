import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { Repository } from 'typeorm';
import { crearProfesional } from '../interfaces/profesional';
import { actualizarProfesional } from '../interfaces/profesional';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfesionalService {

    constructor(@InjectRepository(Profesional) private repoProfesional: Repository<Profesional>,
    private readonly jwtService: JwtService){}

    async crearUsuario(profesional: crearProfesional){
        const profesionalNuevo = this.repoProfesional.create(profesional);
        return await this.repoProfesional.save(profesionalNuevo);
    }

    async buscarTodo(): Promise<Profesional[]> {
        return await this.repoProfesional.find({ relations: ['id_especialidad'] });
    }

    async getProfesionalNombre(token: string): Promise<Profesional | undefined> {// devuelve el profesional para sacar el nombre en la sesion
        try {
            const decoded = this.jwtService.verify(token)
            const {id_profesional} = decoded;
            return await this.getProfesionalById(id_profesional);
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
        
    }

    async getProfesionalById(id: number): Promise<Profesional | undefined> {
        return this.repoProfesional.findOne({ where: { id_profesional: id }, relations: ['id_especialidad'] });
    }

    async getProfesionalByRut(rut: string): Promise<Profesional | undefined> {
        return await this.repoProfesional.findOne({ where: { rut_profesional: rut }, relations: ['id_especialidad'] });
    }

    async actualizar(id: number, actualizarProfesional: actualizarProfesional): Promise<Profesional> {
        const profesional = await this.repoProfesional.findOne({ where: { id_profesional: id } });
        if (!profesional) {
            return null;
        }
        Object.assign(profesional, actualizarProfesional);
        return await this.repoProfesional.save(profesional);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoProfesional.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el profesional con ID ${id}`);
        }
    }

}
