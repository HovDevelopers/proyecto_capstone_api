import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('paciente')
export class Paciente {
  
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Column({ unique: true })
  n_ficha: number;

  @Column({ nullable: true, type: 'text' })
  rut: string;

  @Column({ nullable: true, type: 'text' })
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

  @Column({ type: 'text'})
  prevision: string;

  @Column({ type: 'text'})
  sexo: string;

  @Column({ type: 'text', nullable: true})
  genero: string;
}
