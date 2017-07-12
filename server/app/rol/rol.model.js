import connection from '../../config/connection'

exports.crear = (data, callback) => {
	return connection.query('INSERT INTO roles SET ?', data, callback)

	connection.end()
}

exports.listar = (callback) => {
	return connection.query('SELECT * FROM roles', callback)

	connection.end()
}

exports.mostrar = (id, callback) => {
	console.log("el ide que encontre es: "+id)

	return connection.query('select * from roles where id_rol = ?', [id], callback)

	connection.end()
}

exports.eliminar = (id, callback) => {
	return connection.query('delete from roles where id_rol = ?', [id], callback)

	connection.end()
}

exports.editar = (data, callback) => {
	return connection.query('update roles set nombre = ? where id_rol = ?', [data.nombre, data.id_rol], callback)

	connection.end()
}