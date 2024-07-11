import { Controller, Post, Get, Param, Body, Delete, Patch, Req } from '@nestjs/common';
import { InformeDiarioProfesionalService } from '../modelos/servicios/informe_diario_profesional.service';
import { InformeDiarioProfesional } from 'src/modelos/clases/informe_diario_profesional.entity';
import { crearInformeDiarioProfesional } from '../modelos/interfaces/informeDiarioProfesional.interface';
import { actualizarInformeDiarioProfesional } from '../modelos/interfaces/informeDiarioProfesional.interface';
import { ApiTags } from '@nestjs/swagger';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';

@ApiTags('Informe Diario Profesional')
@Controller('informe_diario_profesional')
export class InformeDiarioProfesionalController {
  constructor(private readonly informeDiarioProfesionalService: InformeDiarioProfesionalService) {}

  @Post()
  async crearInformeDiarioProfesional(@Body() crearInformeDiarioProfesional: crearInformeDiarioProfesional, @Req() req: any): Promise<InformeDiarioProfesional> {
    return this.informeDiarioProfesionalService.crearInformeDiarioProfesional(crearInformeDiarioProfesional, req);
  }

  @Get()
  async buscarTodo(): Promise<InformeDiarioProfesional[]> {
    return this.informeDiarioProfesionalService.buscarTodo();
  }

  @Get('informes/:id')
  async obtenerInformesPorProfesional(@Param('id') id: number): Promise<InformeDiario[] | undefined> {
    return this.informeDiarioProfesionalService.obtenerInformesPorProfesional(id);
  }

  @Get(':id')
  async getInformeDiarioProfesionalById(@Param('id') id: number): Promise<InformeDiarioProfesional | undefined> {
    return this.informeDiarioProfesionalService.getInformeDiarioProfesionalById(id);
  }

  @Patch(':id')
  async actualizarInformeDiarioProfesional(@Param('id') id: number, @Body() actualizarInformeDiarioProfesional: actualizarInformeDiarioProfesional): Promise<InformeDiarioProfesional> {
    return this.informeDiarioProfesionalService.actualizar(id, actualizarInformeDiarioProfesional);
  }

  @Delete(':id')
  async eliminarInformeDiarioProfesional(@Param('id') id: number): Promise<void> {
    return this.informeDiarioProfesionalService.eliminar(id);
  }
}
