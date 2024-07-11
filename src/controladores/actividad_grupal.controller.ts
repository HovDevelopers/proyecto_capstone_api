import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';
import { ActividadGrupalService } from '../modelos/servicios/actividad_grupal.service';
import { ActividadGrupal } from 'src/modelos/clases/actividad_grupal.entity';
import { crearActividadGrupal } from '../modelos/interfaces/actividadGrupal.interface';
import { actualizarActividadGrupal } from '../modelos/interfaces/actividadGrupal.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Actividad Grupal')
@Controller('actividad_grupal')
export class ActividadGrupalController {
    constructor(private readonly actividadGrupalService: ActividadGrupalService) {}

    @Post()
    async crearActividadGrupal(@Body() actividadGrupal: crearActividadGrupal, @Req() req: any): Promise<ActividadGrupal> {
        return await this.actividadGrupalService.crearActividadGrupal(actividadGrupal, req);
    }

    @Get()
    async buscarTodo(): Promise<ActividadGrupal[]> {
        return await this.actividadGrupalService.buscarTodo();
    }

    @Get(':id')
    async getActividadGrupalById(@Param('id') id: number): Promise<ActividadGrupal> {
        return await this.actividadGrupalService.getActividadGrupalById(id);
    }

    @Patch(':id')
    async actualizarActividadGrupal(@Param('id') id: number, @Body() actualizarActividadGrupal: actualizarActividadGrupal): Promise<ActividadGrupal> {
        return await this.actividadGrupalService.actualizar(id, actualizarActividadGrupal);
    }

    @Delete(':id')
    async eliminarActividadGrupal(@Param('id') id: number): Promise<void> {
        await this.actividadGrupalService.eliminar(id);
    }
}
