import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { InformeDiarioDiagnosticoService } from '../modelos/servicios/informe_diario_diagnostico.service';
import { InformeDiarioDiagnostico } from 'src/modelos/clases/informe_diario_diagnostico.entity';
import { crearInformeDiarioDiagnostico } from '../modelos/interfaces/informeDiarioDiagnostico';
import { actualizarInformeDiarioDiagnostico } from '../modelos/interfaces/informeDiarioDiagnostico';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Informe Diario Diagnostico')
@Controller('informe_diario_diagnostico')
export class InformeDiarioDiagnosticoController {
  constructor(private readonly informeDiarioDiagnosticoService: InformeDiarioDiagnosticoService) {}

  @Post()
  async crearInformeDiarioDiagnostico(@Body() crearInformeDiarioDiagnostico: crearInformeDiarioDiagnostico): Promise<InformeDiarioDiagnostico> {
    return this.informeDiarioDiagnosticoService.crearInformeDiarioDiagnostico(crearInformeDiarioDiagnostico);
  }

  @Get()
  async buscarTodo(): Promise<InformeDiarioDiagnostico[]> {
    return this.informeDiarioDiagnosticoService.buscarTodo();
  }

  @Get(':id')
  async getInformeDiarioDiagnosticoById(@Param('id') id: number): Promise<InformeDiarioDiagnostico | undefined> {
    return this.informeDiarioDiagnosticoService.getInformeDiarioDiagnosticoById(id);
  }

  @Patch(':id')
  async actualizarInformeDiarioDiagnostico(@Param('id') id: number, @Body() actualizarInformeDiarioDiagnostico: actualizarInformeDiarioDiagnostico): Promise<InformeDiarioDiagnostico> {
    return this.informeDiarioDiagnosticoService.actualizar(id, actualizarInformeDiarioDiagnostico);
  }

  @Delete(':id')
  async eliminarInformeDiarioDiagnostico(@Param('id') id: number): Promise<void> {
    return this.informeDiarioDiagnosticoService.eliminar(id);
  }
}
