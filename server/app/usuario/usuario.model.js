// import mysql from 'mysql'

import connection from '../../config/connection'

exports.crear = (data, callback) => {

	return connection.query('INSERT INTO usuario SET ?', data, callback)

	connection.end()
}

exports.verificarCorreo = (correo, callback) => {

	return connection.query('select * from usuario where correo = ?', [correo], callback)

	connection.end()
}

// exports.verificarContrasena = (contrasenaFormulario, callback) => {
// 	return connection.query('select * from usuario where contrasena = ?', [contrasena], callback)
// }

exports.listar = (callback) => {

	return connection.query('SELECT * FROM usuario', callback)

	connection.end()
}

exports.mostrar = (usuarioId, callback) => {
	return connection.query('select * from usuario where id = ?', [usuarioId], callback)

	connection.end()
}