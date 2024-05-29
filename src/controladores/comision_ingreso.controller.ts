import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ComisionIngresoService } from '../modelos/servicios/comision_ingreso.service';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';
import { crearComisionIngreso } from '../modelos/interfaces/ComisionIngreso';
import { actualizarComisionIngreso } from '../modelos/interfaces/ComisionIngreso';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comision Ingreso')
@Controller('comision_ingreso')
export class ComisionIngresoController {
    constructor(private readonly comisionIngresoService: ComisionIngresoService) {}

    @Post()
    async crearComisionIngreso(@Body() comisionIngreso: crearComisionIngreso): Promise<ComisionIngreso> {
        return await this.comisionIngresoService.crearComisionIngreso(comisionIngreso);
    }

    @Get()
    async buscarTodo(): Promise<ComisionIngreso[]> {
        return await this.comisionIngresoService.buscarTodo();
    }

    @Get(':id')
    async getComisionIngresoById(@Param('id') id: number): Promise<ComisionIngreso> {
        return await this.comisionIngresoService.getComisionIngresoById(id);
    }

    @Patch(':id')
    async actualizarComisionIngreso(@Param('id') id: number, @Body() actualizarComisionIngreso: actualizarComisionIngreso): Promise<ComisionIngreso> {
        return await this.comisionIngresoService.actualizar(id, actualizarComisionIngreso);
    }

    @Delete(':id')
    async eliminarComisionIngreso(@Param('id') id: number): Promise<void> {
        await this.comisionIngresoService.eliminar(id);
    }
}
