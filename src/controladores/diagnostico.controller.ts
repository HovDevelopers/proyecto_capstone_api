import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { DiagnosticoService } from '../modelos/servicios/diagnostico.service';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';
import { actualizarDiagnostico } from '../modelos/interfaces/diagnostico.interface';
import { crearDiagnostico } from '../modelos/interfaces/diagnostico.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Diagnostico')
@Controller('diagnostico')
export class DiagnosticoController {

    constructor(private readonly diagnosticoService: DiagnosticoService) {}

    @Post()
    async crearDiagnostico(@Body() crearDiagnostico: crearDiagnostico): Promise<Diagnostico> {
        return this.diagnosticoService.crearDiagnostico(crearDiagnostico);
    }

    @Get()
    async buscarTodo(): Promise<Diagnostico[]> {
        return this.diagnosticoService.buscarTodo();
    }

    @Get(':id')
    async getDiagnosticoById(@Param('id') id: number): Promise<Diagnostico> {
        return this.diagnosticoService.getDiagnosticoById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarDiagnostico: actualizarDiagnostico): Promise<Diagnostico> {
        return this.diagnosticoService.actualizar(id, actualizarDiagnostico);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.diagnosticoService.eliminar(id);
    }
}
