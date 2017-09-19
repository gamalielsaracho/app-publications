import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM acciones
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
		SELECT * FROM acciones 
			WHERE
				id_accion = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_accion], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM acciones 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO acciones (id_accion, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE acciones SET 
			descripcion = LOWER(?)
			WHERE 
				id_accion = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_accion], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM acciones 
			WHERE
				id_accion = ?
	`

	return connection.query(q, [data.id_accion], callback)

	connection.end()
}