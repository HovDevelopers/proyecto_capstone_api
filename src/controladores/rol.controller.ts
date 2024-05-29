import { Body, Controller, Param, Patch, Delete,Post, Get } from '@nestjs/common';
import { RolService } from '../modelos/servicios/rol.service';
import { crearNombre } from '../modelos/interfaces/nombre';
import { actualizarNombre } from '../modelos/interfaces/nombre';
import { Rol } from 'src/modelos/clases/rol.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rol')
@Controller('rol')
export class RolController {

    constructor(private readonly rolService: RolService) {}

    @Post()
    async crearRol(@Body() Rol: crearNombre) {
        return this.rolService.crearRol(Rol);
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
    async actualizar(@Param('id') id: number, @Body() actualizarRol: actualizarNombre) {
        return this.rolService.actualizar(id, actualizarRol);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return this.rolService.eliminar(id);
    }
}
