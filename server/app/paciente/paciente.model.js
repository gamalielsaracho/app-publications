import connection from '../../config/connection'

exports.find = (callback) => {
	let q = `
		SELECT 
			* 
		FROM
			(SELECT
				paciente.id_paciente,
				paciente.nroDocumento,
				paciente.nombres,
				paciente.apellidos,
				paciente.fechaNacimiento,
				paciente.direccion,
				paciente.fechaMuerte,
				paciente.celular,
				paciente.telefono,
				paciente.id_area,
				paciente.id_ciudad,
				paciente.sexo,
				paciente.fecha,

				tipoDocumento.id_tipoDocumento,
				tipoDocumento.descripcion nombreTipoDocumento

			FROM pacientes paciente
 			LEFT JOIN tiposDocumentos tipoDocumento
 				ON paciente.id_tipoDocumento = tipoDocumento.id_tipoDocumento) pa,
			 
			ciudades ciudad, 
			areas area 
		WHERE 
			pa.id_ciudad = ciudad.id_ciudad AND
			pa.id_area = area.id_area
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (data, callback) => {
	let q = `
		SELECT 
			* 
		FROM
			(SELECT
				paciente.id_paciente,
				paciente.nroDocumento,
				paciente.nombres,
				paciente.apellidos,
				paciente.fechaNacimiento,
				paciente.direccion,
				paciente.fechaMuerte,
				paciente.celular,
				paciente.telefono,
				paciente.id_area,
				paciente.id_ciudad,
				paciente.sexo,
				paciente.fecha,

				tipoDocumento.id_tipoDocumento,
				tipoDocumento.descripcion nombreTipoDocumento

			FROM pacientes paciente
 			LEFT JOIN tiposDocumentos tipoDocumento
 				ON paciente.id_tipoDocumento = tipoDocumento.id_tipoDocumento) pa,
			 
			ciudades ciudad, 
			areas area 
		WHERE 
			pa.id_ciudad = ciudad.id_ciudad AND
			pa.id_area = area.id_area AND
			pa.id_paciente = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [data.id_paciente], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {
	let q = `
		SELECT * FROM pacientes
			WHERE
				id_paciente = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_paciente], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM pacientes
			WHERE 
				nroDocumento = ? AND
				id_tipoDocumento = ?
	`

	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO pacientes (
			id_paciente, 
			nroDocumento,
			nombres,
			apellidos,
			fechaNacimiento,
			direccion,
			fechaMuerte,
			celular,
			telefono,
			id_area,
			id_ciudad,
			sexo,
			id_tipoDocumento,
			fecha
		)

			VALUES (
				null,
				LOWER(?), LOWER(?), LOWER(?), 
				?, LOWER(?), ?, ?, ?, ?, ?, LOWER(?), ?, now()
			)
	`

	if(data.nombres) {
		data.nombres.trim()
	}

	if(data.apellidos) {
		data.apellidos.trim()
	}

	if(data.direccion) {
		data.direccion.trim()
	}

	if(data.sexo) {
		data.sexo.trim()
	}

	return connection.query(q, [ data.nroDocumento,
								 data.nombres,
								 data.apellidos,
								 data.fechaNacimiento,
								 data.direccion,
								 data.fechaMuerte,
								 data.celular,
								 data.telefono,
								 data.id_area,
								 data.id_ciudad,
								 data.sexo,
								 data.id_tipoDocumento ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE pacientes SET
			nroDocumento= LOWER(?), 
			nombres= LOWER(?), 
			apellidos=LOWER(?), 
			fechaNacimiento=?, 
			direccion= LOWER(?), 
			fechaMuerte=?, 
			celular=?, 
			telefono=?, 
			id_area=?, 
			id_ciudad=? 
			sexo = LOWER(?), 
			id_tipoDocumento=? 
		WHERE
			id_paciente = ?
	`

	if(data.nombres) {
		data.nombres.trim()
	}

	if(data.apellidos) {
		data.apellidos.trim()
	}

	if(data.direccion) {
		data.direccion.trim()
	}

	if(data.sexo) {
		data.sexo.trim()
	}

	return connection.query(q, [ data.nroDocumento, 
								 data.nombres, 
								 data.apellidos,
								 data.fechaNacimiento, 
								 data.direccion,
								 data.fechaMuerte, 
								 data.celular, 
								 data.telefono, 
								 data.id_area, 
								 data.id_ciudad, 
								 data.sexo, 
								 data.id_tipoDocumento, 
								 data.id_paciente ], callback);

	connection.end()
}

exports.delete = (data, callback) => {	
	let q = `
		DELETE FROM pacientes 
		WHERE 
			id_paciente = ?
	`

	return connection.query(q, [data.id_paciente], callback)

	connection.end()
}

