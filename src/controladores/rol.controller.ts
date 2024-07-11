import { Body, Controller, Param, Patch, Delete,Post, Get, Req } from '@nestjs/common';
import { RolService } from '../modelos/servicios/rol.service';
import { nombre } from '../modelos/interfaces/nombre.interface';
import { Rol } from 'src/modelos/clases/rol.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rol')
@Controller('rol')
export class RolController {

    constructor(private readonly rolService: RolService) {}

    @Post()
    async crearRol(@Body() Rol: nombre, @Req() req: any) {
        return this.rolService.crearRol(Rol, req);
    }

    @Get()
    async buscarTodo(): Promise<Rol[]> {
        return this.rolService.buscarTodo();
    }

    @Get(':id')
    async getRolById(@Param('id') id: number): Promise<Rol | undefined> {
        return this.rolService.getRolById(id);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarRol: nombre) {
        return this.rolService.actualizar(id, actualizarRol);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.rolService.eliminar(id);
    }
}
