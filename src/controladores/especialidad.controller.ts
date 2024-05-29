import { Controller, Get, Post, Param, Body, Delete, Patch } from '@nestjs/common';
import { Especialidad } from 'src/modelos/clases/especialidad.entity';
import { EspecialidadService } from '../modelos/servicios/especialidad.service';
import { crearNombre } from '../modelos/interfaces/nombre';
import { actualizarNombre } from '../modelos/interfaces/nombre';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Especialidad')
@Controller('especialidad')
export class EspecialidadController {

    constructor(private readonly especialidadService: EspecialidadService) {}

    @Post()
    async crearEspecialidad(@Body() especialidad: crearNombre) {
        return this.especialidadService.crearEspecialidad(especialidad);
    }

    @Get()
    async buscarTodo(): Promise<Especialidad[]> {
        return this.especialidadService.buscarTodo();
    }

    @Get(':id')
    async getEspecialidadById(@Param('id') id: number): Promise<Especialidad | undefined> {
        return this.especialidadService.getEspecialidadById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarEspecialidad: actualizarNombre) {
        return this.especialidadService.actualizar(id, actualizarEspecialidad);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.especialidadService.eliminar(id);
    }
}
