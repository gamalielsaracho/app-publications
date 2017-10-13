import connection from '../../config/connection'

// ANÁLISI-x-TIPOS X REFERENCIAS.
exports.find = (idAnalisisTipo, callback) => {

	let q = `
		SELECT
			*
		FROM
			analisisTiposReferencias analisisTipoReferencia,
			analisis analisis,
			referencias referencia,
			parametrosAnalisis parametro,
			unidadesAnalisis unidad,
			tiposExamenes tipoExamen 
		WHERE
			analisisTipoReferencia.id_referencia = referencia.id_referencia AND
			analisisTipoReferencia.id_analisis = analisis.id_analisis AND
			referencia.id_parametroAnalisis = parametro.id_parametroAnalisis  AND
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			parametro.id_tipoExamen = tipoExamen.id_tipoExamen AND

			analisisTipoReferencia.id_analisisTipo = ?
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idAnalisisTipo], callback)

	connection.end()
}


exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM analisisTiposReferencias 
			WHERE
				id_analisis = ? AND
				id_tipoAnalisis = ? AND 
				id_referencia = ?
	`
	return connection.query(q, [ data.id_analisis, 
								 data.id_tipoAnalisis,
								 data.id_referencia ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO analisisTiposReferencias (
			id_analisisTipoReferencia,
			id_analisisTipo, 
			id_analisis, 
			id_tipoAnalisis, 
			id_referencia,
			valor
		)
		VALUES (null, ?, ?, ?, ?, LOWER(?))
	`
	if(data.valor) {
		data.valor = data.valor.toString().trim()
	}

	return connection.query(q, [ data.id_analisisTipo,
								 data.id_analisis,
							     data.id_tipoAnalisis,
								 data.id_referencia,
								 data.valor ], callback)

	connection.end()
}

exports.findById = (idAnalisisTipoAnalisisReferencia, callback) => {

	let q = `
		SELECT
			*
		FROM  
			analisisTiposReferencias analisisTipoReferencia,
			analisis analisis,
			referencias referencia,
			parametrosAnalisis parametro,
			unidadesAnalisis unidad,
			tiposExamenes tipoExamen
		WHERE
			analisisTipoReferencia.id_referencia = referencia.id_referencia AND
			analisisTipoReferencia.id_analisis = analisis.id_analisis AND
			referencia.id_parametroAnalisis = parametro.id_parametroAnalisis  AND
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			parametro.id_tipoExamen = tipoExamen.id_tipoExamen AND

			analisisTipoReferencia.id_analisisTipoReferencia = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idAnalisisTipoAnalisisReferencia], callback)

	connection.end()
}

exports.findByIdToUpdate = (idAnalisisTipoAnalisisReferencia, callback) => {

	let q = `
		SELECT
			*
		FROM  
			analisisTiposReferencias analisisTipoReferencia,
			referencias referencia,
			parametrosAnalisis parametro
		WHERE
			analisisTipoReferencia.id_referencia = referencia.id_referencia AND
			referencia.id_parametroAnalisis = parametro.id_parametroAnalisis  AND
			id_analisisTipoReferencia = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idAnalisisTipoAnalisisReferencia], callback)

	connection.end()
}

exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE analisisTiposReferencias SET 
			valor = ?
		WHERE
			id_analisisTipoReferencia = ?
	`

	if(data.valor) {
		data.valor = data.valor.toString().trim()
	}

	return connection.query(q, [ data.valor,
								 data.id_analisisTipoReferencia ], callback)

	connection.end()
}

exports.delete = (idAnalisisTipoAnalisisReferencia, callback) => {	

	let q = `
		DELETE FROM analisisTiposReferencias 
			WHERE
				id_analisisTipoReferencia = ?
	`

	return connection.query(q, [idAnalisisTipoAnalisisReferencia], callback)

	connection.end()
}