import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM tiposanalisis
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
		SELECT * FROM tiposanalisis 
			WHERE
				id_tipoAnalisis = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_tipoAnalisis], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM tiposanalisis 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO tiposanalisis (id_tipoAnalisis, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE tiposanalisis SET 
			descripcion = LOWER(?)
			WHERE 
				id_tipoAnalisis = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_tipoAnalisis], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM tiposanalisis 
			WHERE
				id_tipoAnalisis = ?
	`

	return connection.query(q, [data.id_tipoAnalisis], callback)

	connection.end()
}