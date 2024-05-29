import { Controller, Delete, Patch, Post, Get, Body, Param} from '@nestjs/common';
import { EstadoInformeService } from '../modelos/servicios/estado_informe.service';
import { EstadoInforme } from 'src/modelos/clases/estado_informe.entity';
import { crearNombre } from '../modelos/interfaces/nombre';
import { actualizarNombre } from '../modelos/interfaces/nombre';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estado Informe')
@Controller('estado_informe')
export class EstadoInformeController {

    constructor(private readonly estadoInformeService: EstadoInformeService) {}

    @Post()
    async crearEstadoInforme(@Body() crearEstadoInformeDto: crearNombre): Promise<EstadoInforme> {
        return await this.estadoInformeService.crearEstadoInforme(crearEstadoInformeDto);
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
    async actualizar(@Param('id') id: number, @Body() actualizarEstadoInformeDto: actualizarNombre): Promise<EstadoInforme> {
        return await this.estadoInformeService.actualizar(id, actualizarEstadoInformeDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.estadoInformeService.eliminar(id);
    }
}
