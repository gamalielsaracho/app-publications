import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM unidadesParametroPre
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
		SELECT * FROM unidadesParametroPre 
			WHERE
				id_unidadParametroPre = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_unidadParametroPre], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM unidadesParametroPre 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO unidadesParametroPre (id_unidadParametroPre, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE unidadesParametroPre SET 
			descripcion = LOWER(?)
			WHERE 
				id_unidadParametroPre = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_unidadParametroPre], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM unidadesParametroPre 
			WHERE
				id_unidadParametroPre = ?
	`

	return connection.query(q, [data.id_unidadParametroPre], callback)

	connection.end()
}