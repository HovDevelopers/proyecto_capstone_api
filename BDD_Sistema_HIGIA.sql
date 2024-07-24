#============== Eliminar tablas existentes  ============== 

DROP TABLE IF EXISTS pacientes_actividad_grupal;

DROP TABLE IF EXISTS actividad_grupal_profesional;
DROP TABLE IF EXISTS consultoria_profesional;
DROP TABLE IF EXISTS comision_ingreso_profesional;
DROP TABLE IF EXISTS urgencia_profesional;
DROP TABLE IF EXISTS informe_diario_profesional;

DROP TABLE IF EXISTS informe_diario;
DROP TABLE IF EXISTS consultoria;
DROP TABLE IF EXISTS urgencia;
DROP TABLE IF EXISTS comision_ingreso;
DROP TABLE IF EXISTS actividad_grupal;

-- Eliminación de tablas restantes
DROP TABLE IF EXISTS log_acceso;
DROP TABLE IF EXISTS log_actividad;
DROP TABLE IF EXISTS paciente_auditoria;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS paciente;
DROP TABLE IF EXISTS profesional;
DROP TABLE IF EXISTS estado_usuario;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS estado_informe;
DROP TABLE IF EXISTS procedencia_consulta;
DROP TABLE IF EXISTS procedencia_comision_ingreso;
DROP TABLE IF EXISTS procedencia_consulta_nuevo;
DROP TABLE IF EXISTS dispositivo;
DROP TABLE IF EXISTS actividad;
DROP TABLE IF EXISTS tipo_actividades_grupales;
DROP TABLE IF EXISTS tipo_paciente;
DROP TABLE IF EXISTS visita_salud_mental;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS factores;
DROP TABLE IF EXISTS procedimiento;
DROP TABLE IF EXISTS diagnostico;
DROP TABLE IF EXISTS especialidad;

#============== creación usuarios, profesionales y pacientes ============== 
CREATE TABLE rol (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE estado_usuario (
  id_estado_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE especialidad (
  id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE profesional (
  id_profesional INT AUTO_INCREMENT PRIMARY KEY,
  rut_profesional TEXT NOT NULL,
  nombres TEXT NOT NULL,
  apellido_paterno TEXT NOT NULL,
  apellido_materno TEXT,
  correo TEXT NOT NULL,
  id_especialidad INT NOT NULL,
  FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad)
);

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY ,
  id_profesional INT NOT NULL,
  fecha_creacion TIMESTAMP NOT NULL,
  nombre_usuario TEXT NOT NULL,
  clave TEXT NOT NULL,
  id_rol INT NOT NULL,
  id_estado_usuario INT NOT NULL,
  FOREIGN KEY (id_profesional) REFERENCES profesional(id_profesional),
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
  FOREIGN KEY (id_estado_usuario) REFERENCES estado_usuario(id_estado_usuario)
);

CREATE TABLE paciente (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    n_ficha INT NOT NULL UNIQUE,
    rut TEXT,
    pasaporte TEXT,
    fecha_nacimiento DATE NOT NULL,
    nombres TEXT NOT NULL,
    nombre_social TEXT,
    apellido_paterno TEXT NOT NULL,
    apellido_materno TEXT,
    prevision TEXT NOT NULL,
    sexo TEXT NOT NULL,
    genero TEXT,
	prais boolean NOT NULL
);

CREATE TABLE paciente_auditoria (
    id_paciente_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_usuario INT NOT NULL,
    n_ficha INT NOT NULL,
    rut TEXT,
    pasaporte TEXT,
    fecha_nacimiento DATE NOT NULL,
    nombres TEXT NOT NULL,
    nombre_social TEXT,
    apellido_paterno TEXT NOT NULL,
    apellido_materno TEXT,
    prevision TEXT NOT NULL,
    sexo TEXT NOT NULL,
    genero TEXT,
    fecha_modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	prais boolean NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE log_acceso (
  id_log_acceso INT AUTO_INCREMENT PRIMARY KEY,
  fecha_registro TIMESTAMP NOT NULL,
  id_usuario INT,
  ip_privada TEXT NOT NULL,
  ip_publica TEXT NOT NULL,
  informacion_dispositivo TEXT NOT NULL,
  resultado_acceso TEXT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE log_actividad (
  id_log_actividad INT AUTO_INCREMENT PRIMARY KEY,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT NOT NULL,
  ip_privada TEXT NOT NULL,
  ip_publica TEXT NOT NULL,
  tipo_actividad TEXT NOT NULL,
  informacion_anterior TEXT,
  informacion_nueva TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

#============== creación actividades ==============
CREATE TABLE actividad (
  id_actividad INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE tipo_actividades_grupales (
  id_tipo_actividades_grupales INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE tipo_paciente (
  id_tipo_paciente INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE visita_salud_mental (
  id_visita_salud_mental INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE test (
  id_test INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE factores (
  id_factor INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE procedimiento (
  id_procedimiento INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

#============== creación diagnostico, dispositivo, procedencia consulta ==============

CREATE TABLE procedencia_consulta (
  id_procedencia_consulta INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE procedencia_comision_ingreso (
  id_procedencia_comision_ingreso INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE procedencia_consulta_nuevo (
  id_procedencia_nuevo INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE dispositivo (
  id_dispositivo INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL,
  estado boolean NOT NULL
);

CREATE TABLE diagnostico (
  id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL,
  bool_GES boolean
);

#============== creación estado informe ==============

CREATE TABLE estado_informe (
  id_estado_informe INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);


#============== creación informes ============== 
CREATE TABLE informe_diario (
  id_informe_diario INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente_auditoria INT NOT NULL,
  fecha_envio TIMESTAMP NOT NULL,
  fecha_consulta DATE NOT NULL,
  id_dispositivo INT NOT NULL,
  id_procedencia_consulta INT NOT NULL,
  id_actividad INT NOT NULL,
  id_tipo_paciente TEXT NOT NULL,
  id_visita_salud_mental INT,
  id_procedimiento INT,
  id_factor TEXT NOT NULL,
  id_test INT,
  id_estado_informe INT NOT NULL,
  diagnostico_principal INT NOT NULL,
  diagnosticos_secundarios TEXT NOT NULL,
  otro_diagnostico TEXT,
  otro_procedimiento TEXT,
  otro_test TEXT,
  cronico boolean NOT NULL,
  FOREIGN KEY (id_paciente_auditoria) REFERENCES paciente_auditoria(id_paciente_auditoria),
  FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),
  FOREIGN KEY (id_procedencia_consulta) REFERENCES procedencia_consulta(id_procedencia_consulta),
  FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad),
  FOREIGN KEY (id_visita_salud_mental) REFERENCES visita_salud_mental(id_visita_salud_mental),
  FOREIGN KEY (id_procedimiento) REFERENCES procedimiento(id_procedimiento),
  FOREIGN KEY (id_test) REFERENCES test(id_test),
  FOREIGN KEY (id_estado_informe) REFERENCES estado_informe(id_estado_informe),
  FOREIGN KEY (diagnostico_principal) REFERENCES diagnostico(id_diagnostico)
);
	
CREATE TABLE consultoria (
  id_consultoria INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente_auditoria INT NOT NULL,
  nombre_consultorio TEXT NOT NULL,
  fecha_envio TIMESTAMP NOT NULL,
  fecha_consulta DATE NOT NULL,
  id_dispositivo INT NOT NULL,
  consulta TEXT NOT NULL,
  tipo_consultoria TEXT NOT NULL,
  revision_consulta TEXT NOT NULL,
  sename BIT NOT NULL,
  interconsulta BIT NOT NULL,
  id_estado_informe INT NOT NULL,
  diagnostico_principal INT NOT NULL,
  diagnosticos_secundarios TEXT NOT NULL,
  otro_diagnostico TEXT,
  FOREIGN KEY (id_paciente_auditoria) REFERENCES paciente_auditoria(id_paciente_auditoria),
  FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),
  FOREIGN KEY (id_estado_informe) REFERENCES estado_informe(id_estado_informe),
  FOREIGN KEY (diagnostico_principal) REFERENCES diagnostico(id_diagnostico)
);

CREATE TABLE urgencia (
  id_urgencia INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente_auditoria INT NOT NULL,
  en_turno BIT NOT NULL,
  fecha_envio TIMESTAMP NOT NULL,
  fecha_consulta DATE NOT NULL,
  id_dispositivo INT NOT NULL,
  id_procedencia_consulta INT NOT NULL,
  id_actividad INT NOT NULL,
  id_tipo_paciente TEXT NOT NULL,
  id_factor TEXT NOT NULL,
  id_estado_informe INT NOT NULL,
  diagnostico_principal INT NOT NULL,
  diagnosticos_secundarios TEXT NOT NULL,
  otro_diagnostico TEXT,
  FOREIGN KEY (id_paciente_auditoria) REFERENCES paciente_auditoria(id_paciente_auditoria),
  FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),
  FOREIGN KEY (id_procedencia_consulta) REFERENCES procedencia_consulta(id_procedencia_consulta),
  FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad),
  FOREIGN KEY (id_estado_informe) REFERENCES estado_informe(id_estado_informe),
  FOREIGN KEY (diagnostico_principal) REFERENCES diagnostico(id_diagnostico)
);

CREATE TABLE comision_ingreso (
  id_comision_ingreso INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente_auditoria INT NOT NULL,
  fecha_envio TIMESTAMP NOT NULL,
  fecha_consulta DATE NOT NULL,
  id_dispositivo INT NOT NULL,
  id_procedencia_comision_ingreso INT NOT NULL,
  id_actividad INT NOT NULL,
  id_tipo_paciente TEXT NOT NULL,
  id_factor TEXT NOT NULL,
  id_estado_informe INT NOT NULL,
  id_procedencia_nuevo INT NOT NULL,
  diagnostico_principal INT NOT NULL,
  diagnosticos_secundarios TEXT NOT NULL,
  otro_diagnostico TEXT,
  FOREIGN KEY (id_paciente_auditoria) REFERENCES paciente_auditoria(id_paciente_auditoria),
  FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),
  FOREIGN KEY (id_procedencia_comision_ingreso) REFERENCES procedencia_comision_ingreso(id_procedencia_comision_ingreso),
  FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad),
  FOREIGN KEY (id_estado_informe) REFERENCES estado_informe(id_estado_informe),
  FOREIGN KEY (id_procedencia_nuevo) REFERENCES procedencia_consulta_nuevo(id_procedencia_nuevo),
  FOREIGN KEY (diagnostico_principal) REFERENCES diagnostico(id_diagnostico)
);

CREATE TABLE actividad_grupal (
  id_actividad_grupal INT AUTO_INCREMENT PRIMARY KEY,
  fecha_envio TIMESTAMP NOT NULL,
  fecha_consulta DATE NOT NULL,
  id_dispositivo INT NOT NULL,
  id_actividad INT NOT NULL,
  presentes INT,
  otra_actividad TEXT,
  hora_inicio TIME NOT NULL,
  hora_termino TIME NOT NULL,
  id_estado_informe INT NOT NULL,
  FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),
  FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad),
  FOREIGN KEY (id_estado_informe) REFERENCES estado_informe(id_estado_informe)
);

#============== creación relacion profesional, diagnostico, informe ============== 


CREATE TABLE informe_diario_profesional (
  id_informe_profesional INT AUTO_INCREMENT PRIMARY KEY,
  id_informe_diario INT NOT NULL,
  id_profesional INT NOT NULL,
  FOREIGN KEY (id_informe_diario) REFERENCES informe_diario(id_informe_diario),
  FOREIGN KEY (id_profesional) REFERENCES profesional(id_profesional)
);

CREATE TABLE urgencia_profesional (
  id_urgencia_profesional INT AUTO_INCREMENT PRIMARY KEY,
  id_urgencia INT NOT NULL,
  id_profesional INT NOT NULL,
  FOREIGN KEY (id_urgencia) REFERENCES urgencia(id_urgencia),
  FOREIGN KEY (id_profesional) REFERENCES profesional(id_profesional)
);

CREATE TABLE comision_ingreso_profesional (
  id_comision_profesional INT AUTO_INCREMENT PRIMARY KEY,
  id_comision_ingreso INT NOT NULL,
  id_profesional INT NOT NULL,
  FOREIGN KEY (id_comision_ingreso) REFERENCES comision_ingreso(id_comision_ingreso),
  FOREIGN KEY (id_profesional) REFERENCES profesional(id_profesional)
);

CREATE TABLE consultoria_profesional (
  id_consultoria_profesional INT AUTO_INCREMENT PRIMARY KEY,
  id_consultoria INT NOT NULL,
  id_profesional INT NOT NULL,
  FOREIGN KEY (id_consultoria) REFERENCES consultoria(id_consultoria),
  FOREIGN KEY (id_profesional) REFERENCES profesional(id_profesional)
);

CREATE TABLE actividad_grupal_profesional (
  id_actividad_grupal_profesional INT AUTO_INCREMENT PRIMARY KEY,
  id_actividad_grupal INT NOT NULL,
  id_profesional INT NOT NULL,
  FOREIGN KEY (id_actividad_grupal) REFERENCES actividad_grupal(id_actividad_grupal),
  FOREIGN KEY (id_profesional) REFERENCES profesional(id_profesional)
);

-- Relacion entre pacientes y la actividad grupal
CREATE TABLE pacientes_actividad_grupal (
  id_paciente_actividad_grupal INT PRIMARY KEY AUTO_INCREMENT,
  id_actividad_grupal INT NOT NULL,
  id_paciente_auditoria INT NOT NULL,
  sename boolean NOT NULL,
  FOREIGN KEY (id_actividad_grupal) REFERENCES actividad_grupal(id_actividad_grupal),
  FOREIGN KEY (id_paciente_auditoria) REFERENCES paciente_auditoria(id_paciente_auditoria)
);

# ================================== INSERTS ======================================
# =================================================================================
# =================================================================================
-- Inserts Modulos usuario
INSERT INTO rol (nombre) VALUES ('Administrador'), ('Jefatura Psiquiatría'), ('Jefatura Estadística'), 
								('Personal Psiquiatría'), ('Personal Estadística');

INSERT INTO estado_usuario (nombre) VALUES ('Activo'), ('Inactivo');

INSERT INTO especialidad (nombre) VALUES ('TIC'),('Estadística'),('Médico Psiquiatra Adultos'), ('Médico Psiquiatra Infanto Adolescente'), ('Médico General'), ('Psicólogo'),
										('Enfermera'), ('Trabajador Social'), ('Terapeuta Ocupacional'), ('Psicopedagogo'), ('TENS');
                                        
INSERT INTO profesional (rut_profesional, nombres, apellido_paterno, apellido_materno,correo, id_especialidad)
VALUES ('20091616-6', 'Manuel', 'Segovia', 'Araya', 'manuel.segovia@redsalud.gob.cl', 1);

INSERT INTO usuario (id_profesional, fecha_creacion, nombre_usuario, clave, id_rol, id_estado_usuario)
VALUES (1, NOW(), '20091616-6', '$2y$10$mc5IST2jxMg0qe6QZ2G0Te/WfugLix96Ip76LBOx96Ezmi9UPEZse', 1, 1);

-- Inserts Modulos sueltos
INSERT INTO dispositivo (nombre, estado) VALUES
('CAE', true),
('CESAM', true),
('Hospital Día', true);
('Polinfanto', true);

INSERT INTO procedencia_consulta (nombre) VALUES
('Control'),
('Alta clínica'),
('Alta por abandono'),
('Alta por fallecimiento'),
('No se presentó');

INSERT INTO procedencia_comision_ingreso (nombre) VALUES
('Ingreso'),
('Alta'),
('No se presentó');

INSERT INTO procedencia_consulta_nuevo (nombre) VALUES
('APS'),
('CAE'),
('Urgencia'),
('UHCIP');

INSERT INTO diagnostico (nombre, bool_GES) VALUES
('Distimia', false),
('Depresion Leve', true),
('Depresión moderada', true),
('Depresión grave', true),
('Depresión post parto', true),
('Depresión refractaria', true),
('Depresión grave con psicosis', true),
('Depresión con alto riesgo suicida', true),
('Trastorno bipolar', true),
('Trastorno de Estrés post Traumatico', false),
('Trastorno de Panico con Agorofobia', false),
('Trastorno de Panico sin Agorofobia', false),
('Fobias Sociales', false),
('Trastomos de Ansiedad Generalizada', false),
('Otros Trastornos de Ansiedad', false),
('Demencia y Trastornos Mentales Orgánicos', false),
('Esquizofrenia 1º año (GES)', true),
('Esquizofrenia 2º año (GES)', true),
('Esquizofrenia NO GES', false),
('Trastornos Generalizados del Desarrollo', false),
('Trastornos Hipercinéticos', false),
('Trastorno de Personalidad', false),
('Tratamiento Trastorno Alimentario', false),
('Trastornos del Comportamiento y Emocionales de la Infancia y Adolescencia', false),
('Violencia Intrafamiliar - VIF', false),
('Maltrato Infantil', false),
('PRAIS - 1° Consulta', false),
('PRAIS - Tratamiento Mensual', false),
('Otros', false),
('Sin diagnóstico', false);

-- Inserts Modulos Actividades
INSERT INTO actividad (nombre) VALUES
('Consulta'), -- esta bloquea visita, procedimiento y test
('Psicodiagnóstico'), -- abre el campo de test y bloquea visita y procedimiento
('Psicoterapia'), -- esta bloquea visita, procedimiento y test
('Procedimiento'), -- abre el campo de prodecimiento y bloquea visita y test
('Visita'), -- abre el campo de visita y bloquea procedimiento y test
('Informes a Tribunal de familia'), -- esta bloquea visita, procedimiento y test
('Informes a Tribunal penales'), -- esta bloquea visita, procedimiento y test
('Informes a Tribunal civiles'),-- esta bloquea visita, procedimiento y test
('Informes a Policia Local'),-- esta bloquea visita, procedimiento y test
('Informes a Tribunal laborales'),-- esta bloquea visita, procedimiento y test
('Informes a Otros dispositivos'),-- esta bloquea visita, procedimiento y test
('Evaluación diagnóstica de otros profesionales'),  -- policlinico lo usa
('Ninguna de las anteriores');

INSERT INTO tipo_actividades_grupales (nombre) VALUES
('Intervención Psicosocial Grupal'),
('Psicoterapia Grupal C/S Co-Terapeuta'), 
('Programa Rehabilitación Tipo 1'), 
('Psicoterapia Familiar C/S Co-Terapeuta'), 
('Administración'), 
('Capacitación a Establecimientos'), 
('Docencia'), 
-- ('Informes a Tribunal penales'), 
('Reunión Extraordinaria de Equipos'),
('Reunión de Coordinación'),
('Reunión Masiva'),
('Otras');

INSERT INTO tipo_paciente (nombre) VALUES
('Gestante'),
('Sename'),
('Migrante'),
('Madre de hijo menor de 5 años'),
('Pueblo originario'),
('Demencia'),
('Programa Mejor Niñez'),
('Ninguna de las anteriores');

INSERT INTO visita_salud_mental (nombre) VALUES
('A domicilio'),
('A lugar de trabajo'),
('A la escuela'),
('Ninguna de las anteriores');

INSERT INTO procedimiento (nombre) VALUES
('TTO. Inyectable'),
('Toma de muestras'),
('Entrega de Recetas'),
('Entrega de Medicamentos'),
('Monitoreo S. Vitales'),
('Otro'),
('Ninguna de las anteriores');

INSERT INTO factores (nombre) VALUES
('Violencia Victima'),
('Violencia Agresor'),
('Abuso sexual'),
('Suicidio Ideación'),
('Suicidio Intento'),
('Ninguna de las anteriores');

INSERT INTO test (nombre) VALUES
('Test de Rorschach'),
('Test de relaciones objetales'),
('Test de Apercepción Temática, T.A.T., C.A.T.'),
('Test de Weschler, WAIS, WISC ó WPPSI'),
('Test de Bender Bip'),
('Otros test'),
('Ninguna de las anteriores');

-- Inserts Modulos informes
INSERT INTO estado_informe (nombre) VALUES
('Creado'),
('Finalizado'),
('Borrador');