import connection from '../../config/connection'

exports.find = (nroDocumento, id_tipoDocumento, callback) => {
	return connection.query('select * from pacientes pa alergias al pacientesAlergias paAl WHERE pa.nroDocumento = paAl.nroDocumento AND pa.id_tipoDocumento = paAl.id_tipoDocumento AND al.id_alergia = paAl.id_alergia', [], callback)

	connection.end()
}

// Esta función trae todos las alergias que tiene un paciente.
// listar por id_paciente.
exports.find = (nroDocumento, id_tipoDocumento, id_alergia, callback) => {
	return connection.query('select * from pacientes pa alergias al pacientesAlergias paAl WHERE pa.nroDocumento = paAl.nroDocumento AND pa.id_tipoDocumento = paAl.id_tipoDocumento AND al.id_alergia = paAl.id_alergia', [], callback)

	connection.end()
}

// exports.findById = (idRol, callback) => {
// 	return connection.query('select * from pacientesAlergias where id_rol = ?', [idRol], callback)

// 	connection.end()
// }

// Agregar una alegia a un paciente, Simpre que el paciente exista.
exports.create = (data, callback) => {
	return connection.query('INSERT INTO pacientesAlergias SET ?', data, callback)

	connection.end()
}

// Se actualiza una alergia para una paciente, simpre y cuando el paciente EXISTA.
exports.update = (data, callback) => {
	return connection.query('UPDATE pacientesAlergias SET id_alergia = ?, observaciones = ? WHERE nroDocumento = ? id_tipoDocumento = ?', [data.id_alergia, data.observaciones, data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}

// Elimina la alergia de una paciente.
exports.delete = (nroDocumento, id_tipoDocumento, id_alergia, callback) => {	
	return connection.query('DELETE FROM pacientesAlergias WHERE nroDocumento = ?, id_tipoDocumento = ?, id_alergia = ?', [nroDocumento, id_tipoDocumento, id_alergia], callback)

	connection.end()
}