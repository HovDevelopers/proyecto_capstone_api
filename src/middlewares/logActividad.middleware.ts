import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogActividadMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    req.body.ip_privada = this.getClienteIp(req);
    req.body.ip_publica = this.getPublicIp(req);
    next();
  }

  private getClienteIp(req: Request): string {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipString = Array.isArray(ip) ? ip[0] : ip;
    return this.convertIp(ipString);
  }

  private getPublicIp(req: Request): string {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipString = Array.isArray(ip) ? ip[0] : ip;
    return this.convertIp(ipString);
  }

  private convertIp(ip: string): string {
    if (ip === '::1') {
      return '127.0.0.1'; // Convertir IPv6 loopback a IPv4 loopback
    }
    return ip;
  }
}
