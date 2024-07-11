import { Controller, Get, Param, Post, Body, Delete, NotFoundException } from '@nestjs/common';
import { LogAccesoService } from '../modelos/servicios/log_acceso.service';
import { LogAcceso } from 'src/modelos/clases/log_acceso.entity';
import { crearLogAcceso } from '../modelos/interfaces/logAcceso.interface';

@Controller('log_acceso')
export class LogAccesoController {
  constructor(private readonly logAccesoService: LogAccesoService) {}

  @Post()
  async crearLogAcceso(@Body() nombreLogAcceso: crearLogAcceso): Promise<LogAcceso> {
    return await this.logAccesoService.crearLogAcceso(nombreLogAcceso);
  }

  @Get()
  async buscarTodo(): Promise<LogAcceso[]> {
    return await this.logAccesoService.buscarTodo();
  }

  @Get(':id')
  async getLogAccesoById(@Param('id') id: number): Promise<LogAcceso> {
    const logAcceso = await this.logAccesoService.getLogAccesoById(id);
    if (!logAcceso) {
      throw new NotFoundException(`No se encontró el LogAcceso con ID ${id}`);
    }
    return logAcceso;
  }

  @Get('ultima_conexion/:id')
  async getUltimaConexionIdUsuario(@Param('id') id: number): Promise<{ fecha: Date | null }> {
    const logAcceso = await this.logAccesoService.getUltimoAccesoByIdUsuario(id);
    return { fecha: logAcceso || null };
  }
  

  @Delete(':id')
  async eliminar(@Param('id') id: number): Promise<void> {
    await this.logAccesoService.eliminar(id);
  }
}
