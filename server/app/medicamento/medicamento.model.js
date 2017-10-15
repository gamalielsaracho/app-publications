import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM 
				medicamentos medicamento,
				farmaceuticas farmaceutica
			WHERE
				medicamento.id_farmaceutica = farmaceutica.id_farmaceutica
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
		SELECT * 
			FROM 
				medicamentos medicamento,
				farmaceuticas farmaceutica
			WHERE
				medicamento.id_farmaceutica = farmaceutica.id_farmaceutica AND
				medicamento.id_medicamento = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_medicamento], callback)

	connection.end()
}

// exports.verifyIfExist = (data, callback) => {
// 	let q = `
// 		SELECT * FROM medicamentos 
// 			WHERE
// 			descripcion = ?
// 	`
// 	return connection.query(q, [data.descripcion.trim()], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	console.log(data)
	let q = `
		INSERT INTO medicamentos (
			id_medicamento,
			id_farmaceutica,
			nombre,
			observaciones
		) VALUES (null, ?, LOWER(?), LOWER(?))
	`

	if(data.nombre) {
		data.nombre.trim()
	}

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.id_farmaceutica,
								 data.nombre,
								 data.observaciones ], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {

	let q = `
		SELECT * FROM medicamentos
			WHERE
				id_medicamento = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_medicamento], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE medicamentos SET 
			id_farmaceutica = ?,
			nombre = LOWER(?),
			observaciones = LOWER(?)
			WHERE 
				id_medicamento = ?
	`

	if(data.nombre) {
		data.nombre.trim()
	}

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.id_farmaceutica,
								 data.nombre,
								 data.observaciones,
								 data.id_medicamento ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM medicamentos 
			WHERE
				id_medicamento = ?
	`

	return connection.query(q, [data.id_medicamento], callback)

	connection.end()
}