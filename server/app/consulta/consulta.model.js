import connection from '../../config/connection'

exports.findConsultaXdiagnosticos = (callback) => {

	let q = `
		SELECT 
			 *
		FROM
			consultasdiagnosticos cXd,
		    diagnosticos diagnostico,
		    consultas consulta
		WHERE
			cXd.id_consulta = consulta.id_consulta AND
		    cXd.id_diagnostico = diagnostico.id_diagnostico
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findOnlyDiagnosticos = (callback) => {

	let q = `
		SELECT
			*
		FROM
			diagnosticos
	`

	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findOnlyYears = (callback) => {

	let q = `
		SELECT
			DISTINCT(YEAR(fecha)) fecha
		FROM
			consultas
	`

	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findCantidadDiagnosticosPorAnho = (idDiagnostico, callback) => {

	let q = `
	SELECT 
		* 
  	FROM
      (SELECT
          DISTINCT(cXd.id_diagnostico),
          YEAR(consulta.fecha) fecha,
          diagnostico.descripcion,
          (SELECT COUNT(cXdA.id_diagnostico) FROM consultasdiagnosticos cXdA, consultas con WHERE cXdA.id_diagnostico = diagnostico.id_diagnostico AND cXdA.id_consulta = con.id_consulta AND con.fecha = consulta.fecha) cantidad
         FROM
          consultasdiagnosticos cXd,
          diagnosticos diagnostico,
          consultas consulta
        WHERE
          cXd.id_diagnostico = diagnostico.id_diagnostico AND 
          diagnostico.id_diagnostico = ? AND
          cXd.id_consulta = consulta.id_consulta) tGral
	`

	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [idDiagnostico], callback)

	connection.end()
}

exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM
				consultas consulta,
				personales personal,
				pacientes paciente
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

// Listar todas las consultas que realizó un médico/a.
// para mostrarlo al mismo.
exports.findListByIdPersonal = (idPersonal, callback) => {
	let q = `
		SELECT * 
			FROM
				consultas consulta,
				personales personal,
				pacientes paciente
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente AND
				consulta.id_personal = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPersonal], callback)

	connection.end()
}

// Para el historial clinico del paciente.
exports.findListByIdPaciente = (idPaciente, callback) => {

	let q = `
		SELECT * 
			FROM
				consultas consulta,
				personales personal,
				pacientes paciente
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente AND
				consulta.id_paciente = ?
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPaciente], callback)

	connection.end()
}

exports.findById = (data, callback) => {
	let q = `
		SELECT * 
			FROM 
				consultas consulta,
				personales personal,
				pacientes paciente,

				preconsultas preconsulta,
				personales personalEnfermeria,
				niveles nivel
			WHERE
				consulta.id_personal = personal.id_personal AND
				consulta.id_paciente = paciente.id_paciente AND

				consulta.id_preconsulta = preconsulta.id_preconsulta AND
				preconsulta.id_personal = personalEnfermeria.id_personal AND
				preconsulta.id_nivel = nivel.id_nivel AND
				id_consulta = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_consulta], callback)

	connection.end()
}

// exports.verifyIfExist = (data, callback) => {
// 	let q = `
// 		SELECT * FROM consultas 
// 			WHERE
// 			id_diagnostico = ?
// 	`

// 	return connection.query(q, [data.id_diagnostico], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	console.log(data)
	let q = `
		INSERT INTO consultas (
			id_consulta, fecha, fechaProximaConsulta, 
			id_personal, id_preconsulta, observacionDiagnostico, id_paciente)

		VALUES (null, ?, ?, ?, ?, LOWER(?), ?)
	`
	if(data.observacionDiagnostico) {
		data.observacionDiagnostico.trim()
	}

	return connection.query(q, [ data.fecha,
								 data.fechaProximaConsulta,
								 data.id_personal,
								 data.id_preconsulta,
								 data.observacionDiagnostico,
								 data.id_paciente ], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {
	let q = `
		SELECT * FROM consultas 
			WHERE
				id_consulta = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_consulta], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE consultas SET 
			fechaProximaConsulta = ?,
			observacionDiagnostico = ?
		WHERE
			id_consulta = ?
	`

	if(data.observacionDiagnostico) {
		data.observacionDiagnostico.trim()
	}

	return connection.query(q, [ data.fechaProximaConsulta,
								 data.observacionDiagnostico,
								 data.id_consulta ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM consultas 
			WHERE
				id_consulta = ?
	`

	return connection.query(q, [data.id_consulta], callback)

	connection.end()
}