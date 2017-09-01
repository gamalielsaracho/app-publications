import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM preconsultas preconsulta, pacientes paciente,
		niveles nivel, personales personal
		WHERE
			preconsulta.id_paciente = paciente.id_paciente AND
			preconsulta.id_nivel = nivel.id_nivel AND
			preconsulta.id_personal = personal.id_personal 
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.listarPorFechaActualYidPaciente = (data, callback) => {

	let q = `
		SELECT * FROM preconsultas preconsulta, citas cita
			WHERE preconsulta.fecha = cita.fecha AND 
			preconsulta.id_paciente = cita.id_paciente
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

// SELECT * FROM preconsultas preconsulta, citas cita WHERE preconsulta.fecha = cita.fecha AND preconsulta.id_paciente = cita.id_paciente

// Para el Historial Clínico de los pacientes.
// exports.findByIdPaciente = (data, callback) => {

// 	let q = `
// 		SELECT * FROM preconsultas
// 			id_paciente = ?
// 	`
// 	var options = {
// 		sql: q, 
// 		nestTables: false
// 	}

// 	return connection.query(options,[data.id_paciente], callback)

// 	connection.end()
// }

exports.findById = (data, callback) => {

	let q = `
		SELECT * FROM preconsultas
			WHERE
				id_preconsulta = ? 
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_preconsulta], callback)

	connection.end()
}

exports.create = (data, callback) => {	

	let q = `
		INSERT INTO preconsultas (id_preconsulta, fecha, id_paciente, id_nivel, id_personal)
			VALUES (null, ?, ?, ?, ?)
	`
	return connection.query(q, [data.fecha, data.id_paciente, data.id_nivel, data.id_personal], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE preconsultas SET 
			fecha = ?, id_nivel = ?
			WHERE 
				id_preconsulta = ?
	`

	return connection.query(q, [
		data.fecha, data.id_nivel, data.id_preconsulta
	], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM preconsultas
			WHERE
				id_preconsulta = ?
	`

	return connection.query(q, [data.id_preconsulta], callback)

	connection.end()
}