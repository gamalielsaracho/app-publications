// import mysql from 'mysql'

import connection from '../../config/connection'

exports.create = (data, callback) => {

	return connection.query('INSERT INTO personales SET ?', data, callback)

	connection.end()
}

exports.verifyEmail = (correo, callback) => {

	return connection.query('select * from personales where correo = ?', [correo], callback)

	connection.end()
}

// exports.verificarContrasena = (contrasenaFormulario, callback) => {
// 	return connection.query('select * from personales where contrasena = ?', [contrasena], callback)
// }

exports.find = (callback) => {

	return connection.query('SELECT * FROM personales', callback)

	connection.end()
}

exports.findById = (idPersonal, callback) => {
	return connection.query('select * from personales where id_personal = ?', [idPersonal], callback)

	connection.end()
}