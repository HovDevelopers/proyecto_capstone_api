import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';
import { Especialidad } from './especialidad.entity';

@Entity('informe_diario_profesional')
export class InformeDiarioProfesional {

  @PrimaryGeneratedColumn()
  id_informe_profesional: number;

  @ManyToOne(() => InformeDiario, informeDiario => informeDiario.id_informe_diario)
  @JoinColumn({ name: 'id_informe_diario' })
  id_informe_diario: InformeDiario;

  @ManyToOne(() => Profesional, profesional => profesional.id_profesional)
  @JoinColumn({ name: 'id_profesional' })
  profesional: Profesional;

}
