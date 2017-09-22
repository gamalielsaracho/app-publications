import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM tiposExamenes
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
		SELECT * FROM tiposExamenes 
			WHERE
				id_tipoExamen = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_tipoExamen], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM tiposExamenes 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO tiposExamenes (id_tipoExamen, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE tiposExamenes SET
			descripcion = LOWER(?)
			WHERE
				id_tipoExamen = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_tipoExamen], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM tiposExamenes 
			WHERE
				id_tipoExamen = ?
	`

	return connection.query(q, [data.id_tipoExamen], callback)

	connection.end()
}