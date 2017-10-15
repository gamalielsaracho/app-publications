import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT 
			* 
		FROM 
			medicamentosEntregados medicamentoEntregado,
			personales personal,
			pacientes paciente
		WHERE
			medicamentoEntregado.id_personal =	personal.id_personal AND
			medicamentoEntregado.id_paciente =	paciente.id_paciente
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (data, callback) => {

	let q = `
		SELECT 
			* 
		FROM 
			medicamentosEntregados medicamentoEntregado,
			personales personal,
			pacientes paciente
		WHERE
			medicamentoEntregado.id_personal =	personal.id_personal AND
			medicamentoEntregado.id_paciente =	paciente.id_paciente AND
			medicamentoEntregado.id_medicamentoEntregado = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_medicamentoEntregado], callback)

	connection.end()
}


exports.create = (data, callback) => {
	let q = `
		INSERT INTO medicamentosEntregados (
			id_medicamentoEntregado,
			id_personal,
			id_paciente,
			fecha
		)

		VALUES (null, ?, ?, now())
	`
	return connection.query(q, [ data.id_personal,
								 data.id_paciente ], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {

	let q = `
		SELECT
			*
		FROM
			medicamentosEntregados
		WHERE
			id_medicamentoEntregado = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_medicamentoEntregado], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE medicamentosEntregados SET 
			id_paciente = ?
			WHERE
				id_medicamentoEntregado = ?
	`

	return connection.query(q, [ data.id_paciente,
								 data.id_medicamentoEntregado ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM medicamentosEntregados 
			WHERE
				id_medicamentoEntregado = ?
	`

	return connection.query(q, [data.id_medicamentoEntregado], callback)

	connection.end()
}