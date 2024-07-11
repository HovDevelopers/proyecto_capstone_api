import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogActividad } from '../clases/log_actividad.entity';
import { crearLogActividad } from '../interfaces/logActividad.interface';

@Injectable()
export class LogActividadService {
  constructor(
    @InjectRepository(LogActividad)
    private readonly logActividadRepository: Repository<LogActividad>,
  ) {}

  async crearActividad(crearLogActividad: crearLogActividad): Promise<void> {
    await this.logActividadRepository.save(crearLogActividad);
  }

  async insertarActividad(req: any, tipo_actividad: string, informacion_nueva: any) {
    const logActividad = new LogActividad();

    logActividad.id_usuario = req.user.id_usuario ? req.user.id_usuario : null;
    logActividad.ip_privada = req.body.ip_privada;
    logActividad.ip_publica = req.body.ip_publica;
    logActividad.tipo_actividad = tipo_actividad;
    logActividad.informacion_nueva = JSON.stringify(informacion_nueva);

    await this.crearActividad(logActividad);
  }

  async modificarActividad(req: any, tipo_actividad: string, informacion_anterior: any, informacion_nueva: any) {
    const logActividad = new LogActividad();

    logActividad.id_usuario = req.user.id_usuario ? req.user.id_usuario : null;
    logActividad.ip_privada = req.body.ip_privada;
    logActividad.ip_publica = req.body.ip_publica;
    logActividad.tipo_actividad = tipo_actividad;
    logActividad.informacion_anterior = JSON.stringify(informacion_anterior);
    logActividad.informacion_nueva = JSON.stringify(informacion_nueva);

    await this.crearActividad(logActividad);
  }

  async eliminarActividad(req: any, tipo_actividad: string, informacion_anterior: any) {
    const logActividad = new LogActividad();

    logActividad.id_usuario = req.user.id_usuario ? req.user.id_usuario : null;
    logActividad.ip_privada = req.body.ip_privada;
    logActividad.ip_publica = req.body.ip_publica;
    logActividad.tipo_actividad = tipo_actividad;
    logActividad.informacion_anterior = JSON.stringify(informacion_anterior);

    await this.crearActividad(logActividad);
  }
}
