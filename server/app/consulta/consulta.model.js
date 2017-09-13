import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM
				consultas consulta,
				diagnosticos diagnostico,
				personales personal
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_diagnostico = diagnostico.id_diagnostico
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

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM consultas 
			WHERE
			id_preconsulta = ? AND
			id_personal = ? AND
			id_diagnostico = ?
	`

	return connection.query(q, [data.id_preconsulta, data.id_personal, data.id_diagnostico], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO consultas (id_consulta, fecha, fechaPoximaConsulta, 
		id_personal, id_diagnostico, observacionDiagnostico, id_preconsulta)

			VALUES (null, ?, ?, ?, ?, LOWER(?), ?);
	`

	return connection.query(q, [ data.fecha,
								 data.fechaPoximaConsulta,
								 data.id_personal,
								 data.id_diagnostico,
								 data.observacionDiagnostico.trim(), 
								 data.id_preconsulta
								 ], callback)

	connection.end()
}

// exports.findByIdPreConsultaAndIdPersonal = (data, callback) => {
// 	let q = `
// 		SELECT * FROM consultas
// 			WHERE
// 				id_preconsulta = ? AND
// 				id_personal = ?
// 	`

// 	var options = {
// 		sql: q,
// 		nestTables: false
// 	}

// 	return connection.query(options, [data.id_preconsulta, data.id_personal], callback)

// 	connection.end()
// }

exports.update = (data, callback) => {
	let q = `
		UPDATE consultas SET 
			fecha = ?,
			fechaPoximaConsulta = ?,
			id_personal = ?,
			id_diagnostico = ?,
			observacionDiagnostico = LOWER(?),
			id_preconsulta = ?
			WHERE
				id_consulta = ?
	`

	return connection.query(q, [ data.fecha,
								 data.fechaPoximaConsulta,
								 data.id_personal,
								 data.id_diagnostico,
								 data.observacionDiagnostico.trim(), 
								 data.id_preconsulta,
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