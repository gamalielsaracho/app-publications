import connection from '../../config/connection'

exports.find = (callback) => {
	let q = `
		SELECT * FROM pacientes pa, tiposDocumentos tipoDocumento, ciudades ciudad, areas area 
			WHERE pa.id_tipoDocumento = tipoDocumento.id_tipoDocumento AND
			pa.id_ciudad = ciudad.id_ciudad AND
			pa.id_area = area.id_area
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
		SELECT * FROM pacientes pa, tiposDocumentos tipoDocumento, ciudades ciudad, areas area
			WHERE pa.id_ciudad = ciudad.id_ciudad AND
			pa.id_area = area.id_area AND
			pa.nroDocumento = ? AND pa.id_tipoDocumento = ?
	`
	// let q = `
	// 	SELECT * FROM pacientes
	// 		WHERE
	// 			nroDocumento = ? AND id_tipoDocumento = ?
	// `
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {
	let q = `
		SELECT * FROM pacientes
			WHERE
				nroDocumento = ? AND id_tipoDocumento = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO pacientes SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	console.log('nroDocumento_old: '+data.nroDocumento_old)
	console.log('id_tipoDocumento_old: '+data.id_tipoDocumento_old)
	let q = `
		UPDATE pacientes SET
			nroDocumento=?, id_tipoDocumento=?, 
			nombres=?, apellidos=?, fechaNacimiento=?, 
			direccion=?, fechaMuerte=?, celular=?, 
			telefono=?, mujer=?, hombre=?, 
			id_area=?, id_ciudad=? 
		WHERE
			nroDocumento = ? AND
			id_tipoDocumento = ?
	`
	return connection.query(q, [
		data.nroDocumento, data.id_tipoDocumento, 
		data.nombres, data.apellidos, data.fechaNacimiento, 
		data.direccion, data.fechaMuerte, data.celular, 
		data.telefono, data.mujer, data.hombre, data.id_area, 
		data.id_ciudad, data.nroDocumento_old, 
		data.id_tipoDocumento_old ], callback);

	connection.end()
}

exports.delete = (data, callback) => {	
	return connection.query('DELETE FROM pacientes WHERE nroDocumento = ? AND id_tipoDocumento = ?', [data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}


	// Módulo paciente X alergia.

// Esta función trae todas las alergias que tiene un paciente.
// listar por id_paciente.
// exports.findAlergiasByPaciente = (nroDocumento, id_tipoDocumento, callback) => {
// 	return connection.query('select * from alergias al pacientesAlergias paAl WHERE paAl.nroDocumento = ? AND paAl.id_tipoDocumento = ? AND al.id_alergia = paAl.id_alergia', [nroDocumento, id_tipoDocumento], callback)

// 	connection.end()
// }

// // En data tendrá, nroDocumento, id_tipoDocumento, id_alergia, observaciones.
// exports.addAlergiaByPaciente = (data, callback) => {
// 	return connection.query('INSERT INTO pacientesAlergias SET ?', data, callback)

// 	connection.end()
// }

// // Eliminar 
// exports.deleteAlergiaByPaciente = (data, callback) => {
// 	return connection.query('DELETE FROM pacientesAlergias WHERE nroDocumento = ?, id_tipoDocumento = ?, id_alergia = ?', [data.nroDocumento, data.id_tipoDocumento, data.id_alergia], callback)

// 	connection.end()
// }