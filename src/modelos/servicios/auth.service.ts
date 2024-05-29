import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modelos/servicios/usuario.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
                private readonly usuarioService: UsuarioService){}

    async login({nombre_usuario, clave}: login){
        const usuario = await this.usuarioService.getUsuarioByNombreUsuario(nombre_usuario);
        
        if(!usuario) {
            throw new UnauthorizedException('Credenciales erroneas');
        }
        
        if(usuario.id_estado_usuario.id_estado_usuario === 1){ // activo = 1, inactivo = 2
            const claveCorrecta = await bcryptjs.compare(clave, usuario.clave);

            if(claveCorrecta){
                const payload = {
                                id_usuario: usuario.id_usuario, 
                                id_rol: usuario.id_rol.id_rol,
                                id_profesional: usuario.id_profesional.id_profesional
                };
                return this.jwtService.sign(payload);
            
            }else{
                throw new UnauthorizedException('Credenciales erroneas');
            }
        }else{
            throw new UnauthorizedException('Usuario no activo');
        }        
    }

    /*async perfil ({id_usuario, id_rol, estado_usuario}: {id_usuario: number, id_rol:number , estado_usuario: number}){
        return await this.usuarioService.getUsuarioById(id_usuario);
    }*/
}
