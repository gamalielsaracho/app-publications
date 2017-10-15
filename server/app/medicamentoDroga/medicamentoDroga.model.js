import connection from '../../config/connection'

// MEDICAMENTOS x DROGAS.
exports.find = (idMedicamento, callback) => {

	let q = `
		SELECT
			*
		FROM  
			medicamentosDrogas medicamentoDroga,
			drogas droga 
		WHERE
			medicamentoDroga.id_droga = droga.id_droga AND
			medicamentoDroga.id_medicamento = ?
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idMedicamento], callback)

	connection.end()
}

exports.findById = (idMedicamentoDroga, callback) => {

	let q = `
		SELECT
			*
		FROM  
			medicamentosDrogas medicamentoDroga,
			drogas droga			
		WHERE
			medicamentoDroga.id_droga = droga.id_droga AND
			medicamentoDroga.id_medicamentoDroga = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idMedicamentoDroga], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM medicamentosDrogas 
			WHERE
				id_medicamento = ? AND
				id_droga = ?
	`

	return connection.query(q, [data.id_medicamento, data.id_droga], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO medicamentosDrogas (
			id_medicamentoDroga, id_medicamento, id_droga, descripcionProporcion
		)
			VALUES (null, ?, ?, LOWER(?))
	`

	if(data.descripcionProporcion) {
		data.descripcionProporcion.trim()
	}
	
	return connection.query(q, [ data.id_medicamento,
								 data.id_droga,
							     data.descripcionProporcion ], callback)

	connection.end()
}

exports.findByIdToUpdate = (idMedicamentoDroga, callback) => {

	let q = `
		SELECT
			*
		FROM  
			medicamentosDrogas medicamentoDroga,
			drogas droga
		WHERE
			medicamentoDroga.id_droga = droga.id_droga AND
			medicamentoDroga.id_medicamentoDroga = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idMedicamentoDroga], callback)

	connection.end()
}

exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE medicamentosDrogas SET 
			descripcionProporcion = LOWER(?)
		WHERE
			id_medicamentoDroga = ?
	`

	if(data.descripcionProporcion) {
		data.descripcionProporcion = data.descripcionProporcion.toString().trim()
	}

	return connection.query(q, [ data.descripcionProporcion,
								 data.id_medicamentoDroga ], callback)

	connection.end()
}

exports.delete = (idMedicamentoDroga, callback) => {	

	let q = `
		DELETE FROM medicamentosDrogas 
			WHERE
				id_medicamentoDroga = ?
	`
	
	return connection.query(q, [idMedicamentoDroga], callback)

	connection.end()
}