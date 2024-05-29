import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { InformeDiarioService } from '../modelos/servicios/informe_diario.service';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { crearInformeDiario } from '../modelos/interfaces/informeDiario';
import { actualizarInformeDiario } from '../modelos/interfaces/informeDiario';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Informe Diario')
@Controller('informe_diario')
export class InformeDiarioController {
    constructor(private readonly informeDiarioService: InformeDiarioService) {}

    @Post()
    async crearInformeDiario(@Body() informeDiario: crearInformeDiario): Promise<InformeDiario> {
        return await this.informeDiarioService.crearInformeDiario(informeDiario);
    }

    @Get()
    async buscarTodo(): Promise<InformeDiario[]> {
        return await this.informeDiarioService.buscarTodo();
    }

    @Get(':id')
    async getInformeDiarioById(@Param('id') id: number): Promise<InformeDiario> {
        return await this.informeDiarioService.getInformeDiarioById(id);
    }

    @Patch(':id')
    async actualizarInformeDiario(@Param('id') id: number, @Body() actualizarInformeDiario: actualizarInformeDiario): Promise<InformeDiario> {
        return await this.informeDiarioService.actualizar(id, actualizarInformeDiario);
    }

    @Delete(':id')
    async eliminarInformeDiario(@Param('id') id: number): Promise<void> {
        await this.informeDiarioService.eliminar(id);
    }
}
