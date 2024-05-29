import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { DispositivoService } from '../modelos/servicios/dispositivo.service';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dispositivo')
@Controller('dispositivo')
export class DispositivoController {
    constructor(private readonly dispositivoService: DispositivoService) {}

    @Post()
    async crearDispositivo(@Body() crearDispositivoDto: crearNombreCodigo): Promise<Dispositivo> {
        return this.dispositivoService.crearDispositivo(crearDispositivoDto);
    }

    @Get()
    async buscarTodo(): Promise<Dispositivo[]> {
        return this.dispositivoService.buscarTodo();
    }

    @Get(':id')
    async getDispositivoById(@Param('id') id: number): Promise<Dispositivo> {
        return this.dispositivoService.getDispositivoById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarDispositivoDto: actualizarNombreCodigo): Promise<Dispositivo> {
        return this.dispositivoService.actualizar(id, actualizarDispositivoDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.dispositivoService.eliminar(id);
    }
}
