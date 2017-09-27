import connection from '../../config/connection'

exports.find = (callback) => {
	let q = `
		SELECT
			*
		FROM
			referencias
	`
	
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findByIdParametroAnalisis = (idParametroAnalisis, callback) => {

	let q = `
		SELECT
			*
		FROM
			referencias
		WHERE
			id_parametroAnalisis = ?
	`
	
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [idParametroAnalisis], callback)

	connection.end()
}

exports.findById = (idReferencia, callback) => {

	let q = `
		SELECT
			*
		FROM  
			referencias 
		WHERE
			id_referencia = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idReferencia], callback)

	connection.end()
}

// exports.verifyIfExist = (data, callback) => {
// 	let q = `
// 		SELECT * FROM referencias 
// 			WHERE
// 				id_parametroAnalisis = ?
// 	`
// 	return connection.query(q, [ data.id_parametroAnalisis ], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	let q = `
		INSERT INTO referencias (
			id_referencia, diasMaximos, mesesMaximos, anosMaximos, superior,
			inferior, diasMinimos, mesesMinimos, anosMinimos, sexo, general,
			id_parametroAnalisis
		)
			VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`
	
	return connection.query(q, [ data.diasMaximos,
								 data.mesesMaximos,
								 data.anosMaximos,
								 data.superior,
								 data.inferior,
								 data.diasMinimos,
								 data.mesesMinimos,
								 data.anosMinimos,
								 data.sexo,
								 data.general,
								 data.id_parametroAnalisis ], callback)

	connection.end()
}

exports.findByIdToUpdate = (idReferencia, callback) => {
	let q = `
		SELECT
			*
		FROM  
			referencias
		WHERE
			id_referencia = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idReferencia], callback)

	connection.end()
}

exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE referencias SET
			diasMaximos = ?,
			mesesMaximos = ?,
			anosMaximos = ?,
			superior = ?,
			inferior = ?,
			diasMinimos = ?,
			mesesMinimos = ?,
			anosMinimos = ?,
			sexo = ?,
			general = ?
		WHERE
			id_referencia = ?
	`

	return connection.query(q, [ data.diasMaximos,
								 data.mesesMaximos,
								 data.anosMaximos,
								 data.superior,
								 data.inferior,
								 data.diasMinimos,
								 data.mesesMinimos,
								 data.anosMinimos,
								 data.sexo,
								 data.general,
								 data.id_referencia ], callback)

	connection.end()
}

exports.delete = (idReferencia, callback) => {	

	let q = `
		DELETE FROM referencias 
			WHERE
				id_referencia = ?
	`

	return connection.query(q, [idReferencia], callback)

	connection.end()
}