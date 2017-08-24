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
				id_cita = ? AND
				fecha = ? AND
				hora = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_cita, data.fecha, data.hora], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO citas SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE citas SET 
			pendiente = ?, nroDocumento = ?, id_tipoDocumento = ?
			per_id_tipoDocumento = ?, per_nroDocumento = ?
			WHERE 
				id_cita = ? AND
				fecha = ? AND
				hora = ?
	`

	return connection.query(q, [
		data.pendiente, data.nroDocumento, 
		data.id_tipoDocumento, data.per_id_tipoDocumento,
		data.per_nroDocumento, data.id_cita, data.fecha, data.hora
	], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM citas 
			WHERE 
				id_cita = ? AND
				fecha = ? AND
				hora = ?
	`

	return connection.query(q, [data.id_cita, data.fecha, data.hora], callback)

	connection.end()
}