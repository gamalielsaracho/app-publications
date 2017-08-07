import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM ciudades', callback)

	connection.end()
}

exports.findById = (idCiudad, callback) => {
	return connection.query('select * from ciudades where id_ciudad = ?', [idCiudad], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO ciudades SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update ciudades set descripcion = ? where id_ciudad = ?', [data.descripcion, data.id_ciudad], callback)

	connection.end()
}

exports.delete = (idCiudad, callback) => {	
	return connection.query('DELETE FROM ciudades WHERE id_ciudad = ?', [idCiudad], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO ciudades SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update ciudades set descripcion = ? where id_ciudad = ?', [data.descripcion, data.id_ciudad], callback)

	connection.end()
}