import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM
				consultas consulta,
				personales personal,
				pacientes paciente
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

// Listar todas las consultas que realizó un médico/a.
// para mostrarlo al mismo.
exports.findListByIdPersonal = (idPersonal, callback) => {
	let q = `
		SELECT * 
			FROM
				consultas consulta,
				personales personal,
				pacientes paciente
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente AND
				consulta.id_personal = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPersonal], callback)

	connection.end()
}

// Para el historial clinico del paciente.
exports.findListByIdPaciente = (idPaciente, callback) => {

	let q = `
		SELECT * 
			FROM
				consultas consulta,
				personales personal,
				pacientes paciente
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente AND
				consulta.id_paciente = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPaciente], callback)

	connection.end()
}

exports.findById = (data, callback) => {
	let q = `
		SELECT * 
			FROM 
				consultas consulta,
				personales personal,
				pacientes paciente,

				preconsultas preconsulta,
				personales personalEnfermeria,
				niveles nivel
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente AND

				consulta.id_preconsulta = preconsulta.id_preconsulta AND
				preconsulta.id_personal = personalEnfermeria.id_personal AND
				preconsulta.id_nivel = nivel.id_nivel AND
				id_consulta = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_consulta], callback)

	connection.end()
}

// exports.verifyIfExist = (data, callback) => {
// 	let q = `
// 		SELECT * FROM consultas 
// 			WHERE
// 			id_diagnostico = ?
// 	`

// 	return connection.query(q, [data.id_diagnostico], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	let q = `
		INSERT INTO consultas (id_consulta, fecha, fechaProximaConsulta, 
		id_personal, id_preconsulta, id_paciente)

			VALUES (null, ?, ?, ?, ?, ?);
	`

	return connection.query(q, [ data.fecha,
								 data.fechaProximaConsulta,
								 data.id_personal,
								 data.id_preconsulta,
								 data.id_paciente ], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {
	let q = `
		SELECT * FROM consultas 
			WHERE
				id_consulta = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_consulta], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE consultas SET 
			fechaProximaConsulta = ?
			WHERE
				id_consulta = ?
	`

	return connection.query(q, [ data.fechaProximaConsulta,
								 data.id_consulta ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM consultas 
			WHERE
				id_consulta = ?
	`

	return connection.query(q, [data.id_consulta], callback)

	connection.end()
}