import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_actividades_grupales')
export class TipoActividadesGrupales {

  @PrimaryGeneratedColumn()
  id_tipo_actividades_grupales: number;

  @Column({ type: 'text'})
  nombre: string;

  
}