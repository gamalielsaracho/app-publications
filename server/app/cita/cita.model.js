import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM citas cita, personales personal, pacientes paciente
			WHERE
				cita.id_personal = personal.id_personal AND
				cita.id_paciente = paciente.id_paciente
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (data, callback) => {
	// console.log(data)
	let q = `
		SELECT * FROM citas cita, personales personal, pacientes paciente, 
		especialidades especialidad
			WHERE
				cita.id_personal = personal.id_personal AND
				cita.id_paciente = paciente.id_paciente AND
				personal.id_especialidad = especialidad.id_especialidad AND
				cita.id_cita = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_cita], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO citas SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	console.log(data)
	let q = `
		UPDATE citas SET 
			fecha = ?, pendiente = ?,
			id_personal = ?, id_paciente = ?, id_preconsulta = ?
			WHERE 
				id_cita = ?
	`

	return connection.query(q, [
		data.fecha, 
		data.pendiente, data.id_personal,
		data.id_paciente, data.id_preconsulta, data.id_cita
	], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM citas 
			WHERE
				id_cita = ?
	`

	return connection.query(q, [data.id_cita], callback)

	connection.end()
}