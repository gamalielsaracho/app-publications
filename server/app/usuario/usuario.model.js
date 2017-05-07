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

exports.listar = (callback) => {

	return connection.query('SELECT * FROM usuario', callback)

	connection.end()
}