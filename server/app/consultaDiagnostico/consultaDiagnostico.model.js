import connection from '../../config/connection'

exports.find = (idConsulta, callback) => {

	let q = `
		SELECT 
			* 
		FROM
			consultasDiagnosticos consultaDiagnostico,
			diagnosticos diagnostico
		WHERE
			consultaDiagnostico.id_diagnostico = diagnostico.id_diagnostico AND
			consultaDiagnostico.id_consulta = ?
		ORDER BY consultaDiagnostico.id_consultaDiagnostico DESC
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idConsulta], callback)

	connection.end()
}

exports.findById = (idConsultaDiagnostico, callback) => {

	let q = `
		SELECT * 
			FROM 
				consultasDiagnosticos consultaDiagnostico,
				diagnosticos diagnostico
			WHERE
				consultaDiagnostico.id_diagnostico = diagnostico.id_diagnostico AND
				id_consultaDiagnostico = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idConsultaDiagnostico], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT 
			* 
		FROM 
			consultasDiagnosticos
		WHERE
			id_diagnostico = ? AND 
			id_consulta = ?
	`
	return connection.query(q, [data.id_diagnostico, data.id_consulta], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO consultasDiagnosticos (
			id_consultaDiagnostico, id_diagnostico, id_consulta, observaciones
		)
		VALUES (null, ?, ?, LOWER(?));
	`

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.id_diagnostico,
								 data.id_consulta,
								 data.observaciones ], callback)

	connection.end()
}

exports.findByIdToUpdate = (idConsultaDiagnostico, callback) => {

	let q = `
		SELECT * 
			FROM 
				consultasDiagnosticos consultaDiagnostico,
				diagnosticos diagnostico				
			WHERE
				consultaDiagnostico.id_diagnostico = diagnostico.id_diagnostico AND
				consultaDiagnostico.id_consultaDiagnostico = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idConsultaDiagnostico], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE consultasDiagnosticos SET 
			observaciones = ?
		WHERE 
			id_consultaDiagnostico = ?
	`
	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.observaciones, 
								 data.id_consultaDiagnostico ], callback)

	connection.end()
}

exports.delete = (idConsultaDiagnostico, callback) => {	

	let q = `
		DELETE FROM consultasDiagnosticos 
			WHERE
				id_consultaDiagnostico = ?
	`

	return connection.query(q, [idConsultaDiagnostico], callback)

	connection.end()
}