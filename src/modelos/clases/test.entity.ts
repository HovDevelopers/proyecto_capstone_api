import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test')
export class Test {

  @PrimaryGeneratedColumn()
  id_test: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ nullable: true })
  codigo: number;
}
