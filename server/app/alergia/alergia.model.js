import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM alergias', callback)

	connection.end()
}

exports.findById = (idAlergia, callback) => {
	return connection.query('select * from alergias where id_alergia = ?', [idAlergia], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO alergias SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update alergias set descripcion = ? where id_alergia = ?', [data.descripcion, data.id_alergia], callback)

	connection.end()
}

exports.delete = (idAlergia, callback) => {	
	return connection.query('DELETE FROM alergias WHERE id_alergia = ?', [idAlergia], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO alergias SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update alergias set descripcion = ? where id_alergia = ?', [data.descripcion, data.id_alergia], callback)

	connection.end()
}