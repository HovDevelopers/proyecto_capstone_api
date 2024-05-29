import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ComisionIngresoDiagnosticoService } from '../modelos/servicios/comision_ingreso_diagnostico.service';
import { ComisionIngresoDiagnostico } from 'src/modelos/clases/comision_ingreso_diagnostico.entity';
import { crearComisionIngresoDiagnostico } from '../modelos/interfaces/ComisionIngresoDiagnostico';
import { actualizarComisionIngresoDiagnostico } from '../modelos/interfaces/ComisionIngresoDiagnostico';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comision Ingreso Diagnostico')
@Controller('comision_ingreso_Diagnostico')
export class ComisionIngresoDiagnosticoController {
    constructor(private readonly comisionIngresoDiagnosticoService: ComisionIngresoDiagnosticoService) {}

    @Post()
    async crearComisionIngresoDiagnostico(@Body() comisionIngresoDiagnostico: crearComisionIngresoDiagnostico): Promise<ComisionIngresoDiagnostico> {
        return await this.comisionIngresoDiagnosticoService.crearComisionIngresoDiagnostico(comisionIngresoDiagnostico);
    }

    @Get()
    async buscarTodo(): Promise<ComisionIngresoDiagnostico[]> {
        return await this.comisionIngresoDiagnosticoService.buscarTodo();
    }

    @Get(':id')
    async getComisionIngresoDiagnosticoById(@Param('id') id: number): Promise<ComisionIngresoDiagnostico> {
        return await this.comisionIngresoDiagnosticoService.getComisionIngresoDiagnosticoById(id);
    }

    @Patch(':id')
    async actualizarComisionIngresoDiagnostico(@Param('id') id: number, @Body() actualizarComisionIngresoDiagnostico: actualizarComisionIngresoDiagnostico): Promise<ComisionIngresoDiagnostico> {
        return await this.comisionIngresoDiagnosticoService.actualizar(id, actualizarComisionIngresoDiagnostico);
    }

    @Delete(':id')
    async eliminarComisionIngresoDiagnostico(@Param('id') id: number): Promise<void> {
        await this.comisionIngresoDiagnosticoService.eliminar(id);
    }
}
