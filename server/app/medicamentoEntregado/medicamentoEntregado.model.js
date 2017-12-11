import connection from '../../config/connection'

import getHour from '../useFul/getHour'

exports.find = (callback) => {

	let q = `
		SELECT 
			* 
		FROM 
			medicamentosEntregados medicamentoEntregado,

			pacientes paciente,
			personales farmaceutico,
			tiposdocumentos tpDocPaciente,
			tiposdocumentos tpDocFarmaceutico
		WHERE
			medicamentoEntregado.id_paciente = paciente.id_paciente AND
			paciente.id_tipoDocumento = tpDocPaciente.id_tipoDocumento AND
			medicamentoEntregado.id_personal = farmaceutico.id_personal AND
			farmaceutico.id_tipoDocumento = tpDocFarmaceutico.id_tipoDocumento
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

			pacientes paciente,
			personales farmaceutico,
			tiposdocumentos tpDocPaciente,
			tiposdocumentos tpDocFarmaceutico
		WHERE
			medicamentoEntregado.id_paciente = paciente.id_paciente AND
			paciente.id_tipoDocumento = tpDocPaciente.id_tipoDocumento AND
			medicamentoEntregado.id_personal = farmaceutico.id_personal AND
			farmaceutico.id_tipoDocumento = tpDocFarmaceutico.id_tipoDocumento AND
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
			fecha,
			hora
		)

		VALUES (null, ?, ?, now(), ?)
	`
	return connection.query(q, [ data.id_personal,
								 data.id_paciente,
								 getHour() ], callback)

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


exports.updateStatePrint = (data, callback) => {
	let q = `
		UPDATE medicamentosEntregados SET 
			imprimido = 1
			WHERE
				id_medicamentoEntregado = ?
	`

	return connection.query(q, [ data.id_medicamentoEntregado ], callback)

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