import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM unidadesmedidasmedicamentos
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
		SELECT * FROM unidadesmedidasmedicamentos 
			WHERE
				id_unidadMedidaMedicamento = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_unidadMedidaMedicamento], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM unidadesmedidasmedicamentos 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO unidadesmedidasmedicamentos (id_unidadMedidaMedicamento, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE unidadesmedidasmedicamentos SET 
			descripcion = LOWER(?)
			WHERE 
				id_unidadMedidaMedicamento = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_unidadMedidaMedicamento], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM unidadesmedidasmedicamentos 
			WHERE
				id_unidadMedidaMedicamento = ?
	`

	return connection.query(q, [data.id_unidadMedidaMedicamento], callback)

	connection.end()
}