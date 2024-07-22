import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoInforme } from './estado_informe.entity';
import { TipoActividadesGrupales } from './tipo_actividades_grupales.entity';
import { Dispositivo } from './dispositivo.entity';

@Entity('actividad_grupal')
export class ActividadGrupal {
  @PrimaryGeneratedColumn()
  id_actividad_grupal: number;

  @Column({ type: 'timestamp' })
  fecha_envio: Date;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.id_dispositivo)
  @JoinColumn({ name: 'id_dispositivo' })
  id_dispositivo: Dispositivo;

  @Column({ type: 'date' })
  fecha_consulta: Date;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_termino: string;

  @ManyToOne(() => TipoActividadesGrupales, tipoActividadesGrupales => tipoActividadesGrupales.id_tipo_actividades_grupales)
  @JoinColumn({ name: 'id_actividad' })
  id_actividad: TipoActividadesGrupales;

  @Column({ type: 'int', nullable: true })
  presentes: number;

  @Column({ type: 'text', nullable: true })
  otra_actividad: string;

  @ManyToOne(() => EstadoInforme, estadoInforme => estadoInforme.id_estado_informe)
  @JoinColumn({ name: 'id_estado_informe' })
  id_estado_informe: EstadoInforme;
}
