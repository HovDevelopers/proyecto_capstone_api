import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TestService } from '../modelos/servicios/test.service';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { Test } from 'src/modelos/clases/test.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller('test')
export class TestController {

    constructor(private readonly testService: TestService) {}

    @Post()
    async crearTest(@Body() crearTestDto: crearNombreCodigo): Promise<Test> {
        return await this.testService.crearTest(crearTestDto);
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
    async actualizar(@Param('id') id: number, @Body() actualizarTestDto: actualizarNombreCodigo): Promise<Test> {
        return await this.testService.actualizar(id, actualizarTestDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.testService.eliminar(id);
    }
}
