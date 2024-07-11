import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';
import { PacientesActividadGrupal } from 'src/modelos/clases/pacientes_actividad_grupal.entity';
import { ApiTags } from '@nestjs/swagger';
import { PacientesActividadGrupalService } from 'src/modelos/servicios/pacientes_actividad_grupal.service';
import { actualizarPacientesActividadGrupal, crearPacientesActividadGrupal } from '../modelos/interfaces/pacientesActividadGrupal.interface';

@ApiTags('Pacientes Actividad Grupal')
@Controller('pacientes_actividad_grupal')
export class PacientesActividadGrupalController {
    constructor(private readonly pacientesActividadGrupalService: PacientesActividadGrupalService) {}

    @Post()
    async crearPacienteActividadGrupal(@Body() pacientesActividadGrupal: crearPacientesActividadGrupal, @Req() req: any): Promise<PacientesActividadGrupal> {
        return await this.pacientesActividadGrupalService.crearPacientesActividadGrupal(pacientesActividadGrupal, req);
    }

    @Get()
    async buscarTodo(): Promise<PacientesActividadGrupal[]> {
        return await this.pacientesActividadGrupalService.buscarTodo();
    }

    @Get('informes/:id')
    async obtenerInformesPorSesion(@Param('id') id: number): Promise<PacientesActividadGrupal[] | undefined> {
        return this.pacientesActividadGrupalService.obtenerInformesPorSesion(id);
    }

    @Get(':id')
    async getActividadGrupalById(@Param('id') id: number): Promise<PacientesActividadGrupal> {
        return await this.pacientesActividadGrupalService.getPacientesActividadGrupalById(id);
    }

    @Patch(':id')
    async actualizarActividadGrupal(@Param('id') id: number, @Body() actualizarPacientesActividadGrupal: actualizarPacientesActividadGrupal): Promise<PacientesActividadGrupal> {
        return await this.pacientesActividadGrupalService.actualizar(id, actualizarPacientesActividadGrupal);
    }

    @Delete(':id')
    async eliminarActividadGrupal(@Param('id') id: number): Promise<void> {
        await this.pacientesActividadGrupalService.eliminar(id);
    }
}
