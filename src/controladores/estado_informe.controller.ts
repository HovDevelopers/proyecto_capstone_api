import { Controller, Delete, Patch, Post, Get, Body, Param} from '@nestjs/common';
import { EstadoInformeService } from '../modelos/servicios/estado_informe.service';
import { EstadoInforme } from 'src/modelos/clases/estado_informe.entity';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estado Informe')
@Controller('estado_informe')
export class EstadoInformeController {

    constructor(private readonly estadoInformeService: EstadoInformeService) {}

    @Post()
    async crearEstadoInforme(@Body() crearEstadoInforme: nombre): Promise<EstadoInforme> {
        return await this.estadoInformeService.crearEstadoInforme(crearEstadoInforme);
    }

    @Get()
    async buscarTodo(): Promise<EstadoInforme[]> {
        return await this.estadoInformeService.buscarTodo();
    }

    @Get(':id')
    async getEstadoInformeById(@Param('id') id: number): Promise<EstadoInforme | undefined> {
        return await this.estadoInformeService.getEstadoInformeById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarEstadoInforme: nombre): Promise<EstadoInforme> {
        return await this.estadoInformeService.actualizar(id, actualizarEstadoInforme);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.estadoInformeService.eliminar(id);
    }
}
