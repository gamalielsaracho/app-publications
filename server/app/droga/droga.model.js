import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM drogas
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
		SELECT * FROM drogas
			WHERE
				id_droga = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_droga], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM drogas 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO drogas (id_droga, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE drogas SET 
			descripcion = LOWER(?)
			WHERE 
				id_droga = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_droga], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM drogas 
			WHERE
				id_droga = ?
	`

	return connection.query(q, [data.id_droga], callback)

	connection.end()
}