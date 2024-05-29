import { Body, Controller, Delete, Get, Request, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ProfesionalService } from '../modelos/servicios/profesional.service';
import { crearProfesional } from '../modelos/interfaces/profesional';
import { actualizarProfesional } from '../modelos/interfaces/profesional';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profesional')
@Controller('profesional')
export class ProfesionalController {

    constructor(private profesionalService: ProfesionalService){}

    @Post()
    async crearProfesional(@Body() profesional: crearProfesional) {
        return this.profesionalService.crearUsuario(profesional);
    }

    @Get()
    async buscarTodo(): Promise<Profesional[]> {
        return this.profesionalService.buscarTodo();
    }

    @Get('jwt')
    async getProfesionalNombre(@Request() req) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Token no proporcionado');
        }
        const token = authHeader.split(' ')[1];
        return this.profesionalService.getProfesionalNombre(token);
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
    async actualizar(@Param('id') id: number, @Body() actualizarProfesional: actualizarProfesional) {
        return this.profesionalService.actualizar(id, actualizarProfesional);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number) {
        return this.profesionalService.eliminar(id);
    }
}
