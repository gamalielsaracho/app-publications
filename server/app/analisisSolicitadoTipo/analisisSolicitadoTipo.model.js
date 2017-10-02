import connection from '../../config/connection'

// ANÁLISIS SOLICITADOS X TIPOS-ANÁLISIS
exports.find = (idAnalisisSolicitado, callback) => {

	let q = `
		SELECT
			*
		FROM
			analisissolicitadostipos analisisSolicitadoTipo,
			tiposanalisis tipoAnalisis
		WHERE
			analisisSolicitadoTipo.id_tipoAnalisis = tipoAnalisis.id_tipoAnalisis AND
			analisisSolicitadoTipo.id_analisisSolicitado = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idAnalisisSolicitado], callback)

	connection.end()
}

exports.findById = (idAnalisisSolicitadoTipo, callback) => {

	let q = `
		SELECT
			*
		FROM
			analisissolicitadostipos analisisSolicitadoTipo,
			tiposanalisis tipoAnalisis
		WHERE
			analisisSolicitadoTipo.id_tipoAnalisis = tipoAnalisis.id_tipoAnalisis AND
			analisisSolicitadoTipo.id_analisisSolicitadoTipo = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idAnalisisSolicitadoTipo], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM analisissolicitadostipos 
			WHERE
				id_analisisSolicitado = ? AND
				id_tipoAnalisis = ?
	`
	return connection.query(q, [data.id_analisisSolicitado, data.id_tipoAnalisis], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO analisissolicitadostipos (
			id_analisisSolicitadoTipo, 
			id_analisisSolicitado, 
			id_tipoAnalisis
		)
			VALUES (null, ?, ?)
	`
	
	return connection.query(q, [ data.id_analisisSolicitado,
							     data.id_tipoAnalisis ], callback)

	connection.end()
}


exports.delete = (idAnalisisSolicitadoTipo, callback) => {	

	let q = `
		DELETE FROM analisissolicitadostipos 
			WHERE
				id_analisisSolicitadoTipo = ?
	`

	return connection.query(q, [idAnalisisSolicitadoTipo], callback)

	connection.end()
}