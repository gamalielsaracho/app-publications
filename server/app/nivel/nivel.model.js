import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM niveles
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
		SELECT * FROM niveles 
			WHERE
				id_nivel = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_nivel], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM niveles 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO niveles (id_nivel, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE niveles SET 
			descripcion = ?
			WHERE 
				id_nivel = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_nivel], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM niveles 
			WHERE
				id_nivel = ?
	`

	return connection.query(q, [data.id_nivel], callback)

	connection.end()
}