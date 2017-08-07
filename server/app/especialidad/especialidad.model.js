import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM especialidades', callback)

	connection.end()
}

exports.findById = (idEspecialidad, callback) => {
	return connection.query('select * from especialidades where id_especialidad = ?', [idEspecialidad], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO especialidades SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {

	return connection.query('update especialidades set descripcion = ? where id_especialidad = ?', [data.descripcion, data.id_especialidad], callback)

	connection.end()
}

exports.delete = (idEspecialidad, callback) => {
	return connection.query('delete from especialidades where id_especialidad = ?', [idEspecialidad], callback)

	connection.end()
}





