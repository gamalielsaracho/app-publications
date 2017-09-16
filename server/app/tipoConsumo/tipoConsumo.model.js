import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM tiposConsumo 
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
		SELECT * FROM tiposConsumo 
			WHERE
				id_tipoConsumo = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_tipoConsumo], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM tiposConsumo 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO tiposConsumo (id_tipoConsumo, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE tiposConsumo SET 
			descripcion = LOWER(?)
			WHERE 
				id_tipoConsumo = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_tipoConsumo], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM tiposConsumo 
			WHERE
				id_tipoConsumo = ?
	`

	return connection.query(q, [data.id_tipoConsumo], callback)

	connection.end()
}