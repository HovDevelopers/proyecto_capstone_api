import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';
import { UrgenciaService } from '../modelos/servicios/urgencia.service';
import { Urgencia } from 'src/modelos/clases/urgencia.entity';
import { crearUrgencia } from '../modelos/interfaces/urgencia.interface';
import { actualizarUrgencia } from '../modelos/interfaces/urgencia.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Urgencia')
@Controller('urgencia')
export class UrgenciaController {
    constructor(private readonly urgenciaService: UrgenciaService) {}

    @Post()
    async crearUrgencia(@Body() urgencia: crearUrgencia, @Req() req: any): Promise<Urgencia> {
        return await this.urgenciaService.crearUrgencia(urgencia, req);
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
