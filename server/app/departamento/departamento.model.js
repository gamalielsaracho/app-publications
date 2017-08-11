import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM departamentos', callback)

	connection.end()
}

exports.findById = (idDepartamento, callback) => {
	return connection.query('select * from departamentos where id_departamento = ?', [idDepartamento], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO departamentos SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update departamentos set descripcion = ? where id_departamento = ?', [data.descripcion, data.id_departamento], callback)

	connection.end()
}

exports.delete = (idDepartamento, callback) => {	
	return connection.query('DELETE FROM departamentos WHERE id_departamento = ?', [idDepartamento], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO departamentos SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update departamentos set descripcion = ? where id_departamento = ?', [data.descripcion, data.id_departamento], callback)

	connection.end()
}