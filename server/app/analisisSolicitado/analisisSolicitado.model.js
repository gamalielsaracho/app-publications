import connection from '../../config/connection'

// LISTAR TODOS LAS SOLICITUDES POR PACIENTE,
// PARA LISTAR DENTRO DEL HISTORIAL CLÍNICO.
exports.findByIdPaciente = (IdPaciente, callback) => {
	let q = `
		SELECT * 
			FROM
				analisisSolicitados analisisSolicitado,
				consultas consulta,
				pacientes paciente,
				personales personal,
				especialidades especialidad,
				tiposdocumentos tpDocPersonal,
				tiposdocumentos tpDocPaciente
			WHERE
				analisisSolicitado.id_consulta = consulta.id_consulta AND
				consulta.id_paciente = paciente.id_paciente AND
				paciente.id_tipoDocumento = tpDocPaciente.id_tipoDocumento AND
				
				consulta.id_personal = personal.id_personal AND
				personal.id_especialidad = especialidad.id_especialidad AND
				personal.id_tipoDocumento = tpDocPersonal.id_tipoDocumento AND				
				consulta.id_paciente = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [ IdPaciente ], callback)

	connection.end()
}

exports.find = (callback) => {
	let q = `
		SELECT * 
			FROM
				analisisSolicitados analisisSolicitado,
				consultas consulta,
				pacientes paciente,
				personales personal,
				especialidades especialidad,
				tiposdocumentos tpDocPersonal,
				tiposdocumentos tpDocPaciente
			WHERE
				analisisSolicitado.id_consulta = consulta.id_consulta AND
				consulta.id_paciente = paciente.id_paciente AND
				paciente.id_tipoDocumento = tpDocPaciente.id_tipoDocumento AND
				
				consulta.id_personal = personal.id_personal AND
				personal.id_especialidad = especialidad.id_especialidad AND
				personal.id_tipoDocumento = tpDocPersonal.id_tipoDocumento				
	`


	// let q = `
	// 	SELECT * 
	// 		FROM 
	// 			analisisSolicitados analisisSolicitado,
	// 			consultas consulta,
	// 			pacientes paciente,
	// 			personales personal,
	// 			especialidades especialidad
	// 		WHERE
	// 			analisisSolicitado.id_consulta = consulta.id_consulta AND
	// 			consulta.id_paciente = paciente.id_paciente AND
	// 			consulta.id_personal = personal.id_personal AND
	// 			personal.id_especialidad = especialidad.id_especialidad

	// `
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
			analisisSolicitados analisisSolicitado,
			consultas consulta,
			pacientes paciente,
			personales personal,
			especialidades especialidad
		WHERE
			analisisSolicitado.id_consulta = consulta.id_consulta AND
			consulta.id_paciente = paciente.id_paciente AND
			consulta.id_personal = personal.id_personal AND
			personal.id_especialidad = especialidad.id_especialidad AND
			analisisSolicitado.id_analisisSolicitado = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_analisisSolicitado], callback)

	connection.end()
}


exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM analisisSolicitados 
			WHERE
			id_consulta = ?
	`

	return connection.query(q, [ data.id_consulta ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO analisisSolicitados (
			id_analisisSolicitado, fechaArealizar, id_consulta
		)
			VALUES (null, ?, ?);
	`
	return connection.query(q, [ data.fechaArealizar,
							 	 data.id_consulta ], callback)

	connection.end()
}

exports.findByIdToEdit = (data, callback) => {

	let q = `
		SELECT * FROM analisisSolicitados 
			WHERE
				id_analisisSolicitado = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_analisisSolicitado], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE analisisSolicitados SET 
			fechaArealizar = ?,
			muestrasObtenidas = ?,
			pendiente = ?
		WHERE 
			id_analisisSolicitado = ?
	`

	return connection.query(q, [ data.fechaArealizar,
								 data.muestrasObtenidas,
								 data.pendiente,
								 data.id_analisisSolicitado ], callback)
	connection.end()
}


exports.delete = (data, callback) => {

	let q = `
		DELETE FROM analisisSolicitados 
			WHERE
				id_analisisSolicitado = ?
	`

	return connection.query(q, [data.id_analisisSolicitado], callback)

	connection.end()
}