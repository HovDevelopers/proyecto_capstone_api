import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';
import { ActividadGrupalProfesionalService } from '../modelos/servicios/actividad_grupal_profesional.service';
import { ActividadGrupalProfesional } from 'src/modelos/clases/actividad_grupal_profesional.entity';
import { crearActividadGrupalProfesional } from '../modelos/interfaces/actividadGrupalProfesional.interface';
import { actualizarActividadGrupalProfesional } from '../modelos/interfaces/actividadGrupalProfesional.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Actividad Grupal Profesional')
@Controller('actividad_grupal_profesional')
export class ActividadGrupalProfesionalController {
    constructor(private readonly actividadGrupalProfesionalService: ActividadGrupalProfesionalService) {}

    @Post()
    async crearActividadGrupalProfesional(@Body() ActividadGrupalProfesional: crearActividadGrupalProfesional, @Req() req: any): Promise<ActividadGrupalProfesional> {
        return await this.actividadGrupalProfesionalService.crearActividadGrupalProfesional(ActividadGrupalProfesional, req);
    }

    @Get()
    async buscarTodo(): Promise<ActividadGrupalProfesional[]> {
        return await this.actividadGrupalProfesionalService.buscarTodo();
    }

    @Get('informes/:id')
    async obtenerInformesPorProfesional(@Param('id') id: number): Promise<ActividadGrupalProfesional[] | undefined> {
        return this.actividadGrupalProfesionalService.obtenerInformesPorProfesional(id);
    }

    @Get(':id')
    async getActividadGrupalProfesionalById(@Param('id') id: number): Promise<ActividadGrupalProfesional> {
        return await this.actividadGrupalProfesionalService.getActividadGrupalProfesionalById(id);
    }

    @Patch(':id')
    async actualizarActividadGrupalProfesional(@Param('id') id: number, @Body() actualizarActividadGrupalProfesional: actualizarActividadGrupalProfesional): Promise<ActividadGrupalProfesional> {
        return await this.actividadGrupalProfesionalService.actualizar(id, actualizarActividadGrupalProfesional);
    }

    @Delete(':id')
    async eliminarActividadGrupalProfesional(@Param('id') id: number): Promise<void> {
        await this.actividadGrupalProfesionalService.eliminar(id);
    }
}
