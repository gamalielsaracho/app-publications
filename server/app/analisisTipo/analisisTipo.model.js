import connection from '../../config/connection'

// ANÁLISIS X TIPOS ANÁLISIS
exports.find = (idAnalisis, callback) => {

	let q = `
		SELECT
			*
		FROM
			analisistipos analisisTipo,
			tiposanalisis tipoAnalisis
		WHERE
			analisisTipo.id_tipoAnalisis = tipoAnalisis.id_tipoAnalisis  AND
			analisisTipo.id_analisis = ?
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idAnalisis], callback)

	connection.end()
}

exports.findById = (idAnalisisTipo, callback) => {	
	let q = `
		SELECT
			*
		FROM  
			analisistipos analisisTipo,
			tiposanalisis tipoAnalisis
		WHERE
			analisisTipo.id_tipoAnalisis = tipoAnalisis.id_tipoAnalisis  AND
			analisisTipo.id_analisisTipo = ?

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
		SELECT * FROM analisistipos 
			WHERE
				id_analisis = ? AND
				id_tipoAnalisis = ?
	`
	return connection.query(q, [data.id_analisis, data.id_tipoAnalisis], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO analisistipos (id_analisisTipo, id_analisis, id_tipoAnalisis)
			VALUES (null, ?, ?)
	`
	
	return connection.query(q, [ data.id_analisis,
								 data.id_tipoAnalisis ], callback)

	connection.end()
}


exports.delete = (idAnalisisTipo, callback) => {	

	let q = `
		DELETE FROM analisistipos 
			WHERE
				id_analisisTipo = ?
	`

	return connection.query(q, [idAnalisisTipo], callback)

	connection.end()
}