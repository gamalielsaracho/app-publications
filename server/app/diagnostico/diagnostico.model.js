import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM diagnosticos
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
		SELECT * FROM diagnosticos 
			WHERE
				id_diagnostico = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_diagnostico], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM diagnosticos 
			WHERE
			descripcion = ?
	`

	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO diagnosticos (id_diagnostico, descripcion)
			VALUES (null, LOWER(?))
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE diagnosticos SET
			descripcion = LOWER(?)
			WHERE 
				id_diagnostico = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_diagnostico], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM diagnosticos 
			WHERE
				id_diagnostico = ?
	`

	return connection.query(q, [data.id_diagnostico], callback)

	connection.end()
}