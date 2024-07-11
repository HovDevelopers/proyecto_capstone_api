import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ActividadGrupal } from 'src/modelos/clases/actividad_grupal.entity';
import { Profesional } from 'src/modelos/clases/profesional.entity';

@Entity('actividad_grupal_profesional')
export class ActividadGrupalProfesional {

  @PrimaryGeneratedColumn()
  id_actividad_grupal_profesional: number;

  @ManyToOne(() => ActividadGrupal, actividadGrupal => actividadGrupal.id_actividad_grupal)
  @JoinColumn({ name: 'id_actividad_grupal' })
  id_actividad_grupal: ActividadGrupal;

  @ManyToOne(() => Profesional, profesional => profesional.id_profesional)
  @JoinColumn({ name: 'id_profesional' })
  profesional: Profesional;
} 
