import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ProcedenciaComisionIngresoService } from '../modelos/servicios/procedencia_comision_ingreso.service';
import { ProcedenciaComisionIngreso } from 'src/modelos/clases/procedencia_comision_ingreso.entity';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedencia Comision Ingreso')
@Controller('procedencia_comision_ingreso')
export class ProcedenciaComisionIngresoController {
    constructor(private readonly procedenciaComisionIngresoService: ProcedenciaComisionIngresoService) {}

    @Post()
    async crearProcedenciaComisionIngreso(@Body() crearProcedenciaComisionIngreso: nombre): Promise<ProcedenciaComisionIngreso> {
        return this.procedenciaComisionIngresoService.crearProcedenciaComisionIngreso(crearProcedenciaComisionIngreso);
    }

    @Get()
    async buscarTodo(): Promise<ProcedenciaComisionIngreso[]> {
        return this.procedenciaComisionIngresoService.buscarTodo();
    }

    @Get(':id')
    async getProcedenciaComisionIngresoById(@Param('id') id: number): Promise<ProcedenciaComisionIngreso> {
        return this.procedenciaComisionIngresoService.getProcedenciaComisionIngresoById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarProcedenciaComisionIngreso: nombre): Promise<ProcedenciaComisionIngreso> {
        return this.procedenciaComisionIngresoService.actualizar(id, actualizarProcedenciaComisionIngreso);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.procedenciaComisionIngresoService.eliminar(id);
    }
}
