import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FactoresService } from '../modelos/servicios/factores.service';
import { Factores } from 'src/modelos/clases/factores.entity';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Factores')
@Controller('factores')
export class FactoresController {

    constructor(private readonly factoresService: FactoresService) {}

    @Post()
    async crearFactores(@Body() crearFactoresDto: crearNombreCodigo): Promise<Factores> {
        return await this.factoresService.crearFactores(crearFactoresDto);
    }

    @Get()
    async buscarTodo(): Promise<Factores[]> {
        return await this.factoresService.buscarTodo();
    }

    @Get(':id')
    async getFactoresById(@Param('id') id: number): Promise<Factores | undefined> {
        return await this.factoresService.getFactoresById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarFactoresDto: actualizarNombreCodigo): Promise<Factores> {
        return await this.factoresService.actualizar(id, actualizarFactoresDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.factoresService.eliminar(id);
    }
}
