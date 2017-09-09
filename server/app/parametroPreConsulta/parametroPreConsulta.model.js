import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM parametrosPreConsulta parametro,
		unidadesParametroPre unidad 

		WHERE
			parametro.id_unidadParametroPre = unidad.id_unidadParametroPre 
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
			unidadesParametroPre unidad 
		WHERE
			parametro.id_unidadParametroPre = unidad.id_unidadParametroPre AND
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
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO parametrospreconsulta (
			id_parametroPreconsulta, descripcion,
			id_unidadParametroPre, valorNormal, valorAlto, valorBajo)
			VALUES (null, LOWER(?), ?, ?, ?, ?);
	`
	return connection.query(q, [data.descripcion.trim(), 
								data.id_unidadParametroPre, data.valorNormal.trim(),
								data.valorAlto.trim(), data.valorBajo.trim()], callback)

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
			id_unidadParametroPre = ?,
			valorNormal = ?,
			valorAlto = ?,
			valorBajo = ?
			WHERE 
				id_parametroPreconsulta = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_unidadParametroPre,
								data.valorNormal.trim(), data.valorAlto.trim(),
								data.valorBajo.trim(), data.id_parametroPreconsulta], callback)

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