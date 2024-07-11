import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TestService } from '../modelos/servicios/test.service';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { Test } from 'src/modelos/clases/test.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller('test')
export class TestController {

    constructor(private readonly testService: TestService) {}

    @Post()
    async crearTest(@Body() crearTest: nombre): Promise<Test> {
        return await this.testService.crearTest(crearTest);
    }

    @Get()
    async buscarTodo(): Promise<Test[]> {
        return await this.testService.buscarTodo();
    }

    @Get(':id')
    async getTestById(@Param('id') id: number): Promise<Test | undefined> {
        return await this.testService.getTestById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarTest: nombre): Promise<Test> {
        return await this.testService.actualizar(id, actualizarTest);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.testService.eliminar(id);
    }
}
