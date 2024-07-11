import { Controller, Post, Get, Param, Body, Delete, Patch, Req } from '@nestjs/common';
import { ConsultoriaProfesionalService } from '../modelos/servicios/consultoria_profesional.service';
import { ConsultoriaProfesional } from 'src/modelos/clases/consultoria_profesional.entity';
import { crearConsultoriaProfesional } from '../modelos/interfaces/consultoriaProfesional.interface';
import { actualizarConsultoriaProfesional } from '../modelos/interfaces/consultoriaProfesional.interface';
import { ApiTags } from '@nestjs/swagger';
import { Consultoria } from 'src/modelos/clases/consultoria.entity';

@ApiTags('Consultoria Profesional')
@Controller('consultoria_profesional')
export class ConsultoriaProfesionalController {

  constructor(private readonly consultoriaProfesionalService: ConsultoriaProfesionalService) {}

  @Post()
  async crearConsultoriaProfesional(@Body() crearConsultoriaProfesional: crearConsultoriaProfesional, @Req() req: any): Promise<ConsultoriaProfesional> {
    return this.consultoriaProfesionalService.crearConsultoriaProfesional(crearConsultoriaProfesional, req);
  }

  @Get()
  async buscarTodo(): Promise<ConsultoriaProfesional[]> {
    return this.consultoriaProfesionalService.buscarTodo();
  }

  @Get('informes/:id')
  async obtenerInformesPorProfesional(@Param('id') id: number): Promise<Consultoria[] | undefined> {
    return this.consultoriaProfesionalService.obtenerInformesPorProfesional(id);
  }

  @Get(':id')
  async getConsultoriaProfesionalById(@Param('id') id: number): Promise<ConsultoriaProfesional | undefined> {
    return this.consultoriaProfesionalService.getConsultoriaProfesionalById(id);
  }

  @Patch(':id')
  async actualizarConsultoriaProfesional(@Param('id') id: number, @Body() actualizarConsultoriaProfesional: actualizarConsultoriaProfesional): Promise<ConsultoriaProfesional> {
    return this.consultoriaProfesionalService.actualizar(id, actualizarConsultoriaProfesional);
  }

  @Delete(':id')
  async eliminarConsultoriaProfesional(@Param('id') id: number): Promise<void> {
    return this.consultoriaProfesionalService.eliminar(id);
  }
}
