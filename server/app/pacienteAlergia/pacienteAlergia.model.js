import connection from '../../config/connection'

	// Módulo paciente X alergia.

// Esta función trae todas las alergias que tiene un paciente.
// listar por id_paciente.
exports.find = (idPaciente, callback) => {
	let q = `
		SELECT alergia.descripcion, alergia.id_alergia,
			pacienteAlergia.id_paciente, pacienteAlergia.observaciones
			FROM alergias alergia, pacientesAlergias pacienteAlergia 
				WHERE 
				pacienteAlergia.id_alergia = alergia.id_alergia AND
				pacienteAlergia.id_paciente = ? 
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
		SELECT alergia.id_alergia, alergia.descripcion,
			pacienteAlergia.id_paciente, pacienteAlergia.observaciones
			FROM alergias alergia, pacientesAlergias pacienteAlergia 
				WHERE 
				pacienteAlergia.id_alergia = alergia.id_alergia AND
				pacienteAlergia.id_paciente = ? AND 
				pacienteAlergia.id_alergia = ?
	`
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [data.id_paciente, data.id_alergia], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT *
			FROM pacientesAlergias 
				WHERE 
					id_paciente = ? AND
					id_alergia = ?
	`
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [data.id_paciente, data.id_alergia], callback)

	connection.end()
}

// Agregar una alegia a un paciente, Simpre que el paciente exista.
// En data tendrá, id_paciente, id_alergia, observaciones.
exports.create = (data, callback) => {
	return connection.query('INSERT INTO pacientesAlergias SET ?', data, callback)

	connection.end()
}

// Eliminar 
exports.delete = (data, callback) => {
	// console.log(data)
	return connection.query('DELETE FROM pacientesAlergias WHERE id_paciente = ? AND id_alergia = ?', [data.id_paciente, data.id_alergia], callback)

	connection.end()
}

// Se actualiza una alergia para un paciente, simpre y cuando el paciente EXISTA.
exports.update = (data, callback) => {
	let q = `
		UPDATE pacientesAlergias SET observaciones = ? 
		WHERE 
			id_paciente = ? AND 
			id_alergia = ?
	`
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [data.observaciones, data.id_paciente, data.id_alergia], callback)

	connection.end()
}