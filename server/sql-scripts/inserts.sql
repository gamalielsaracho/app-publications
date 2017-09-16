-- TIPO DOCUMENTO.
INSERT INTO `tiposdocumentos` (`id_tipoDocumento`, `descripcion`) 
	VALUES ('1', 'dni');

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