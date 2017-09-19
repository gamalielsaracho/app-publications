
import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM nombresMedicamentos
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
		SELECT * FROM nombresMedicamentos 
			WHERE
				id_nombreMedicamento = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_nombreMedicamento], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM nombresMedicamentos 
			WHERE
			descripcion = ? AND
			nombreGenerico = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.nombreGenerico.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO nombresMedicamentos (id_nombreMedicamento, descripcion, nombreGenerico)
			VALUES (null, LOWER(?), LOWER(?));
	`
	
	return connection.query(q, [data.descripcion.trim(), data.nombreGenerico.trim()], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE nombresMedicamentos SET 
			descripcion = LOWER(?),
			nombreGenerico = LOWER(?)
			WHERE 
				id_nombreMedicamento = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.nombreGenerico.trim(), data.id_nombreMedicamento], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM nombresMedicamentos 
			WHERE
				id_nombreMedicamento = ?
	`

	return connection.query(q, [data.id_nombreMedicamento], callback)

	connection.end()
}