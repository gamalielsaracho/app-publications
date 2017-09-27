import connection from '../../config/connection'

// TIPOS ANALISIS X PARAMETROS ANALISIS.
exports.find = (idTipoAnalisis, callback) => {
	let q = `
		SELECT
			*
		FROM
			tiposAnalisisParametros tipoAnalisisParametro,
			tiposExamenes tipoExamen,
			unidadesanalisis unidad,
			parametrosAnalisis parametroAnalisis
		WHERE
			parametroAnalisis.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			parametroAnalisis.id_tipoExamen = tipoExamen.id_tipoExamen AND
			tipoAnalisisParametro.id_parametroAnalisis = parametroAnalisis.id_parametroAnalisis AND
			tipoAnalisisParametro.id_tipoAnalisis = ?

			ORDER BY tipoAnalisisParametro.id_tipoAnalisisParametro DESC
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idTipoAnalisis], callback)

	connection.end()
}

exports.findById = (idTipoAnalisisParametro, callback) => {

	let q = `
		SELECT
			*
		FROM
			tiposAnalisisParametros tipoAnalisisParametro,
			tiposExamenes tipoExamen,
			unidadesanalisis unidad,
			parametrosAnalisis parametroAnalisis
		WHERE
			parametroAnalisis.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			parametroAnalisis.id_tipoExamen = tipoExamen.id_tipoExamen AND
			tipoAnalisisParametro.id_parametroAnalisis = parametroAnalisis.id_parametroAnalisis AND
			tipoAnalisisParametro.id_tipoAnalisisParametro = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idTipoAnalisisParametro], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	// console.log(data)
	// ESTO DA ERROR VER...
	let q = `
		SELECT * FROM tiposanalisisparametros 
			WHERE
				id_tipoAnalisis = ? AND
				id_parametroAnalisis = ?
	`
	return connection.query(q, [data.id_tipoAnalisis, data.id_parametroAnalisis], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO tiposanalisisparametros (
			id_tipoAnalisisParametro, 
			id_tipoAnalisis, 
			id_parametroAnalisis 
		)

		VALUES (null, ?, ?)
	`
	
	return connection.query(q, [ data.id_tipoAnalisis,
								 data.id_parametroAnalisis ], callback)

	connection.end()
}

// exports.findByIdToUpdate = (idTipoAnalisisParametro, callback) => {

// 	let q = `
// 		SELECT
// 			*
// 		FROM  
// 			tiposanalisisparametros
// 		WHERE
// 			id_tipoAnalisisParametro = ?
// 	`

// 	var options = {
// 		sql: q,
// 		nestTables: false
// 	}

// 	return connection.query(options, [idTipoAnalisisParametro], callback)

// 	connection.end()
// }

// exports.update = (data, callback) => {
// 	// console.log(data)
// 	let q = `
// 		UPDATE preconsultasParametros SET 
// 			valor = ?,
// 			observaciones = LOWER(?)
// 		WHERE
// 			id_preconsultaParametro = ?
// 	`

// 	if(data.observaciones) {
// 		data.observaciones.trim()
// 	}

// 	if(data.valor) {
// 		data.valor = data.valor.toString().trim()
// 	}

// 	return connection.query(q, [ data.valor,
// 								 data.observaciones,
// 								 data.id_preconsultaParametro ], callback)

// 	connection.end()
// }

exports.delete = (idTipoAnalisisParametro, callback) => {	

	let q = `
		DELETE FROM tiposanalisisparametros 
			WHERE
				id_tipoAnalisisParametro = ?
	`

	return connection.query(q, [idTipoAnalisisParametro], callback)

	connection.end()
}