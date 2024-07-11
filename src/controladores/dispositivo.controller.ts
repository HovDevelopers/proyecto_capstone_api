import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { DispositivoService } from '../modelos/servicios/dispositivo.service';
import { Dispositivo } from 'src/modelos/clases/dispositivo.entity';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dispositivo')
@Controller('dispositivo')
export class DispositivoController {
    constructor(private readonly dispositivoService: DispositivoService) {}

    @Post()
    async crearDispositivo(@Body() crearDispositivo: nombre): Promise<Dispositivo> {
        return this.dispositivoService.crearDispositivo(crearDispositivo);
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
    async actualizar(@Param('id') id: number, @Body() actualizarDispositivo: nombre): Promise<Dispositivo> {
        return this.dispositivoService.actualizar(id, actualizarDispositivo);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.dispositivoService.eliminar(id);
    }
}
