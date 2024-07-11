import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Consultoria } from 'src/modelos/clases/consultoria.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';

@Entity('consultoria_profesional')
export class ConsultoriaProfesional {

  @PrimaryGeneratedColumn()
  id_consultoria_profesional: number;

  @ManyToOne(() => Consultoria, consultoria => consultoria.id_consultoria)
  @JoinColumn({ name: 'id_consultoria' })
  id_consultoria: Consultoria;

  @ManyToOne(() => Profesional, profesional => profesional.id_profesional)
  @JoinColumn({ name: 'id_profesional' })
  profesional: Profesional;
} 
