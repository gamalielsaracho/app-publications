import connection from '../../config/connection'

exports.findListByIdTipoAnalisis = (idTipoAnalisis, callback) => {

	let q = `
		SELECT * 
			FROM 
				parametrosAnalisis parametro,
				tiposexamenes tipoExamen,
				unidadesanalisis unidad
			WHERE
				parametro.id_tipoExamen = tipoExamen.id_tipoExamen AND
				parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
				parametro.id_tipoAnalisis = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idTipoAnalisis], callback)

	connection.end()
}


exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM 
				parametrosAnalisis parametro,
				tiposexamenes tipoExamen,
				unidadesanalisis unidad,
				tiposanalisis tipoAnalisis
			WHERE
				parametro.id_tipoExamen = tipoExamen.id_tipoExamen AND
				parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
				parametro.id_tipoAnalisis = tipoAnalisis.id_tipoAnalisis
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
			parametrosAnalisis parametro,
			tiposexamenes tipoExamen,
			unidadesanalisis unidad
		WHERE
			parametro.id_tipoExamen = tipoExamen.id_tipoExamen AND
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			parametro.id_parametroAnalisis = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_parametroAnalisis], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT 
			*
		FROM 
			parametrosAnalisis 
		WHERE
			descripcion = ? AND
			id_unidadAnalisis = ? AND
			id_tipoExamen = ? AND
			id_tipoAnalisis = ?

	`

	return connection.query(q, [ data.descripcion.trim(),
								 data.id_unidadAnalisis,
								 data.id_tipoExamen, 
								 data.id_tipoAnalisis], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO parametrosAnalisis (
			id_parametroAnalisis, 
			descripcion, 
			id_unidadAnalisis,
			id_tipoExamen,
			id_tipoAnalisis
		)
			VALUES (null, LOWER(?), ?, ?, ?);
	`
	return connection.query(q, [ data.descripcion.trim(),
							 	 data.id_unidadAnalisis,
							 	 data.id_tipoExamen,
							 	 data.id_tipoAnalisis ], callback)

	connection.end()
}

exports.findByIdToEdit = (data, callback) => {

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