import connection from '../../config/connection'

// PRECONSULTAS X PARAMETROS-PRECONSULTAS
// Obtiene todos los parametros que se crearon para una 
// pre-consulta (Una pre-consulta puede tener muchos valores.).
exports.find = (idPreconsulta, callback) => {

	let q = `
		SELECT
			parametro.id_parametroPreconsulta,
			parametro.descripcion,
			parametro.unidad,
			parametro.valorNormal,
			parametro.valorAlto,
			parametro.valorBajo,

			preconsultaParametro.id_preconsulta,
			preconsultaParametro.valor,
			preconsultaParametro.observaciones
		FROM  
			parametrosPreconsulta parametro, 
			preconsultasParametros preconsultaParametro 
		WHERE
			preconsultaParametro.id_parametroPreconsulta = parametro.id_parametroPreconsulta AND
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
			parametro.unidad,
			parametro.valorNormal,
			parametro.valorAlto,
			parametro.valorBajo,

			preconsultaParametro.id_preconsulta,
			preconsultaParametro.valor,
			preconsultaParametro.observaciones
		FROM  
			parametrosPreconsulta parametro, 
			preconsultasParametros preconsultaParametro 
		WHERE
			preconsultaParametro.id_parametroPreconsulta = parametro.id_parametroPreconsulta AND
			preconsultaParametro.id_preconsulta = ? AND
			preconsultaParametro.id_parametroPreconsulta = ?

	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_preconsulta, data.id_parametroPreconsulta], callback)

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
		INSERT INTO preconsultasParametros (id_preconsulta, id_parametroPreconsulta, valor, observaciones)
			VALUES (null, null, ?, LOWER(?));
	`
	return connection.query(q, [ data.valor.trim(),
								 data.observaciones.trim() ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE preconsultasParametros SET 
			valor = ?,
			observaciones = LOWER(?)
		WHERE 
			id_preconsulta = ? AND
			id_parametroPreconsulta = ?
	`

	return connection.query(q, [ data.valor.trim(),
								 data.observaciones.trim(),
								 data.id_preconsulta, 
								 data.id_parametroPreconsulta ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM preconsultasParametros 
			WHERE
				id_preconsulta = ? AND
				id_parametroPreconsulta = ?
	`

	return connection.query(q, [data.id_preconsulta, data.id_parametroPreconsulta], callback)

	connection.end()
}