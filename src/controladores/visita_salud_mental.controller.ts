import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VisitaSaludMentalService } from '../modelos/servicios/visita_salud_mental.service';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { VisitaSaludMental } from 'src/modelos/clases/visita_salud_mental.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Visita Salud Mental')
@Controller('visita_salud_mental')
export class VisitaSaludMentalController {

    constructor(private readonly visitaSaludMentalService: VisitaSaludMentalService) {}

    @Post()
    async crearVisitaSaludMental(@Body() crearVisitaSaludMental: nombre): Promise<VisitaSaludMental> {
        return await this.visitaSaludMentalService.crearVisitaSaludMental(crearVisitaSaludMental);
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
    async actualizar(@Param('id') id: number, @Body() actualizarVisitaSaludMental: nombre): Promise<VisitaSaludMental> {
        return await this.visitaSaludMentalService.actualizar(id, actualizarVisitaSaludMental);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.visitaSaludMentalService.eliminar(id);
    }
}
