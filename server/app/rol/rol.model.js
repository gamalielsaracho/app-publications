import connection from '../../config/connection'

exports.create = (data, callback) => {
	return connection.query('INSERT INTO roles SET ?', data, callback)

	connection.end()
}

exports.find = (callback) => {
	return connection.query('SELECT * FROM roles', callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update roles set nombre = ? where id_rol = ?', [data.nombre, data.id_rol], callback)

	connection.end()
}