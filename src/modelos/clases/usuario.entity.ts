import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Profesional } from './profesional.entity';
import { Rol } from './rol.entity';
import { EstadoUsuario } from './estado_usuario.entity';
import { Transform } from 'class-transformer';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @OneToOne(() => Profesional, profesional => profesional.id_profesional)
  @JoinColumn({ name: 'id_profesional' })
  id_profesional: Profesional;

  @Column({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'text' })
  nombre_usuario: string;

  @Transform(({value}) => value.trim()) // limpia los espacios en blanco
  @Column({ type: 'text' })
  clave: string;

  @ManyToOne(() => Rol, rol => rol.id_rol)
  @JoinColumn({ name: 'id_rol' })
  id_rol: Rol;

  @ManyToOne(() => EstadoUsuario, estadoUsuario => estadoUsuario.id_estado_usuario)
  @JoinColumn({ name: 'id_estado_usuario' })
  id_estado_usuario: EstadoUsuario;
}
