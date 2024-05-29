import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { TipoPaciente } from 'src/modelos/clases/tipo_paciente..entity';
import { TipoPacienteService } from '../modelos/servicios/tipo_paciente.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipo Paciente')
@Controller('tipo_paciente')
export class TipoPacienteController {

    constructor(private readonly tipoPacienteService: TipoPacienteService) {}

    @Post()
    async crearTipoPaciente(@Body() crearTipoPacienteDto: crearNombreCodigo): Promise<TipoPaciente> {
        return await this.tipoPacienteService.crearTipoPaciente(crearTipoPacienteDto);
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
    async actualizar(@Param('id') id: number, @Body() actualizarTipoPacienteDto: actualizarNombreCodigo): Promise<TipoPaciente> {
        return await this.tipoPacienteService.actualizar(id, actualizarTipoPacienteDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.tipoPacienteService.eliminar(id);
    }
}
