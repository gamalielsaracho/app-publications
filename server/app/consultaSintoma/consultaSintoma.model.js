import connection from '../../config/connection'

// CONSULTAS X SINTOMAS.
exports.find = (idConsulta, callback) => {

	let q = `
		SELECT
			*
		FROM
			consultasSintomas consultaSintoma,
			sintomas sintoma
		WHERE
			consultaSintoma.id_sintoma = sintoma.id_sintoma AND
			consultaSintoma.id_consulta = ?
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idConsulta], callback)

	connection.end()
}


exports.findById = (idConsultaSintoma, callback) => {

	let q = `
		SELECT
			*
		FROM
			consultasSintomas consultaSintoma,
			sintomas sintoma
		WHERE
			consultaSintoma.id_sintoma = sintoma.id_sintoma AND
			consultaSintoma.id_consultaSintoma = ?

	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idConsultaSintoma], callback)

	connection.end()
}

exports.findByIdToEdit = (idConsultaSintoma, callback) => {

	let q = `
		SELECT
			consultaSintoma.id_consultaSintoma,
			consultaSintoma.id_sintoma,
			consultaSintomaid_consulta,

			sintoma.observaciones
		FROM
			consultasSintomas consultaSintoma,
			sintomas sintoma
		WHERE
			consultaSintoma.id_sintoma = sintoma.id_sintoma AND
			consultaSintoma.id_consultaSintoma = ?

	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idConsultaSintoma], callback)

	connection.end()
}


exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM consultasSintomas 
			WHERE
				id_consulta = ? AND
				id_sintoma = ?
	`
	return connection.query(q, [data.id_consulta, data.id_sintoma], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO consultasSintomas (id_consultaSintoma, id_sintoma, id_consulta, observaciones)
			VALUES (null, ?, ?, LOWER(?));
	`
	if(data.observaciones) {
		data.observaciones.trim()
	}
	
	
	return connection.query(q, [ data.id_sintoma,
								 data.id_consulta,
								 data.observaciones ], callback)

	connection.end()
}


exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE consultasSintomas SET 
			observaciones = LOWER(?)
		WHERE
			id_consultaSintoma = ?
	`

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.observaciones,
								 data.id_consultaSintoma ], callback)

	connection.end()
}

exports.delete = (idConsultaSintoma, callback) => {	

	let q = `
		DELETE FROM consultasSintomas 
			WHERE
				id_consultaSintoma = ?
	`

	return connection.query(q, [idConsultaSintoma], callback)

	connection.end()
}