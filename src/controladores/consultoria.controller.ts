import { Controller, Get, Post, Delete, Param, Body, Patch, Req } from '@nestjs/common';
import { ConsultoriaService } from '../modelos/servicios/consultoria.service';
import { Consultoria } from 'src/modelos/clases/consultoria.entity';
import { crearConsultoria } from '../modelos/interfaces/consultoria.interface';
import { actualizarConsultoria } from '../modelos/interfaces/consultoria.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Consultoria')
@Controller('consultoria')
export class ConsultoriaController {
    constructor(private readonly consultoriaService: ConsultoriaService) {}

    @Post()
    async crearConsultoria(@Body() Consultoria: crearConsultoria, @Req() req: any): Promise<Consultoria> {
        return await this.consultoriaService.crearConsultoria(Consultoria, req);
    }

    @Get()
    async buscarTodo(): Promise<Consultoria[]> {
        return await this.consultoriaService.buscarTodo();
    }

    @Get(':id')
    async getConsultoriaById(@Param('id') id: number): Promise<Consultoria> {
        return await this.consultoriaService.getConsultoriaById(id);
    }

    @Patch(':id')
    async actualizarConsultoria(@Param('id') id: number, @Body() actualizarConsultoria: actualizarConsultoria): Promise<Consultoria> {
        return await this.consultoriaService.actualizar(id, actualizarConsultoria);
    }

    @Delete(':id')
    async eliminarConsultoria(@Param('id') id: number): Promise<void> {
        await this.consultoriaService.eliminar(id);
    }
}
