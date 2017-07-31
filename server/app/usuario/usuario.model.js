// import mysql from 'mysql'

import connection from '../../config/connection'

exports.crear = (data, callback) => {

	return connection.query('INSERT INTO users SET ?', data, callback)

	connection.end()
}

exports.verificarCorreo = (correo, callback) => {

	return connection.query('select * from users where correo = ?', [correo], callback)

	connection.end()
}

// exports.verificarContrasena = (contrasenaFormulario, callback) => {
// 	return connection.query('select * from users where contrasena = ?', [contrasena], callback)
// }

exports.listar = (callback) => {

	return connection.query('SELECT * FROM users', callback)

	connection.end()
}

exports.mostrar = (userId, callback) => {
	return connection.query('select * from users where id = ?', [userId], callback)

	connection.end()
}