import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM areas ORDER BY id_area DESC', callback)

	connection.end()
}

exports.findById = (data, callback) => {
	return connection.query('select * from areas where id_area = ?', [data.id_area], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM areas 
			WHERE
		descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO areas (id_area, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [ data.descripcion.trim() ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE areas SET 
			descripcion = LOWER(?) 
		where id_area = ?
	`
	return connection.query(q, [data.descripcion.trim(), data.id_area], callback)

	connection.end()
}

exports.delete = (data, callback) => {	
	return connection.query('DELETE FROM areas WHERE id_area = ?', [data.id_area], callback)

	connection.end()
}