import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ComisionIngresoProfesionalService } from '../modelos/servicios/comision_ingreso_profesional.service';
import { ComisionIngresoProfesional } from 'src/modelos/clases/comision_ingreso_profesional.entity';
import { crearComisionIngresoProfesional } from '../modelos/interfaces/ComisionIngresoProfesional';
import { actualizarComisionIngresoProfesional } from '../modelos/interfaces/ComisionIngresoProfesional';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comision Ingreso Profesional')
@Controller('comision_ingreso_profesional')
export class ComisionIngresoProfesionalController {
    constructor(private readonly comisionIngresoProfesionalService: ComisionIngresoProfesionalService) {}

    @Post()
    async crearComisionIngresoProfesional(@Body() comisionIngresoProfesional: crearComisionIngresoProfesional): Promise<ComisionIngresoProfesional> {
        return await this.comisionIngresoProfesionalService.crearComisionIngresoProfesional(comisionIngresoProfesional);
    }

    @Get()
    async buscarTodo(): Promise<ComisionIngresoProfesional[]> {
        return await this.comisionIngresoProfesionalService.buscarTodo();
    }

    @Get('informes/:id')
    async obtenerInformesPorProfesional(@Param('id') id: number): Promise<ComisionIngresoProfesional[] | undefined> {
        return this.comisionIngresoProfesionalService.obtenerInformesPorProfesional(id);
    }

    @Get(':id')
    async getComisionIngresoProfesionalById(@Param('id') id: number): Promise<ComisionIngresoProfesional> {
        return await this.comisionIngresoProfesionalService.getComisionIngresoProfesionalById(id);
    }

    @Patch(':id')
    async actualizarComisionIngresoProfesional(@Param('id') id: number, @Body() actualizarComisionIngresoProfesional: actualizarComisionIngresoProfesional): Promise<ComisionIngresoProfesional> {
        return await this.comisionIngresoProfesionalService.actualizar(id, actualizarComisionIngresoProfesional);
    }

    @Delete(':id')
    async eliminarComisionIngresoProfesional(@Param('id') id: number): Promise<void> {
        await this.comisionIngresoProfesionalService.eliminar(id);
    }
}
