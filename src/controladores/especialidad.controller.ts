import { Controller, Get, Post, Param, Body, Delete, Patch, Req } from '@nestjs/common';
import { Especialidad } from 'src/modelos/clases/especialidad.entity';
import { EspecialidadService } from '../modelos/servicios/especialidad.service';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Especialidad')
@Controller('especialidad')
export class EspecialidadController {

    constructor(private readonly especialidadService: EspecialidadService) {}

    @Post()
    async crearEspecialidad(@Body() especialidad: nombre, @Req() req: any) {
        return this.especialidadService.crearEspecialidad(especialidad, req);
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
    async actualizar(@Param('id') id: number, @Body() actualizarEspecialidad: nombre) {
        return this.especialidadService.actualizar(id, actualizarEspecialidad);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.especialidadService.eliminar(id);
    }
}
