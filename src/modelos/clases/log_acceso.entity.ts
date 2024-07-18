import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('log_acceso')
export class LogAcceso {

  @PrimaryGeneratedColumn()
  id_log_acceso: number;

  @Column({ type: 'timestamp'})
  fecha_registro: Date;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  @JoinColumn({ name: 'id_usuario' })
  @Column({ nullable: true })
  id_usuario: Usuario;

  @Column({ type: 'text' }) 
  ip_privada: string;

  @Column({ type: 'text' })
  ip_publica: string;

  @Column({ type: 'text' })
  informacion_dispositivo: string;

  @Column({ type: 'text' })
  resultado_acceso: string;
}
