
import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM presentaciones
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
		SELECT * FROM presentaciones 
			WHERE
				id_presentacion = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_presentacion], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM presentaciones 
			WHERE
			descripcion = ?
	`

	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO presentaciones (id_presentacion, descripcion)
			VALUES (null, LOWER(?));
	`
	
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE presentaciones SET 
			descripcion = LOWER(?)
			WHERE 
				id_presentacion = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_presentacion], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM presentaciones 
			WHERE
				id_presentacion = ?
	`

	return connection.query(q, [data.id_presentacion], callback)

	connection.end()
}