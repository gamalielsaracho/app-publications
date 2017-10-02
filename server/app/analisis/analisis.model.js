import connection from '../../config/connection'


// PUEDE SER MOSTRADA POR ID_ANALISIS O ID_SOLICITUDANALISIS.
	// (VER HASTA PODER HACERLO).
// exports.findPreviewById = (data, callback) => {
	
// 	let q = `
// 		SELECT * FROM analisis 
// 			WHERE
// 				id_analisis = ?
// 	`
// 	var options = {
// 		sql: q,
// 		nestTables: false
// 	}

// 	return connection.query(options, [data.id_analisis], callback)

// 	connection.end()
// }

exports.find = (callback) => {

	let q = `
		SELECT * FROM analisis
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
		SELECT * 
		FROM 
			analisis ana,
			personales personal
		WHERE
			ana.id_personal = personal.id_personal AND
			ana.id_analisis = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_analisis], callback)

	connection.end()
}

exports.findByIdanalisisSolicitado = (data, callback) => {

	let q = `
		SELECT
			id_analisis
		FROM 
			analisis 
		WHERE
			id_analisisSolicitado = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_analisisSolicitado], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM analisis 
			WHERE
			id_analisisSolicitado = ?
	`
	return connection.query(q, [data.id_analisisSolicitado], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO analisis (id_analisis, fecha, id_analisisSolicitado, id_personal)
			VALUES (null, now(), ?, ?);
	`
	return connection.query(q, [ data.id_analisisSolicitado,
								 data.id_personal ], callback)

	connection.end()
}

// exports.update = (data, callback) => {
// 	let q = `
// 		UPDATE analisis SET 
// 			descripcion = ?
// 			WHERE 
// 				id_analisis = ?
// 	`

// 	return connection.query(q, [data.descripcion.trim(), data.id_analisis], callback)

// 	connection.end()
// }

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM analisis 
			WHERE
				id_analisis = ?
	`

	return connection.query(q, [data.id_analisis], callback)

	connection.end()
}