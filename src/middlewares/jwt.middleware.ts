import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstantes } from 'src/auth/constants/jwt.constant';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const encabezadoAuth = req.headers['authorization'];
    if (!encabezadoAuth) {
      throw new UnauthorizedException('Middleware detecto: Token no proporcionado');
    }

    const token = encabezadoAuth.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Middleware detecto: Token no proporcionado');
    }

    try {
      const tokenDecodificado = jwt.verify(token, jwtConstantes.secret); 
      req['user'] = tokenDecodificado;
      next();
    } catch (error) {
      throw new UnauthorizedException('Middleware detecto: Token inválido');
    }
  }
}
