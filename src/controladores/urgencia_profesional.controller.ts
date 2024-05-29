import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { UrgenciaProfesionalService } from '../modelos/servicios/urgencia_profesional.service';
import { UrgenciaProfesional } from 'src/modelos/clases/urgencia_profesional.entity';
import { crearUrgenciaProfesional } from '../modelos/interfaces/UrgenciaProfesional';
import { actualizarUrgenciaProfesional } from '../modelos/interfaces/UrgenciaProfesional';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Urgencia Profesional')
@Controller('urgencia_profesional')
export class UrgenciaProfesionalController {
  constructor(private readonly urgenciaProfesionalService: UrgenciaProfesionalService) {}

  @Post()
  async crearUrgenciaProfesional(@Body() crearUrgenciaProfesional: crearUrgenciaProfesional): Promise<UrgenciaProfesional> {
    return this.urgenciaProfesionalService.crearUrgenciaProfesional(crearUrgenciaProfesional);
  }

  @Get()
  async buscarTodo(): Promise<UrgenciaProfesional[]> {
    return this.urgenciaProfesionalService.buscarTodo();
  }

  @Get('informes/:id')
  async obtenerInformesPorProfesional(@Param('id') id: number): Promise<UrgenciaProfesional[] | undefined> {
    return this.urgenciaProfesionalService.obtenerInformesPorProfesional(id);
  }

  @Get(':id')
  async getUrgenciaProfesionalById(@Param('id') id: number): Promise<UrgenciaProfesional | undefined> {
    return this.urgenciaProfesionalService.getUrgenciaProfesionalById(id);
  }

  @Patch(':id')
  async actualizarUrgenciaProfesional(@Param('id') id: number, @Body() actualizarUrgenciaProfesional: actualizarUrgenciaProfesional): Promise<UrgenciaProfesional> {
    return this.urgenciaProfesionalService.actualizar(id, actualizarUrgenciaProfesional);
  }

  @Delete(':id')
  async eliminarUrgenciaProfesional(@Param('id') id: number): Promise<void> {
    return this.urgenciaProfesionalService.eliminar(id);
  }
}
