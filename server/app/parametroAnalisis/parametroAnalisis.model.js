import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM parametrosAnalisis
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
		SELECT * FROM parametrosAnalisis 
			WHERE
				id_parametroAnalisis = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_parametroAnalisis], callback)

	connection.end()
}

// exports.verifyIfExist = (data, callback) => {
// 	let q = `
// 		SELECT * FROM parametrosAnalisis 
// 			WHERE
// 			descripcion = ?
// 	`
// 	return connection.query(q, [data.descripcion.trim()], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	let q = `
		INSERT INTO parametrosAnalisis (
			id_parametroAnalisis, descripcion, id_unidadAnalisis, id_tipoExamen
		)
			VALUES (null, LOWER(?), ?, ?);
	`
	return connection.query(q, [ data.descripcion.trim(),
							 	 data.id_unidadAnalisis,
							 	 data.id_tipoExamen ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE parametrosAnalisis SET 
			descripcion = LOWER(?),
			id_unidadAnalisis = ?,
			id_tipoExamen = ?
		WHERE 
			id_parametroAnalisis = ?
	`

	return connection.query(q, [ data.descripcion.trim(),
								 data.id_unidadAnalisis,
								 data.id_tipoExamen,
								 data.id_parametroAnalisis ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM parametrosAnalisis 
			WHERE
				id_parametroAnalisis = ?
	`

	return connection.query(q, [data.id_parametroAnalisis], callback)

	connection.end()
}