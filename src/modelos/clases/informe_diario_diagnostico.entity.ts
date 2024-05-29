import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Diagnostico } from 'src/modelos/clases/diagnostico.entity';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';

@Entity('informe_diario_diagnostico')
export class InformeDiarioDiagnostico {

  @PrimaryGeneratedColumn()
  id_informe_diagnostico: number;

  @ManyToOne(() => InformeDiario, informeDiario => informeDiario.id_informe_diario)
  @JoinColumn({ name: 'id_informe_diario' })
  id_informe_diario: InformeDiario;

  @ManyToOne(() => Diagnostico, diagnostico => diagnostico.id_diagnostico)
  @JoinColumn({ name: 'id_diagnostico' })
  diagnostico: Diagnostico;
} 