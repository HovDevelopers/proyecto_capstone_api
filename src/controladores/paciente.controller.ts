import { Body, Controller, Get, Param, Patch, Delete, Post, Req, NotFoundException } from '@nestjs/common';
import { actualizarPaciente } from '../modelos/interfaces/paciente.interface';
import { crearPaciente } from '../modelos/interfaces/paciente.interface';
import { Paciente } from 'src/modelos/clases/paciente.entity';
import { PacienteService } from '../modelos/servicios/paciente.service';
import { ApiTags } from '@nestjs/swagger';
import { PacienteAuditoria } from 'src/modelos/clases/paciente_auditoria.entity';

@ApiTags('Paciente')
@Controller('paciente')
export class PacienteController {

    constructor(private readonly pacienteService: PacienteService) {}

    @Post()
    async crearPaciente(@Body() paciente: crearPaciente, @Req() req: any) {
        return this.pacienteService.crearPaciente(paciente, req);
    }

    @Get()
    async buscarTodo(): Promise<Paciente[]> {
        return this.pacienteService.buscarTodo();
    }

    @Get('versiones/:id')
    async getPacienteAuditoriaByIdPaciente(@Param('id') id: number): Promise<PacienteAuditoria[] | undefined> {
        return await this.pacienteService.getPacienteAuditoriaByIdPaciente(id);
    }

    @Get(':id')
    async getPacienteById(@Param('id') id: number): Promise<Paciente | undefined> {
        return this.pacienteService.getPacienteById(id);
    }
 
    @Get('ficha/:n_ficha')
    async getPacienteByFicha(@Param('n_ficha') n_ficha: number): Promise<Paciente | boolean> {
      const paciente = await this.pacienteService.getPacienteByFicha(n_ficha);
      if (paciente === false) {
        throw new NotFoundException(`Paciente con número de ficha ${n_ficha} no encontrado`);
      }
      return paciente;
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
    async actualizar(@Param('id') id: number, @Body() actualizarPaciente: actualizarPaciente, @Req() req: any) {
        return this.pacienteService.actualizar(id, actualizarPaciente, req);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.pacienteService.eliminar(id);
    }
}
