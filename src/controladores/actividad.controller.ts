import { Body, Controller, Param, Patch, Post, Get, Delete } from '@nestjs/common';
import { ActividadService } from '../modelos/servicios/actividad.service';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Actividad')
@Controller('actividad')
export class ActividadController {

    constructor(private readonly actividadService: ActividadService) {}

    @Post()
    async crearActividad(@Body() crearActividad: nombre): Promise<Actividad> {
        return await this.actividadService.crearActividad(crearActividad);
    }

    @Get()
    async buscarTodo(): Promise<Actividad[]> {
        return await this.actividadService.buscarTodo();
    }

    @Get(':id')
    async getActividadById(@Param('id') id: number): Promise<Actividad | undefined> {
        return await this.actividadService.getActividadById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarActividad: nombre): Promise<Actividad> {
        return await this.actividadService.actualizar(id, actualizarActividad);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.actividadService.eliminar(id);
    }
}
