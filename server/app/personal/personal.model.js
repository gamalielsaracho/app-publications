// import mysql from 'mysql'

import connection from '../../config/connection'

exports.create = (data, callback) => {

	return connection.query('INSERT INTO personales SET ?', data, callback)

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
	var options = {
		sql: 'select * from personales personal, roles rol where personal.id_rol = rol.id_rol AND correo = ?', 
		nestTables: true
	}

	return connection.query(options, [correo], callback)

	connection.end()
}

// exports.verificarContrasena = (contrasenaFormulario, callback) => {
// 	return connection.query('select * from personales where contrasena = ?', [contrasena], callback)
// }

exports.find = (callback) => {
	let q = `
		SELECT * FROM personales personal, roles rol, especialidades especialidad
			WHERE
				personal.id_rol = rol.id_rol AND
				personal.id_especialidad = especialidad.id_especialidad
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (idPersonal, callback) => {
	return connection.query('select * from personales where id_personal = ?', [idPersonal], callback)

	connection.end()
}