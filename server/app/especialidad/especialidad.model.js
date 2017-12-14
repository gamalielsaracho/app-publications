import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM especialidades ORDER BY id_especialidad DESC', callback)

	connection.end()
}

exports.findById = (idEspecialidad, callback) => {
	return connection.query('select * from especialidades where id_especialidad = ?', [idEspecialidad], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM especialidades 
			WHERE
			descripcion = ?
	`

	return connection.query(q, [data.descripcion], callback)

	connection.end()
}


exports.create = (data, callback) => {
	let q = `
		INSERT INTO especialidades (id_especialidad, descripcion)
			VALUES (null, LOWER(?))
	`

	if(data.descripcion) {
		data.descripcion = data.descripcion.trim()
	}

	return connection.query(q, [data.descripcion], callback)

	connection.end()
}


exports.update = (data, callback) => {
	let q = `
		UPDATE especialidades SET 
			descripcion = LOWER(?)
			WHERE 
				id_especialidad = ?
	`

	if(data.descripcion) {
		data.descripcion = data.descripcion.trim()
	}

	return connection.query(q, [data.descripcion, data.id_especialidad], callback)

	connection.end()
}


exports.delete = (idEspecialidad, callback) => {
	return connection.query('delete from especialidades where id_especialidad = ?', [idEspecialidad], callback)

	connection.end()
}





