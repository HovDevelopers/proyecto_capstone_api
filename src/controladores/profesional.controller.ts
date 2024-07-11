import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProfesionalService } from '../modelos/servicios/profesional.service';
import { crearProfesional } from '../modelos/interfaces/profesional.interface';
import { actualizarProfesional } from '../modelos/interfaces/profesional.interface';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profesional')
@Controller('profesional')
export class ProfesionalController {

    constructor(private profesionalService: ProfesionalService){}

    @Post()
    async crearProfesional(@Body() profesional: crearProfesional, @Req() req: any) {
        return this.profesionalService.crearProfesional(profesional, req);
    }

    @Get()
    async buscarTodo(): Promise<Profesional[]> {
        return this.profesionalService.buscarTodo();
    }

    @Get(':id')  
    async getProfesionalById(@Param('id') id: number) {
        return this.profesionalService.getProfesionalById(id);
    }

    @Get('rut/:rut')
    async getProfesionalByRut(@Param('rut') rut: string) {
        return this.profesionalService.getProfesionalByRut(rut);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarProfesional: actualizarProfesional, @Req() req: any) {
        return this.profesionalService.actualizar(id, actualizarProfesional, req);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number) {
        return this.profesionalService.eliminar(id);
    }
}
