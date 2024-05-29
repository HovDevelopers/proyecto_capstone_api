import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsuarioModule } from './modulos/usuario.module';
import { ProfesionalModule } from './modulos/profesional.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteModule } from './modulos/paciente.module';
import { EspecialidadModule } from './modulos/especialidad.module';
import { RolModule } from './modulos/rol.module';
import { EstadoUsuarioModule } from './modulos/estado_usuario.module';
import { EstadoInformeModule } from './modulos/estado_informe.module';
import { ActividadModule } from './modulos/actividad.module';
import { FactoresModule } from './modulos/factores.module';
import { ProcedimientoModule } from './modulos/procedimiento.module';
import { TestModule } from './modulos/test.module';
import { TipoPacienteModule } from './modulos/tipo_paciente.module';
import { VisitaSaludMentalModule } from './modulos/visita_salud_mental.module';
import { DiagnosticoModule } from './modulos/diagnostico.module';
import { DispositivoModule } from './modulos/dispositivo.module';
import { ProcedenciaConsultaModule } from './modulos/procedencia_consulta.module';
import { ProcedenciaConsultaNuevoModule } from './modulos/procedencia_consulta_nuevo.module';
import { InformeDiarioModule } from './modulos/informe_diario.module';
import { AuthModule } from './modulos/auth.module';
import { typeOrmConfig } from './conexion_db/db';
import { UrgenciaModule } from './modulos/urgencia.module';
import { ComisionIngresoModule } from './modulos/comision_ingreso.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsuarioModule, ProfesionalModule, PacienteModule, EspecialidadModule, RolModule,
    EstadoUsuarioModule, EstadoInformeModule, ActividadModule, FactoresModule, ProcedimientoModule, 
    TestModule, TipoPacienteModule, VisitaSaludMentalModule, DiagnosticoModule, DispositivoModule, 
    ProcedenciaConsultaModule, ProcedenciaConsultaNuevoModule, InformeDiarioModule, AuthModule, 
    UrgenciaModule, ComisionIngresoModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware)
    .exclude(
      { path: 'auth/login', method: RequestMethod.POST }
    )
    .forRoutes('*');
  }
}
