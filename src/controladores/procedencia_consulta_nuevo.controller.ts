import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ProcedenciaConsultaNuevoService } from '../modelos/servicios/procedencia_consulta_nuevo.service';
import { ProcedenciaConsultaNuevo } from 'src/modelos/clases/procedencia_consulta_nuevo.entity';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedencia Consulta Nuevo')
@Controller('procedencia_consulta_nuevo')
export class ProcedenciaConsultaNuevoController {
    constructor(private readonly procedenciaConsultaNuevoService: ProcedenciaConsultaNuevoService) {}

    @Post()
    async crearProcedenciaConsultaNuevo(@Body() crearProcedenciaConsultaNuevo: nombre): Promise<ProcedenciaConsultaNuevo> {
        return this.procedenciaConsultaNuevoService.crearProcedenciaConsultaNuevo(crearProcedenciaConsultaNuevo);
    }

    @Get()
    async buscarTodo(): Promise<ProcedenciaConsultaNuevo[]> {
        return this.procedenciaConsultaNuevoService.buscarTodo();
    }

    @Get(':id')
    async getProcedenciaConsultaNuevoById(@Param('id') id: number): Promise<ProcedenciaConsultaNuevo> {
        return this.procedenciaConsultaNuevoService.getProcedenciaConsultaNuevoById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarProcedenciaConsultaNuevo: nombre): Promise<ProcedenciaConsultaNuevo> {
        return this.procedenciaConsultaNuevoService.actualizar(id, actualizarProcedenciaConsultaNuevo);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.procedenciaConsultaNuevoService.eliminar(id);
    }
}
