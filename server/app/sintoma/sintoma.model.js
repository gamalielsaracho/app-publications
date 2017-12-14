import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM sintomas ORDER BY id_sintoma DESC
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
		SELECT * FROM sintomas 
			WHERE
				id_sintoma = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_sintoma], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM sintomas 
			WHERE
			descripcion = ?
	`

	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO sintomas (id_sintoma, descripcion)
			VALUES (null, LOWER(?))
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE sintomas SET
			descripcion = LOWER(?)
			WHERE 
				id_sintoma = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_sintoma], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM sintomas 
			WHERE
				id_sintoma = ?
	`

	return connection.query(q, [data.id_sintoma], callback)

	connection.end()
}