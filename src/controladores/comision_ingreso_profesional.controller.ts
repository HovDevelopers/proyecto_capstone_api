import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';
import { ComisionIngresoProfesionalService } from '../modelos/servicios/comision_ingreso_profesional.service';
import { ComisionIngresoProfesional } from 'src/modelos/clases/comision_ingreso_profesional.entity';
import { crearComisionIngresoProfesional } from '../modelos/interfaces/comisionIngresoProfesional.interface';
import { actualizarComisionIngresoProfesional } from '../modelos/interfaces/comisionIngresoProfesional.interface';
import { ApiTags } from '@nestjs/swagger';
import { ComisionIngreso } from 'src/modelos/clases/comision_ingreso.entity';

@ApiTags('Comision Ingreso Profesional')
@Controller('comision_ingreso_profesional')
export class ComisionIngresoProfesionalController {
    constructor(private readonly comisionIngresoProfesionalService: ComisionIngresoProfesionalService) {}

    @Post()
    async crearComisionIngresoProfesional(@Body() comisionIngresoProfesional: crearComisionIngresoProfesional, @Req() req: any): Promise<ComisionIngresoProfesional> {
        return await this.comisionIngresoProfesionalService.crearComisionIngresoProfesional(comisionIngresoProfesional, req);
    }

    @Get()
    async buscarTodo(): Promise<ComisionIngresoProfesional[]> {
        return await this.comisionIngresoProfesionalService.buscarTodo();
    }

    @Get('informes/:id')
    async obtenerInformesPorProfesional(@Param('id') id: number): Promise<ComisionIngreso[] | undefined> {
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
