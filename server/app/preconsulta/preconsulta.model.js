import connection from '../../config/connection'

import getHour from '../useFul/getHour'


import moment from 'moment'

exports.find = (callback) => {

	let q = `
		SELECT 
			* 
		FROM 
			preconsultas preconsulta, 
			pacientes paciente,
			niveles nivel,
			personales personal,
			tiposdocumentos tpDocPaciente,
			tiposdocumentos tpDocEnfermera
		WHERE
			preconsulta.id_paciente = paciente.id_paciente AND
			paciente.id_tipoDocumento = tpDocPaciente.id_tipoDocumento AND
			preconsulta.id_nivel = nivel.id_nivel AND
			preconsulta.id_personal = personal.id_personal AND
			personal.id_tipoDocumento = tpDocEnfermera.id_tipoDocumento
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
		SELECT
			*
		FROM
			preconsultas preconsulta,
			niveles nivel 
		WHERE
			preconsulta.id_nivel = nivel.id_nivel AND
			preconsulta.fecha = ? AND 
			preconsulta.id_paciente = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [moment(data.fechaCita).format('YYYY-MM-DD'), data.id_paciente], callback)

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
		SELECT * FROM preconsultas preconsulta, pacientes paciente,
		niveles nivel, personales personal
		WHERE
			preconsulta.id_paciente = paciente.id_paciente AND
			preconsulta.id_nivel = nivel.id_nivel AND
			preconsulta.id_personal = personal.id_personal AND
			id_preconsulta = ? 
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_preconsulta], callback)

	connection.end()
}

exports.create = (data, callback) => {	

	let q = `
		INSERT INTO preconsultas (id_preconsulta, fecha, hora, id_nivel, id_paciente, id_personal)
			VALUES (null, now(), ?, ?, ?, ?)
	`
	return connection.query(q, [getHour(), data.id_nivel, data.id_paciente, data.id_personal], callback)

	connection.end()
}


exports.findByIdToUpdate = (data, callback) => {

	let q = `
		SELECT 
			*
		FROM 
			preconsultas 
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


exports.update = (data, callback) => {
	let q = `
		UPDATE preconsultas SET 
			id_paciente = ?, 
			id_nivel = ?
			WHERE 
				id_preconsulta = ?
	`

	return connection.query(q, [
		data.id_paciente, data.id_nivel, data.id_preconsulta
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