import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM departamentos', callback)

	connection.end()
}

exports.findById = (data, callback) => {
	return connection.query('select * from departamentos where id_departamento = ?', [data.id_departamento], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM departamentos WHERE descripcion = ?
	`

	return connection.query(q, [ data.descripcion.trim() ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO departamentos (id_departamento, descripcion)
			VALUES (null, LOWER(?))
	`

	return connection.query(q, [ data.descripcion.trim() ], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE departamentos SET descripcion = LOWER(?) where id_departamento = ?
	`
	return connection.query(q, [data.descripcion.trim(), data.id_departamento], callback)

	connection.end()
}

exports.delete = (data, callback) => {	
	return connection.query('DELETE FROM departamentos WHERE id_departamento = ?', [data.id_departamento], callback)

	connection.end()
}