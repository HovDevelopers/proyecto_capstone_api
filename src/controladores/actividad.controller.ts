import { Body, Controller, Param, Patch, Post, Get, Delete } from '@nestjs/common';
import { ActividadService } from '../modelos/servicios/actividad.service';
import { Actividad } from 'src/modelos/clases/actividad.entity';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Actividad')
@Controller('actividad')
export class ActividadController {

    constructor(private readonly actividadService: ActividadService) {}

    @Post()
    async crearActividad(@Body() crearActividadDto: crearNombreCodigo): Promise<Actividad> {
        return await this.actividadService.crearActividad(crearActividadDto);
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
    async actualizar(@Param('id') id: number, @Body() actualizarActividadDto: actualizarNombreCodigo): Promise<Actividad> {
        return await this.actividadService.actualizar(id, actualizarActividadDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.actividadService.eliminar(id);
    }
}
