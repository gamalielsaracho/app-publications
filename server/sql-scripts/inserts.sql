-- TIPO DOCUMENTO.
INSERT INTO `tiposdocumentos` (`id_tipoDocumento`, `descripcion`) 
	VALUES (NULL, 'dni');

-- ROLES.
INSERT INTO `roles` (`id_rol`, `descripcion`) 
	VALUES (NULL, 'médico'), (NULL, 'enfermería'), (NULL, 'administración'),
	(NULL, 'ventanilla'), (NULL, 'farmacia'), (NULL, 'laboratorio');

-- DEPARTAMENTOS.
INSERT INTO `departamentos` (`id_departamento`, `descripcion`) 
	VALUES (NULL, 'itapua');

-- CIUDADES.
INSERT INTO `ciudades` (`id_ciudad`, `descripcion`, `id_departamento`)
	VALUES (NULL, 'encarnación', '1');

-- AREAS.
INSERT INTO `areas` (`id_area`, `descripcion`)
	VALUES (NULL, 'urbana'), (NULL, 'rural');


-- ESPECIALIDADES
INSERT INTO `especialidades` (`id_especialidad`, `descripcion`) 
	VALUES (NULL, 'dermatología'), (NULL, 'pediatría'), (NULL, 'urología'), 
	(NULL, 'reumatología'), (NULL, 'otorrinolaringologia'),
	(NULL, 'ginecología'), (NULL, 'medicina Interna');


-- UNIDADES DE MEDIDAS PARAMENTRO PRE-CONSULTA.
INSERT INTO `unidadesparametropre` (`id_unidadParametroPre`, `descripcion`) 
	VALUES (NULL, '%');

-- PARAMETROS PRE-CONSULTA.
INSERT INTO `parametrospreconsulta` (`id_parametroPreconsulta`, `descripcion`, `valorNormal`, `valorAlto`, `valorBajo`, `id_unidadParametroPre`) 
	VALUES (NULL, 'temperatura', '43', '65', '12', '1'),
		   (NULL, 'presión arterial', '321', '80', '42', '1');

-- DIAGNÓSTICOS.
INSERT INTO `diagnosticos` (`id_diagnostico`, `descripcion`)
	VALUES (NULL, 'gripe'), (NULL, 'dengue'), (NULL, 'papera');

-- ALERGIAS
INSERT INTO `alergias` (`id_alergia`, `descripcion`)
	VALUES (NULL, 'al polen'), (NULL, 'al chocolate'), (NULL, 'al pescado');