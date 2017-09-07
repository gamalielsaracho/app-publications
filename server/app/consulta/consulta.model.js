import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM consultas
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
		SELECT * FROM consultas 
			WHERE
				id_consulta = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_consulta], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM consultas 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO consultas (id_consulta, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE consultas SET 
			descripcion = ?
			WHERE 
				id_consulta = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_consulta], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM consultas 
			WHERE
				id_consulta = ?
	`

	return connection.query(q, [data.id_consulta], callback)

	connection.end()
}