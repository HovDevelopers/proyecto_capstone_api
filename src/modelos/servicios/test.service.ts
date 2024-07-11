import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nombre } from '../interfaces/nombre.interface';
import { Test } from 'src/modelos/clases/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {

    constructor(@InjectRepository(Test) private repoTest: Repository<Test>){}

    async crearTest(nombreTest: nombre){
        const TestNueva = this.repoTest.create(nombreTest);
        return await this.repoTest.save(TestNueva);
    }

    async buscarTodo(): Promise<Test[]> {
        return await this.repoTest.find();
    }

    async getTestById(id: number): Promise<Test | undefined> {
        return await this.repoTest.findOne({ where: { id_test: id }});
    }

    async actualizar(id: number, actualizarTest: nombre): Promise<Test> {
        const test = await this.repoTest.findOne({ where: { id_test: id } });
        if (!test) {
            return null;
        }
        Object.assign(test, actualizarTest);
        return await this.repoTest.save(test);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoTest.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el test con ID ${id}`);
        }
    }
}
