import connection from '../../config/connection'

	// Módulo paciente X alergia.

// Esta función trae todas las alergias que tiene un paciente.
// listar por id_paciente.
exports.findAlergiasByPaciente = (nroDocumento, id_tipoDocumento, callback) => {
	return connection.query('select * from alergias al pacientesAlergias paAl WHERE paAl.nroDocumento = ? AND paAl.id_tipoDocumento = ? AND al.id_alergia = paAl.id_alergia', [nroDocumento, id_tipoDocumento], callback)

	connection.end()
}

// En data tendrá, nroDocumento, id_tipoDocumento, id_alergia, observaciones.
exports.addAlergiaByPaciente = (data, callback) => {
	return connection.query('INSERT INTO pacientesAlergias SET ?', data, callback)

	connection.end()
}

// Eliminar 
exports.deleteAlergiaByPaciente = (data, callback) => {
	return connection.query('DELETE FROM pacientesAlergias WHERE nroDocumento = ?, id_tipoDocumento = ?, id_alergia = ?', [data.nroDocumento, data.id_tipoDocumento, data.id_alergia], callback)

	connection.end()
}

// Agregar una alegia a un paciente, Simpre que el paciente exista.
exports.create = (data, callback) => {
	return connection.query('INSERT INTO pacientesAlergias SET ?', data, callback)

	connection.end()
}

// Se actualiza una alergia para una paciente, simpre y cuando el paciente EXISTA.
exports.updateByPaciente = (data, callback) => {
	return connection.query('UPDATE pacientesAlergias SET id_alergia = ?, observaciones = ? WHERE nroDocumento = ? id_tipoDocumento = ?', [data.id_alergia, data.observaciones, data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}