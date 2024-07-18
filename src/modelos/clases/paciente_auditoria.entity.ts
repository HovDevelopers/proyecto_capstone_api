import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from './paciente.entity';
import { Usuario } from './usuario.entity';

@Entity('paciente_auditoria')
export class PacienteAuditoria {
  @PrimaryGeneratedColumn()
  id_paciente_auditoria: number;

  @ManyToOne(() => Paciente, paciente => paciente.id_paciente)
  @JoinColumn({ name: 'id_paciente' })
  id_paciente: Paciente;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: Usuario;

  @Column({ type: 'int'})
  n_ficha: number;

  @Column({ type: 'text', nullable: true })
  rut: string;

  @Column({ type: 'text', nullable: true })
  pasaporte: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'text' })
  nombres: string;

  @Column({ type: 'text', nullable: true })
  nombre_social: string;

  @Column({ type: 'text' })
  apellido_paterno: string;

  @Column({ type: 'text', nullable: true })
  apellido_materno: string;

  @Column({ type: 'text' })
  prevision: string;

  @Column({ type: 'text' })
  sexo: string;

  @Column({ type: 'text', nullable: true })
  genero: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_modificacion: Date;

  @Column({ type: 'boolean' })
  prais: boolean;
}
