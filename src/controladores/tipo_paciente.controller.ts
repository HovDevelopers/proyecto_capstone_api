import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente.entity';
import { TipoPacienteService } from '../modelos/servicios/tipo_paciente.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipo Paciente')
@Controller('tipo_paciente')
export class TipoPacienteController {

    constructor(private readonly tipoPacienteService: TipoPacienteService) {}

    @Post()
    async crearTipoPaciente(@Body() crearTipoPaciente: nombre): Promise<TipoPaciente> {
        return await this.tipoPacienteService.crearTipoPaciente(crearTipoPaciente);
    }

    @Get()
    async buscarTodo(): Promise<TipoPaciente[]> {
        return await this.tipoPacienteService.buscarTodo();
    }

    @Get(':id')
    async getTipoPacienteById(@Param('id') id: number): Promise<TipoPaciente | undefined> {
        return await this.tipoPacienteService.getTipoPacienteById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarTipoPaciente: nombre): Promise<TipoPaciente> {
        return await this.tipoPacienteService.actualizar(id, actualizarTipoPaciente);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.tipoPacienteService.eliminar(id);
    }
}
