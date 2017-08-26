import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM citas
	`
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (data, callback) => {

	let q = `
		SELECT * FROM citas 
			WHERE 
				id_cita = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_cita], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO citas SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE citas SET 
			fecha = ?, hora = ?, pendiente = ?,
			id_personal = ?, id_paciente = ?
			WHERE 
				id_cita = ?
	`

	return connection.query(q, [
		data.fecha, data.hora, 
		data.pendiente, data.id_personal,
		data.id_personal, data.id_paciente, data.id_cita
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