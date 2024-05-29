import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { UrgenciaService } from '../modelos/servicios/urgencia.service';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { crearUrgencia } from '../modelos/interfaces/Urgencia';
import { actualizarUrgencia } from '../modelos/interfaces/Urgencia';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Urgencia')
@Controller('urgencia')
export class UrgenciaController {
    constructor(private readonly urgenciaService: UrgenciaService) {}

    @Post()
    async crearUrgencia(@Body() urgencia: crearUrgencia): Promise<Urgencia> {
        return await this.urgenciaService.crearUrgencia(urgencia);
    }

    @Get()
    async buscarTodo(): Promise<Urgencia[]> {
        return await this.urgenciaService.buscarTodo();
    }

    @Get(':id')
    async getUrgenciaById(@Param('id') id: number): Promise<Urgencia> {
        return await this.urgenciaService.getUrgenciaById(id);
    }

    @Patch(':id')
    async actualizarUrgencia(@Param('id') id: number, @Body() actualizarUrgencia: actualizarUrgencia): Promise<Urgencia> {
        return await this.urgenciaService.actualizar(id, actualizarUrgencia);
    }

    @Delete(':id')
    async eliminarUrgencia(@Param('id') id: number): Promise<void> {
        await this.urgenciaService.eliminar(id);
    }
}
