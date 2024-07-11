import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { actualizarInformeDiario } from 'src/modelos/interfaces/informeDiario.interface';
import { crearInformeDiario } from 'src/modelos/interfaces/informeDiario.interface';
import { InformeDiario } from 'src/modelos/clases/informe_diario.entity';
import { Repository } from 'typeorm';
import { LogActividadService } from './log_actividad.service';
import { PacienteService } from './paciente.service';

@Injectable()
export class InformeDiarioService {

    constructor(@InjectRepository(InformeDiario) private repoInformeDiario: Repository<InformeDiario>,
    private readonly logActividadService: LogActividadService,
    private pacienteService: PacienteService){}

    async crearInformeDiario(informeDiario: crearInformeDiario, req: any){
    
        const idPacienteAud = await this.pacienteService.crearVersionPaciente(informeDiario.id_paciente, req);
        const informeDiarioNuevo = this.repoInformeDiario.create({
            ...informeDiario,
            id_paciente_auditoria: idPacienteAud // Asigna el id del paciente auditoría aquí
        });

        await this.logActividadService.insertarActividad(
            req,
            'Inserción Informe Diario',
            informeDiario
        );
        return await this.repoInformeDiario.save(informeDiarioNuevo);
    }

    async buscarTodo(): Promise<InformeDiario[]> {
        return await this.repoInformeDiario.find({ relations: ['id_paciente_auditoria', 'id_dispositivo', 'id_procedencia',
                                                 'id_actividad', 'id_tipo_paciente', 'id_visita_salud_mental', 
                                                 'id_procedimiento', 'id_factor', 'id_test', 'id_estado_informe',
                                                 'diagnostico_principal'] });
    }

    async getInformeDiarioById(id: number): Promise<InformeDiario | undefined> {
        return await this.repoInformeDiario.findOne({ where: { id_informe_diario: id }, relations: ['id_paciente_auditoria', 
                                                    'id_dispositivo', 'id_procedencia','id_actividad', 
                                                    'id_tipo_paciente', 'id_visita_salud_mental', 
                                                    'id_procedimiento', 'id_factor', 'id_test', 'id_estado_informe',
                                                    'diagnostico_principal'] });
    }

    async obtenerUltimoDiagnostico(idPaciente: number): Promise<DiagnosticoConOtro | null> {
        const query = `
        SELECT 
            d.id_diagnostico,
            d.nombre,
            d.bool_GES,
            ultimo_informe.otro_diagnostico
        FROM (
            SELECT diagnostico_principal, fecha_consulta, otro_diagnostico
            FROM informe_diario 
            INNER JOIN paciente_auditoria pa ON informe_diario.id_paciente_auditoria = pa.id_paciente_auditoria
            WHERE pa.id_paciente = ? AND diagnostico_principal != 30
            
            UNION ALL
            
            SELECT diagnostico_principal, fecha_consulta, otro_diagnostico
            FROM consultoria 
            INNER JOIN paciente_auditoria pa ON consultoria.id_paciente_auditoria = pa.id_paciente_auditoria
            WHERE pa.id_paciente = ? AND diagnostico_principal != 30
            
            UNION ALL
            
            SELECT diagnostico_principal, fecha_consulta, otro_diagnostico
            FROM urgencia 
            INNER JOIN paciente_auditoria pa ON urgencia.id_paciente_auditoria = pa.id_paciente_auditoria
            WHERE pa.id_paciente = ? AND diagnostico_principal != 30
            
            UNION ALL
            
            SELECT diagnostico_principal, fecha_consulta, otro_diagnostico
            FROM comision_ingreso 
            INNER JOIN paciente_auditoria pa ON comision_ingreso.id_paciente_auditoria = pa.id_paciente_auditoria
            WHERE pa.id_paciente = ? AND diagnostico_principal != 30
            
        ) AS ultimo_informe
        INNER JOIN diagnostico d ON ultimo_informe.diagnostico_principal = d.id_diagnostico
        ORDER BY ultimo_informe.fecha_consulta DESC
        LIMIT 1;
        `;
    
        const result = await this.repoInformeDiario.query(query, [idPaciente, idPaciente, idPaciente, idPaciente]);
    
        if (result.length > 0) {
            const row = result[0];
            const diagnostico: DiagnosticoConOtro = {
                id_diagnostico: row.id_diagnostico,
                nombre: row.nombre,
                bool_GES: row.bool_GES,
            };
            
            if (row.id_diagnostico === 29 && row.otro_diagnostico) {
                diagnostico.otro_diagnostico = row.otro_diagnostico;
            }
    
            return diagnostico;
        } else {
            return null;
        }
    }
    

    async actualizar(id: number, actualizarInformeDiario: actualizarInformeDiario): Promise<InformeDiario> {
        const informeDiario = await this.repoInformeDiario.findOne({ where: { id_informe_diario: id } });
        if (!informeDiario) {
            return null;
        }
        Object.assign(informeDiario, actualizarInformeDiario);
        return await this.repoInformeDiario.save(informeDiario);
    }

    async eliminar(id: number): Promise<void> {
        const result = await this.repoInformeDiario.delete(id);
        if (result.affected === 0) {
            throw new Error(`No se encontró el InformeDiario con ID ${id}`);
        }
    }
}
