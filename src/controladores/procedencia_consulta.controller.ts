import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ProcedenciaConsultaService } from '../modelos/servicios/procedencia_consulta.service';
import { ProcedenciaConsulta } from 'src/modelos/clases/procedencia_consulta.entity';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedencia Consulta')
@Controller('procedencia_consulta')
export class ProcedenciaConsultaController {
    constructor(private readonly procedenciaConsultaService: ProcedenciaConsultaService) {}

    @Post()
    async crearProcedenciaConsulta(@Body() crearProcedenciaConsulta: crearNombreCodigo): Promise<ProcedenciaConsulta> {
        return this.procedenciaConsultaService.crearProcedenciaConsulta(crearProcedenciaConsulta);
    }

    @Get()
    async buscarTodo(): Promise<ProcedenciaConsulta[]> {
        return this.procedenciaConsultaService.buscarTodo();
    }

    @Get(':id')
    async getProcedenciaConsultaById(@Param('id') id: number): Promise<ProcedenciaConsulta> {
        return this.procedenciaConsultaService.getProcedenciaConsultaById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarProcedenciaConsulta: actualizarNombreCodigo): Promise<ProcedenciaConsulta> {
        return this.procedenciaConsultaService.actualizar(id, actualizarProcedenciaConsulta);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.procedenciaConsultaService.eliminar(id);
    }
}
