import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM unidadesAnalisis
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
		SELECT * FROM unidadesAnalisis 
			WHERE
				id_unidadAnalisis = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_unidadAnalisis], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM unidadesAnalisis 
			WHERE
				nombre = ? AND
				descripcion = ?
	`

	if(data.nombre) {
		data.nombre = data.nombre.trim()
	}

	return connection.query(q, [data.nombre, data.descripcion.trim()], callback)

	connection.end()
}


exports.create = (data, callback) => {
	let q = `
		INSERT INTO unidadesAnalisis (id_unidadAnalisis, nombre, descripcion)
			VALUES (null, LOWER(?), LOWER(?));
	`
	if(data.nombre) {
		data.nombre = data.nombre.trim()
	}

	return connection.query(q, [ data.nombre, data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE unidadesAnalisis SET
			nombre = LOWER(?),
			descripcion = LOWER(?)
			WHERE 
				id_unidadAnalisis = ?
	`

	if(data.nombre) {
		data.nombre = data.nombre.trim()
	}

	return connection.query(q, [data.nombre, data.descripcion.trim(), data.id_unidadAnalisis], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM unidadesAnalisis 
			WHERE
				id_unidadAnalisis = ?
	`

	return connection.query(q, [data.id_unidadAnalisis], callback)

	connection.end()
}