import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modelos/servicios/usuario.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAcceso } from 'src/modelos/clases/log_acceso.entity';
import * as bcryptjs from 'bcryptjs';
import { jwtConstantes } from 'src/auth/constants/jwt.constant';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuarioService,
    @InjectRepository(LogAcceso)
    private readonly logAccesoRepository: Repository<LogAcceso>,
  ) {}

  async login({ nombre_usuario, clave }: { nombre_usuario: string, clave: string }, req: any) {
    const usuario = await this.usuarioService.getUsuarioByNombreUsuario(nombre_usuario);
    const logAcceso = new LogAcceso();
    
    logAcceso.id_usuario = usuario ? usuario : null;
    logAcceso.fecha_registro = new Date();
    logAcceso.ip_privada = req.body.ip_privada;
    logAcceso.ip_publica = req.body.ip_publica;
    logAcceso.informacion_dispositivo = JSON.stringify(req.body.informacion_dispositivo);
    
    try {
      if (!usuario) {
        logAcceso.resultado_acceso = 'usuario no registrado';
        await this.logAccesoRepository.save(logAcceso);
        throw new UnauthorizedException('Usuario no registrado');
      }

      if (usuario.id_estado_usuario.id_estado_usuario === 1) { // activo = 1, inactivo = 2
        const claveCorrecta = await bcryptjs.compare(clave, usuario.clave);

        if (claveCorrecta) {
          const payload = {
            id_usuario: usuario.id_usuario,
            id_rol: usuario.id_rol.id_rol,
            id_profesional: usuario.id_profesional.id_profesional,
          };
          logAcceso.resultado_acceso = 'ingreso exitoso';
          await this.logAccesoRepository.save(logAcceso);
          return {
            usuario,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '1h' })
          };
        } else {
          logAcceso.resultado_acceso = 'contraseña incorrecta';
          await this.logAccesoRepository.save(logAcceso);
          throw new UnauthorizedException('Contraseña incorrecta');
        }
      } else { 
        logAcceso.resultado_acceso = 'usuario no activo';
        await this.logAccesoRepository.save(logAcceso);
        throw new UnauthorizedException('Usuario no activo');
      }
    } catch (error) {
      await this.logAccesoRepository.save(logAcceso);
      throw error;
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: jwtConstantes.secret });
      const newPayload: jwt.JwtPayload = { id_usuario: payload.id_usuario,
        id_rol: payload.id_rol,
        id_profesional: payload.id_profesional, };
      return {
        access_token: this.jwtService.sign(newPayload),
        refresh_token: this.jwtService.sign(newPayload, { expiresIn: '1h' }),
      };
    } catch (e) {
      throw new Error('Invalid refresh token');
    } 
  }
}
