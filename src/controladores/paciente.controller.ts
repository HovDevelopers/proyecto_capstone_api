import { Body, Controller, Get, Param, Patch, Delete, Post } from '@nestjs/common';
import { actualizarPaciente } from '../modelos/interfaces/paciente';
import { crearPaciente } from '../modelos/interfaces/paciente';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { PacienteService } from '../modelos/servicios/paciente.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Paciente')
@Controller('paciente')
export class PacienteController {

    constructor(private readonly pacienteService: PacienteService) {}

    @Post()
    async crearPaciente(@Body() paciente: crearPaciente) {
        return this.pacienteService.crearPaciente(paciente);
    }

    @Get()
    async buscarTodo(): Promise<Paciente[]> {
        return this.pacienteService.buscarTodo();
    }

    @Get(':id')
    async getPacienteById(@Param('id') id: number): Promise<Paciente | undefined> {
        return this.pacienteService.getPacienteById(id);
    }

    @Get('ficha/:n_ficha')
    async getPacienteByFicha(@Param('n_ficha') n_ficha: number): Promise<Paciente | undefined> {
        return await this.pacienteService.getPacienteByFicha(n_ficha);
    }

    @Get('rut/:rut')
    async getPacienteByRut(@Param('rut') rut: string): Promise<Paciente | undefined> {
        return await this.pacienteService.getPacienteByRut(rut);
    }

    @Get('pasaporte/:pasaporte')
    async getPacienteByPasaporte(@Param('pasaporte') pasaporte: string): Promise<Paciente | undefined> {
        return await this.pacienteService.getPacienteByPasaporte(pasaporte);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarPaciente: actualizarPaciente) {
        return this.pacienteService.actualizar(id, actualizarPaciente);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.pacienteService.eliminar(id);
    }
}
