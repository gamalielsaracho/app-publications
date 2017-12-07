import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM tratamientos', callback)

	connection.end()
}


exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE tratamientos SET
			imprimido = true
		WHERE
			id_tratamiento = ?
	`

	return connection.query(q, [ data.id_tratamiento ], callback)

	connection.end()
}

exports.findByIdConsulta = (data, callback) => {
	let q = `
		SELECT
			* 
		FROM 
			tratamientos
		WHERE
			id_consulta = ?
	`
	return connection.query(q, [ data.id_consulta ], callback)

	connection.end()
}

exports.findById = (data, callback) => {
	return connection.query('select * from tratamientos where id_tratamiento = ?', [data.id_tratamiento], callback)

	connection.end()
}


exports.create = (data, callback) => {
	let q = `
		INSERT INTO tratamientos (id_tratamiento, id_consulta, fechaCreacion)
			VALUES (null, ?, now());
	`
	return connection.query(q, [ data.id_consulta ], callback)

	connection.end()
}


exports.delete = (data, callback) => {	
	return connection.query('DELETE FROM tratamientos WHERE id_tratamiento = ?', [data.id_tratamiento], callback)

	connection.end()
}