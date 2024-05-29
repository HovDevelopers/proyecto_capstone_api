import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { UrgenciaDiagnosticoService } from '../modelos/servicios/urgencia_diagnostico.service';
import { UrgenciaDiagnostico } from 'src/modelos/clases/urgencia_diagnostico.entity';
import { crearUrgenciaDiagnostico } from '../modelos/interfaces/UrgenciaDiagnostico';
import { actualizarUrgenciaDiagnostico } from '../modelos/interfaces/UrgenciaDiagnostico';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Urgencia Diagnostico')
@Controller('urgencia_diagnostico')
export class UrgenciaDiagnosticoController {
  constructor(private readonly urgenciaDiagnosticoService: UrgenciaDiagnosticoService) {}

  @Post()
  async crearUrgenciaDiagnostico(@Body() crearUrgenciaDiagnostico: crearUrgenciaDiagnostico): Promise<UrgenciaDiagnostico> {
    return this.urgenciaDiagnosticoService.crearUrgenciaDiagnostico(crearUrgenciaDiagnostico);
  }

  @Get()
  async buscarTodo(): Promise<UrgenciaDiagnostico[]> {
    return this.urgenciaDiagnosticoService.buscarTodo();
  }

  @Get(':id')
  async getUrgenciaDiagnosticoById(@Param('id') id: number): Promise<UrgenciaDiagnostico | undefined> {
    return this.urgenciaDiagnosticoService.getUrgenciaDiagnosticoById(id);
  }

  @Patch(':id')
  async actualizarUrgenciaDiagnostico(@Param('id') id: number, @Body() actualizarUrgenciaDiagnostico: actualizarUrgenciaDiagnostico): Promise<UrgenciaDiagnostico> {
    return this.urgenciaDiagnosticoService.actualizar(id, actualizarUrgenciaDiagnostico);
  }

  @Delete(':id')
  async eliminarUrgenciaDiagnostico(@Param('id') id: number): Promise<void> {
    return this.urgenciaDiagnosticoService.eliminar(id);
  }
}
