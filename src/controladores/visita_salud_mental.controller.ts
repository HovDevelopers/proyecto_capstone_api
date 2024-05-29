import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VisitaSaludMentalService } from '../modelos/servicios/visita_salud_mental.service';
import { crearNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { actualizarNombreCodigo } from '../modelos/interfaces/nombreCodigo';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Visita Salud Mental')
@Controller('visita_salud_mental')
export class VisitaSaludMentalController {

    constructor(private readonly visitaSaludMentalService: VisitaSaludMentalService) {}

    @Post()
    async crearVisitaSaludMental(@Body() crearVisitaSaludMentalDto: crearNombreCodigo): Promise<VisitaSaludMental> {
        return await this.visitaSaludMentalService.crearVisitaSaludMental(crearVisitaSaludMentalDto);
    }

    @Get()
    async buscarTodo(): Promise<VisitaSaludMental[]> {
        return await this.visitaSaludMentalService.buscarTodo();
    }

    @Get(':id')
    async getVisitaSaludMentalById(@Param('id') id: number): Promise<VisitaSaludMental | undefined> {
        return await this.visitaSaludMentalService.getVisitaSaludMentalById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarVisitaSaludMentalDto: actualizarNombreCodigo): Promise<VisitaSaludMental> {
        return await this.visitaSaludMentalService.actualizar(id, actualizarVisitaSaludMentalDto);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.visitaSaludMentalService.eliminar(id);
    }
}
