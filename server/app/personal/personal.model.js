// import mysql from 'mysql'

import connection from '../../config/connection'


exports.create = (data, callback) => {
	let q = `
		INSERT INTO personales (
			id_personal, 
			nroDocumento,
			nroRegistro,
			nombres,
			apellidos,
			telefono,
			celular,
			direccion,
			fecha_nacimiento,
			correo,
			contrasena,
			id_rol,
			id_especialidad,
			id_tipoDocumento
		)

		VALUES (
			null,
			LOWER(?), LOWER(?), LOWER(?), 
			LOWER(?), ?, ?, LOWER(?), ?, ?, ?, ?, ?, ?
		)
	`

	if(data.nroDocumento){
		data.nroDocumento.trim()
	}

	if(data.nroRegistro){
		data.nroRegistro.trim()
	}

	if(data.nombres){
		data.nombres.trim()
	}

	if(data.apellidos){
		data.apellidos.trim()
	}

	if(data.telefono){
		data.telefono.trim()
	}

	if(data.celular){
		data.celular.trim()
	}

	if(data.direccion){
		data.direccion.trim()
	}

	if(data.correo){
		data.correo.trim()
	}

	if(data.contrasena){
		data.contrasena.trim()
	}


	return connection.query(q, [ data.nroDocumento,
								 data.nroRegistro,
								 data.nombres,
								 data.apellidos,
								 data.telefono,
								 data.celular,
								 data.direccion,
								 data.fecha_nacimiento,
								 data.correo,
								 data.contrasena,
								 data.id_rol,
								 data.id_especialidad || 1,
								 data.id_tipoDocumento ], callback)

	connection.end()
}


// exports.create = (data, callback) => {


// 	return connection.query('INSERT INTO personales SET ?', data, callback)

// 	connection.end()
// }


exports.verificarDocumentoYtipo = (data, callback) => {
	let q = `
		select 
			* 
		from 
			personales 
		where 
			nroDocumento = ? AND
			id_tipoDocumento = ?
	`

	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [data.nroDocumento, data.id_tipoDocumento], callback)

	connection.end()
}

exports.verifyEmailRegister = (correo, callback) => {
	var options = {
		sql: 'select * from personales where correo = ?', 
		nestTables: false
	}

	return connection.query(options, [correo], callback)

	connection.end()
}


exports.verifyEmailAuth = (correo, callback) => {
	let q = `
		select 
			* 
		from
			personales personal, roles rol 
		where
			personal.id_rol = rol.id_rol AND correo = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [correo], callback)

	connection.end()
}


exports.getDatoPersonal = (data, callback) => {
	let q = `
		select 
			* 
		from
			personales  
		where
			id_personal = ?
	`
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [data.id_personal], callback)

	connection.end()
}

// exports.verificarContrasena = (contrasenaFormulario, callback) => {
// 	return connection.query('select * from personales where contrasena = ?', [contrasena], callback)
// }

exports.find = (callback) => {
	let q = `
		select 
			* 
		from 
			personales personal,
			roles rol,
			especialidades especialidad,
			tiposdocumentos tipoDocumento
		where
			personal.id_rol = rol.id_rol AND
			personal.id_especialidad = especialidad.id_especialidad AND
			personal.id_tipoDocumento = tipoDocumento.id_tipoDocumento
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findMedicos = (callback) => {
	let q = `
		SELECT * FROM 
			personales personal, 
			roles rol,
			especialidades especialidad
		WHERE
			personal.id_especialidad = especialidad.id_especialidad AND
			personal.id_rol = rol.id_rol
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}


exports.findById = (idPersonal, callback) => {
	let q = `
		select 
			* 
		from 
			personales personal,
			roles rol,
			especialidades especialidad,
			tiposdocumentos tipoDocumento
		where
			personal.id_rol = rol.id_rol AND
			personal.id_especialidad = especialidad.id_especialidad AND
			personal.id_tipoDocumento = tipoDocumento.id_tipoDocumento AND
			personal.id_personal = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPersonal], callback)

	connection.end()
}


exports.findByIdToEdit = (idPersonal, callback) => {
	return connection.query('select * from personales where id_personal = ?', [idPersonal], callback)

	connection.end()
}

exports.update = (data, callback) => {

	// console.log(data)
	let q = `
		UPDATE personales SET
			nroDocumento = LOWER(?),
			nroRegistro = LOWER(?),
			nombres = LOWER(?),
			apellidos = LOWER(?),
			telefono = LOWER(?),
			celular = LOWER(?),
			direccion = LOWER(?),
			fecha_nacimiento = ?,
			correo = ?,
			contrasena = ?,
			id_rol = ?,
			id_especialidad = ?,
			id_tipoDocumento = ?
		WHERE
			id_personal = ?
	`


		if(data.nroDocumento){
			data.nroDocumento.trim()
		}

		if(data.nroRegistro){
			data.nroRegistro.trim()
		}

		if(data.nombres){
			data.nombres.trim()
		}

		if(data.apellidos){
			data.apellidos.trim()
		}

		if(data.telefono){
			data.telefono.trim()
		}

		if(data.celular){
			data.celular.trim()
		}

		if(data.direccion){
			data.direccion.trim()
		}

		if(data.correo){
			data.correo.trim()
		}

		if(data.contrasena){
			data.contrasena.trim()
		}
	
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, [ data.nroDocumento,
									   data.nroRegistro,
									   data.nombres,
									   data.apellidos,
									   data.telefono,
									   data.celular,
									   data.direccion,
									   data.fecha_nacimiento,
									   data.correo,
									   data.contrasena,
									   data.id_rol,
									   data.id_especialidad,
									   data.id_tipoDocumento,
									   data.id_personal ], callback)

	connection.end()
}



