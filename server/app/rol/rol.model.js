import connection from '../../config/connection'

exports.find = (callback) => {
	// LOWER(*)
	return connection.query('SELECT * FROM roles', callback)

	connection.end()
}

exports.findById = (idRol, callback) => {
	return connection.query('select * from roles where id_rol = ?', [idRol], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO roles SET ?
	`
	return connection.query(q, data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update roles set descripcion = ? where id_rol = ?', [data.descripcion, data.id_rol], callback)

	connection.end()
}

exports.delete = (idRol, callback) => {
	console.log("el id es :"+idRol)
	
	return connection.query('DELETE FROM roles WHERE id_rol = ?', [idRol], callback)

	connection.end()
}