import connection from '../../config/connection'

exports.find = (callback) => {
	let q = `
		SELECT 
			*
		FROM 
			ciudades ciudad,
			departamentos departamento
		WHERE
			ciudad.id_departamento = departamento.id_departamento
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (data, callback) => {
	let q = `
		SELECT 
			*
		FROM 
			ciudades ciudad,
			departamentos departamento
		WHERE
			ciudad.id_departamento = departamento.id_departamento AND
			ciudad.id_ciudad = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [data.id_ciudad], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT
			* 
		FROM
			ciudades 
		WHERE 
			descripcion = ? AND
			id_departamento = ?
	`

	return connection.query(q, [ data.descripcion.trim(), data.id_departamento ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO ciudades (id_ciudad, descripcion, id_departamento)
			VALUES (null, LOWER(?), ?)
	`
	return connection.query(q, [ data.descripcion.trim(), data.id_departamento ], callback)

	connection.end()
}


exports.findByIdToUpdate = (data, callback) => {
	let q = `
		SELECT 
			*
		FROM 
			ciudades
		WHERE
			id_ciudad = ?
	`

	return connection.query(q, [data.id_ciudad], callback)

	connection.end()
}


exports.update = (data, callback) => {
	let q = `
		update ciudades set 
			descripcion = LOWER(?),
			id_departamento = ?
		where id_ciudad = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_departamento, data.id_ciudad], callback)

	connection.end()
}

exports.delete = (data, callback) => {	
	return connection.query('DELETE FROM ciudades WHERE id_ciudad = ?', [data.id_ciudad], callback)

	connection.end()
}