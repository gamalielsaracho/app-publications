import connection from '../../config/connection'

exports.create = (data, callback) => {
	return connection.query('INSERT INTO especialidades SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update especialidades set descripcion = ? where id_especialidad = ?', [data.nombre, data.id_especialidad], callback)

	connection.end()
}