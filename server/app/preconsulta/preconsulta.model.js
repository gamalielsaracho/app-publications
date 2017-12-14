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
			personales personal,
			tiposdocumentos tpDocPaciente,
			tiposdocumentos tpDocEnfermera
		WHERE
			preconsulta.id_paciente = paciente.id_paciente AND
			paciente.id_tipoDocumento = tpDocPaciente.id_tipoDocumento AND
			preconsulta.id_personal = personal.id_personal AND
			personal.id_tipoDocumento = tpDocEnfermera.id_tipoDocumento
			ORDER BY preconsulta.fecha DESC
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
			preconsultas preconsulta
		WHERE
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
			personales personal
		WHERE
			preconsulta.id_paciente = paciente.id_paciente AND
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
		INSERT INTO preconsultas (
			id_preconsulta, 
			fecha, 
			hora, 
			id_paciente, 
			id_personal,
			observaciones
		)
			VALUES (null, now(), ?, ?, ?, ?)
	`

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [getHour(), data.id_paciente, data.id_personal, data.observaciones], callback)

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
			observaciones = ?
			WHERE 
				id_preconsulta = ?
	`

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [
		data.id_paciente, data.observaciones, data.id_preconsulta
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