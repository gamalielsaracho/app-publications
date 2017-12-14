import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM parametrosPreConsulta parametro,
		unidadesanalisis unidad 

		WHERE
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis
		ORDER BY parametro.id_parametroPreconsulta DESC
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
		SELECT * FROM parametrosPreConsulta parametro,
			unidadesanalisis unidad 
		WHERE
			parametro.id_unidadAnalisis = unidad.id_unidadAnalisis AND
			parametro.id_parametroPreconsulta = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_parametroPreconsulta], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM parametrospreconsulta 
			WHERE
			descripcion = ? AND
			id_unidadAnalisis = ?
	`
	return connection.query(q, [ data.descripcion.trim(),
						         data.id_unidadAnalisis ], callback)

	connection.end()
}

// exports.verifyIfExistToUpdate = (data, callback) => {
// 	let q = `
// 		SELECT * FROM parametrospreconsulta 
// 			WHERE
// 			descripcion = ?,
// 			valorNormal = ?,
// 			valorAlto = ?,
// 			valorBajo = ?,
// 			id_unidadAnalisis = ?
// 	`
// 	return connection.query(q, [data.descripcion.trim()], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	let q = `
		INSERT INTO parametrospreconsulta (
			id_parametroPreconsulta, descripcion,
			valorNormal, valorAlto, valorBajo, id_unidadAnalisis)
			VALUES (null, LOWER(?), ?, ?, ?, ?);
	`
	return connection.query(q, [data.descripcion.trim(), data.valorNormal.trim(),
								data.valorAlto.trim(), data.valorBajo.trim(),
								data.id_unidadAnalisis || 1], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {
	let q = `
		SELECT * FROM parametrosPreConsulta
		WHERE
			id_parametroPreconsulta = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_parametroPreconsulta], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE parametrospreconsulta SET 
			descripcion = LOWER(?),
			valorNormal = ?,
			valorAlto = ?,
			valorBajo = ?,
			id_unidadAnalisis = ?
			WHERE 
				id_parametroPreconsulta = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.valorNormal.trim(), 
								data.valorAlto.trim(), data.valorBajo.trim(),
								data.id_unidadAnalisis, 
								data.id_parametroPreconsulta], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM parametrospreconsulta 
			WHERE
				id_parametroPreconsulta = ?
	`

	return connection.query(q, [data.id_parametroPreconsulta], callback)

	connection.end()
}