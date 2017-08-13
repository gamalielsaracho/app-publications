import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM areas', callback)

	connection.end()
}

exports.findById = (idArea, callback) => {
	return connection.query('select * from areas where id_area = ?', [idArea], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO areas SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update areas set descripcion = ? where id_area = ?', [data.descripcion, data.id_area], callback)

	connection.end()
}

exports.delete = (idArea, callback) => {	
	return connection.query('DELETE FROM areas WHERE id_area = ?', [idArea], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO areas SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update areas set descripcion = ? where id_area = ?', [data.descripcion, data.id_area], callback)

	connection.end()
}