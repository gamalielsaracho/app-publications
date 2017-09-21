import connection from '../../config/connection'

exports.find = (idConsulta, callback) => {

	let q = `
		SELECT 
			* 
		FROM 
			diagnosticosconsultas diagnosticoConsulta,
			diagnosticos diagnostico
		WHERE
			diagnosticoConsulta.id_diagnostico = diagnostico.id_diagnostico AND
			diagnosticoConsulta.id_consulta = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idConsulta], callback)

	connection.end()
}

exports.findById = (idDiagnosticoConsulta, callback) => {

	let q = `
		SELECT * 
			FROM 
				diagnosticosconsultas diagnosticoConsulta,
				diagnosticos diagnostico
			WHERE
				diagnosticoConsulta.id_diagnostico = diagnostico.id_diagnostico AND
				id_diagnosticoConsulta = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idDiagnosticoConsulta], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT 
			* 
		FROM 
			diagnosticosconsultas
		WHERE
			id_diagnostico = ? AND 
			id_consulta = ?
	`
	return connection.query(q, [data.id_diagnostico, data.id_consulta], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO diagnosticosconsultas (
			id_diagnosticoConsulta, id_diagnostico, id_consulta, observaciones
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

exports.findByIdToUpdate = (idDiagnosticoConsulta, callback) => {

	let q = `
		SELECT * 
			FROM 
				diagnosticosconsultas
			WHERE
				id_diagnosticoConsulta = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idDiagnosticoConsulta], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE diagnosticosconsultas SET 
			id_diagnostico = ?,
			id_consulta = ?,
			observaciones = ?
		WHERE 
			id_diagnosticoConsulta = ?
	`
	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.id_diagnostico,
								 data.id_consulta,
								 data.observaciones, 
								 data.id_diagnosticoConsulta ], callback)

	connection.end()
}

exports.delete = (idDiagnosticoConsulta, callback) => {	

	let q = `
		DELETE FROM diagnosticosconsultas 
			WHERE
				id_diagnosticoConsulta = ?
	`

	return connection.query(q, [idDiagnosticoConsulta], callback)

	connection.end()
}