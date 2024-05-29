import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_paciente')
export class TipoPaciente {
    
  @PrimaryGeneratedColumn()
  id_tipo_paciente: number;

  @Column({ type: 'text'})
  nombre: string;

  @Column({ nullable: true })
  codigo: number;
}
