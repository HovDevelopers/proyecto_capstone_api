import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estado_usuario')
export class EstadoUsuario {
  
  @PrimaryGeneratedColumn()
  id_estado_usuario: number;

  @Column({ type: 'text' })
  nombre: string;
}
