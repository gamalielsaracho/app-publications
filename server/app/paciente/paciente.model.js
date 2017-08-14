import connection from '../../config/connection'

exports.find = (callback) => {
	return connection.query('SELECT * FROM pacientes', callback)

	connection.end()
}

exports.findById = (idPaciente, callback) => {
	return connection.query('select * from pacientes where id_paciente = ?', [idPaciente], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO pacientes SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update pacientes set nroDocumento=?, id_tipoDocumento=?, nombres=?, apellidos=?, fechaNacimiento=?, direccion=?, fechaMuerte=?, celular=?, telefono=?, mujer=?, hombre=?, id_area=?, id_ciudad=? where id_paciente = ?', 
		[data.nroDocumento, data.id_tipoDocumento, data.nombres, data.apellidos, data.fechaNacimiento, data.direccion, data.fechaMuerte, data.celular, data.telefono, data.mujer, data.hombre, data.id_area, data.id_ciudad, data.id_paciente], callback);

	connection.end()
}

exports.delete = (idPaciente, callback) => {
	console.log("El id del paciente es :"+idPaciente)
	
	return connection.query('DELETE FROM pacientes WHERE id_paciente = ?', [idPaciente], callback)

	connection.end()
}