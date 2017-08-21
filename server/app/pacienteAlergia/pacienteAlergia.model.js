import connection from '../../config/connection'

	// Módulo paciente X alergia.

// Esta función trae todas las alergias que tiene un paciente.
// listar por id_paciente.
exports.find = (nroDocumento, id_tipoDocumento, callback) => {
	let q = `
		SELECT alergia.descripcion, alergia.id_alergia,
			pacienteAlergia.nroDocumento, pacienteAlergia.id_tipoDocumento, pacienteAlergia.observaciones
			FROM alergias alergia, pacientesAlergias pacienteAlergia 
				WHERE pacienteAlergia.nroDocumento = ? AND 
				pacienteAlergia.id_tipoDocumento = ? 
				AND pacienteAlergia.id_alergia = alergia.id_alergia 
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [nroDocumento, id_tipoDocumento], callback)

	connection.end()
}

exports.findById = (data, callback) => {
	let q = `
		SELECT alergia.id_alergia, alergia.descripcion,
			pacienteAlergia.nroDocumento, pacienteAlergia.id_tipoDocumento, pacienteAlergia.observaciones
			FROM alergias alergia, pacientesAlergias pacienteAlergia 
				WHERE pacienteAlergia.nroDocumento = ? AND 
				pacienteAlergia.id_tipoDocumento = ? AND 
				pacienteAlergia.id_alergia = ? AND
				pacienteAlergia.id_alergia = alergia.id_alergia
	`
	var options = {
		sql: q, 
		nestTables: true
	}
		// SELECT * FROM pacientesAlergias 
			// WHERE nroDocumento = ?, id_tipoDocumento = ?, id_alergia = ? 
	return connection.query(options, [data.nroDocumento, data.id_tipoDocumento, data.id_alergia], callback)

	connection.end()
}

// Agregar una alegia a un paciente, Simpre que el paciente exista.
// En data tendrá, nroDocumento, id_tipoDocumento, id_alergia, observaciones.
exports.create = (data, callback) => {
	return connection.query('INSERT INTO pacientesAlergias SET ?', data, callback)

	connection.end()
}

// Eliminar 
exports.delete = (data, callback) => {
	// console.log(data)
	return connection.query('DELETE FROM pacientesAlergias WHERE nroDocumento = ? AND id_tipoDocumento = ? AND id_alergia = ?', [data.nroDocumento, data.id_tipoDocumento, data.id_alergia], callback)

	connection.end()
}

// Se actualiza una alergia para un paciente, simpre y cuando el paciente EXISTA.
exports.update = (data, callback) => {
	return connection.query('UPDATE pacientesAlergias SET id_alergia = ?, observaciones = ? WHERE nroDocumento = ? id_tipoDocumento = ?', [data.id_alergia, data.observaciones, data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}