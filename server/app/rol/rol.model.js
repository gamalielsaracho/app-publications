import connection from '../../config/connection'

exports.crear = (data, callback) => {
	return connection.query('INSERT INTO roles SET ?', data, callback)

	connection.end()
}

exports.listar = (callback) => {
	return connection.query('SELECT * FROM roles', callback)

	connection.end()
}