import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('log_actividad')
export class LogActividad {

  @PrimaryGeneratedColumn()
  id_log_actividad: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: Usuario;

  @Column({ type: 'text' })
  ip_privada: string;

  @Column({ type: 'text' })
  ip_publica: string;

  @Column({ type: 'text' })
  tipo_actividad: string;

  @Column({ type: 'text', nullable: true })
  informacion_anterior: string;

  @Column({ type: 'text', nullable: true })
  informacion_nueva: string;
}
