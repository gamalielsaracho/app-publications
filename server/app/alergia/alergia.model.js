import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM alergias', callback)

	connection.end()
}

exports.findById = (data, callback) => {
	return connection.query('select * from alergias where id_alergia = ?', [data.id_alergia], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM alergias
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO alergias (id_alergia, descripcion)
			VALUES (null, LOWER(?))
	`
	return connection.query(q, [ data.descripcion.trim() ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		update 
			alergias 
		set
			descripcion = LOWER(?) 
		where id_alergia = ?
	`
	return connection.query(q, [data.descripcion.trim(), data.id_alergia], callback)

	connection.end()
}

exports.delete = (data, callback) => {	
	return connection.query('DELETE FROM alergias WHERE id_alergia = ?', [data.id_alergia], callback)

	connection.end()
}
