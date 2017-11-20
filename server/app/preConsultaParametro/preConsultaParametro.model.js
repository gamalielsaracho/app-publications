import connection from '../../config/connection'

// PRECONSULTAS X PARAMETROS-PRECONSULTAS
// Obtiene todos los parametros que se crearon para una 
// pre-consulta (Una pre-consulta puede tener muchos valores.).
exports.find = (idPreconsulta, callback) => {

	let q = `
		SELECT
			parametro.id_parametroPreconsulta,
			parametro.descripcion,
			parametro.valorNormal,
			parametro.valorAlto,
			parametro.valorBajo,

			unidad.descripcion,

			preconsultaParametro.id_preconsultaParametro,
			preconsultaParametro.id_preconsulta,
			preconsultaParametro.id_parametroPreconsulta,
			preconsultaParametro.valor,
			preconsultaParametro.observaciones
		FROM  
			parametrosPreconsulta parametro,
			unidadesanalisis unidad,
			preconsultasParametros preconsultaParametro 
		WHERE
			preconsultaParametro.id_parametroPreconsulta = parametro.id_parametroPreconsulta AND
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			preconsultaParametro.id_preconsulta = ?

	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPreconsulta], callback)

	connection.end()
}

exports.findById = (data, callback) => {

	let q = `
		SELECT
			parametro.id_parametroPreconsulta,
			parametro.descripcion,
			parametro.valorNormal,
			parametro.valorAlto,
			parametro.valorBajo,

			unidad.descripcion,

			preconsultaParametro.id_preconsultaParametro,
			preconsultaParametro.id_preconsulta,
			preconsultaParametro.valor,
			preconsultaParametro.observaciones
		FROM  
			parametrosPreconsulta parametro, 
			unidadesanalisis unidad,
			preconsultasParametros preconsultaParametro 
		WHERE
			preconsultaParametro.id_parametroPreconsulta = parametro.id_parametroPreconsulta AND
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			preconsultaParametro.id_preconsultaParametro = ?

	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_preconsultaParametro], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM preconsultasParametros 
			WHERE
				id_preconsulta = ? AND
				id_parametroPreconsulta = ?
	`
	return connection.query(q, [data.id_preconsulta, data.id_parametroPreconsulta], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO preconsultasParametros (id_preconsultaParametro, id_preconsulta, id_parametroPreconsulta, valor, observaciones)
			VALUES (null, ?, ?, ?, LOWER(?));
	`
	if(data.observaciones) {
		data.observaciones.trim()
	}
	
	if(data.valor) {
		data.valor = data.valor.toString().trim()
	}
	
	return connection.query(q, [ data.id_preconsulta,
								 data.id_parametroPreconsulta,
							     data.valor,
								 data.observaciones ], callback)

	connection.end()
}

exports.findByIdToUpdate = (idPreconsultaParametro, callback) => {

	let q = `
		SELECT
			parametro.id_parametroPreconsulta,
			parametro.descripcion,

			preconsultaParametro.id_preconsultaParametro,
			preconsultaParametro.id_preconsulta,
			preconsultaParametro.valor,
			preconsultaParametro.observaciones
		FROM  
			parametrosPreconsulta parametro, 
			preconsultasParametros preconsultaParametro 
		WHERE
			preconsultaParametro.id_parametroPreconsulta = parametro.id_parametroPreconsulta AND
			preconsultaParametro.id_preconsultaParametro = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idPreconsultaParametro], callback)

	connection.end()
}

exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE preconsultasParametros SET 
			valor = ?,
			observaciones = LOWER(?)
		WHERE
			id_preconsultaParametro = ?
	`

	if(data.observaciones) {
		data.observaciones.trim()
	}

	if(data.valor) {
		data.valor = data.valor.toString().trim()
	}

	return connection.query(q, [ data.valor,
								 data.observaciones,
								 data.id_preconsultaParametro ], callback)

	connection.end()
}

exports.delete = (idPreconsultaParametro, callback) => {	

	let q = `
		DELETE FROM preconsultasParametros 
			WHERE
				id_preconsultaParametro = ?
	`

	return connection.query(q, [idPreconsultaParametro], callback)

	connection.end()
}