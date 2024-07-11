import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Procedimiento } from 'src/modelos/clases/procedimiento.entity';
import { ProcedimientoService } from '../modelos/servicios/procedimiento.service';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedimiento')
@Controller('procedimiento')
export class ProcedimientoController {

    constructor(private readonly procedimientoService: ProcedimientoService) {}

    @Post()
    async crearProcedimiento(@Body() crearProcedimiento: nombre): Promise<Procedimiento> {
        return await this.procedimientoService.crearProcedimiento(crearProcedimiento);
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
    async actualizar(@Param('id') id: number, @Body() actualizarProcedimiento: nombre): Promise<Procedimiento> {
        return await this.procedimientoService.actualizar(id, actualizarProcedimiento);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.procedimientoService.eliminar(id);
    }
}
