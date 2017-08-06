import connection from '../../config/connection'

exports.create = (data, callback) => {
	return connection.query('INSERT INTO ciudades SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update ciudades set descripcion = ? where id_ciudad = ?', [data.descripcion, data.id_ciudad], callback)

	connection.end()
}