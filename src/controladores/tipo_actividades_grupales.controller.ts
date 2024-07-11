import { Body, Controller, Param, Patch, Post, Get, Delete } from '@nestjs/common';
import { TipoActividadesGrupalesService } from '../modelos/servicios/tipo_actividades_grupales.service';
import { TipoActividadesGrupales } from 'src/modelos/clases/tipo_actividades_grupales.entity';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipo Actividades Grupales')
@Controller('tipo_actividades_grupales')
export class TipoActividadesGrupalesController {

    constructor(private readonly tipoActividadesGrupalesService: TipoActividadesGrupalesService) {}

    @Post()
    async crearTipoActividadesGrupales(@Body() crearTipoActividadesGrupales: nombre): Promise<TipoActividadesGrupales> {
        return await this.tipoActividadesGrupalesService.crearTipoActividadesGrupales(crearTipoActividadesGrupales);
    }

    @Get()
    async buscarTodo(): Promise<TipoActividadesGrupales[]> {
        return await this.tipoActividadesGrupalesService.buscarTodo();
    }

    @Get(':id')
    async getTipoActividadesGrupalesById(@Param('id') id: number): Promise<TipoActividadesGrupales | undefined> {
        return await this.tipoActividadesGrupalesService.getTipoActividadesGrupalesById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarTipoActividadesGrupales: nombre): Promise<TipoActividadesGrupales> {
        return await this.tipoActividadesGrupalesService.actualizar(id, actualizarTipoActividadesGrupales);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.tipoActividadesGrupalesService.eliminar(id);
    }
}
