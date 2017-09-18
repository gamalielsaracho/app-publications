import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM farmaceuticas
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
		SELECT * FROM farmaceuticas 
			WHERE
				id_farmaceutica = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_farmaceutica], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM farmaceuticas 
			WHERE
		nombre = ? AND
		direccion = ? AND
		telefono = ?
	`

	return connection.query(q, [ data.nombre.trim(),
								 data.direccion.trim(),
								 data.telefono.trim() ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO farmaceuticas (id_farmaceutica, nombre, direccion, telefono)
			VALUES (null, LOWER(?), LOWER(?), LOWER(?))
	`
	
	
	return connection.query(q, [ data.nombre.trim(),
								 data.direccion.trim(),
								 data.telefono.trim() ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE farmaceuticas SET 
			nombre = LOWER(?),
			direccion = LOWER(?), 
			telefono = LOWER(?)
		WHERE 
			id_farmaceutica = ?
	`
	
	return connection.query(q, [ data.nombre.trim(),
								 data.direccion.trim(),
								 data.telefono.trim(),
								 data.id_farmaceutica ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM farmaceuticas 
			WHERE
				id_farmaceutica = ?
	`

	return connection.query(q, [data.id_farmaceutica], callback)

	connection.end()
}