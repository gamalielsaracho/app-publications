import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM dosis
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
		SELECT * FROM dosis 
			WHERE
				id_dosis = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_dosis], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM dosis 
			WHERE
			valor = ?
	`
	return connection.query(q, [data.valor.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO dosis (id_dosis, valor)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.valor.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE dosis SET 
			valor = LOWER(?)
			WHERE 
				id_dosis = ?
	`

	return connection.query(q, [data.valor.trim(), data.id_dosis], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM dosis 
			WHERE
				id_dosis = ?
	`

	return connection.query(q, [data.id_dosis], callback)

	connection.end()
}