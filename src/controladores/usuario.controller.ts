import { Body, Controller, Param, Patch, Post, Get, Delete } from '@nestjs/common';
import { UsuarioService } from '../modelos/servicios/usuario.service';
import { Usuario } from 'src/modelos/clases/usuario.entity';
import { actualizarUsuario } from '../modelos/interfaces/usuario';
import { crearUsuario } from '../modelos/interfaces/usuario';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){}

    @Post()
    crearUsuario(@Body() usuario: crearUsuario){
        return this.usuarioService.crearUsuario(usuario);
    }

    @Get()
    async buscarTodo(): Promise<Usuario[]> {
        return await this.usuarioService.buscarTodo();
    }

    @Get(':id')
    async getUsuarioById(@Param('id') id: number): Promise<Usuario | undefined> {
        return await this.usuarioService.getUsuarioById(id);
    }

    @Get('nombre_usuario/:nombre_usuario')
    async getUsuarioByNombreUsuario(@Param('nombre_usuario') nombre_usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioService.getUsuarioByNombreUsuario(nombre_usuario);
    }

    @Patch(':id')
    async actualizar(@Param('id') id: number, @Body() actualizarUsuario: actualizarUsuario): Promise<Usuario> {
        return await this.usuarioService.actualizar(id, actualizarUsuario);
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number): Promise<void> {
        return await this.usuarioService.eliminar(id);
    }
}
