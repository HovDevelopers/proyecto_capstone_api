import { Controller, Get, Param } from '@nestjs/common';
import { ApiFonasaService } from 'src/modelos/servicios/api_fonasa.service';

@Controller('api_fonasa')
export class ApiFonasaController {
  constructor(private readonly apiFonasaService: ApiFonasaService) {}

  @Get('buscar/:termino')
  obtenerPacienteApi(@Param('termino') termino: string) {
    return this.apiFonasaService.obtenerPacienteApi(termino);
  }

  @Get('fonasa/:termino')
  obtenerPacienteFonasa(@Param('termino') termino: string) {
    return this.apiFonasaService.obtenerPacienteFonasa(termino);
  }
}