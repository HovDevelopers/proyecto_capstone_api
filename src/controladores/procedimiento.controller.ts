import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Procedimiento } from 'src/modelos/clases/procedimiento.entity';
import { ProcedimientoService } from '../modelos/servicios/procedimiento.service';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedimiento')
@Controller('procedimiento')
export class ProcedimientoController {

    constructor(private readonly procedimientoService: ProcedimientoService) {}

    @Post()
    async crearProcedimiento(@Body() crearProcedimientoDto: crearNombreCodigo): Promise<Procedimiento> {
        return await this.procedimientoService.crearProcedimiento(crearProcedimientoDto);
    }

    @Get()
    async buscarTodo(): Promise<Procedimiento[]> {
        return await this.procedimientoService.buscarTodo();
    }

    @Get(':id')
    async getProcedimientoById(@Param('id') id: number): Promise<Procedimiento | undefined> {
        return await this.procedimientoService.getProcedimientoById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarProcedimientoDto: actualizarNombreCodigo): Promise<Procedimiento> {
        return await this.procedimientoService.actualizar(id, actualizarProcedimientoDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.procedimientoService.eliminar(id);
    }
}
