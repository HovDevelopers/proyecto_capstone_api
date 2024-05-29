import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('visita_salud_mental')
export class VisitaSaludMental {
  
  @PrimaryGeneratedColumn()
  id_visita_salud_mental: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ nullable: true })
  codigo: number;
}
