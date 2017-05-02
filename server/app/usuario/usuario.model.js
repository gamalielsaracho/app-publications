import mysql from 'mysql'

exports.crear = (data, callback) => {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'mercado'
	})

	connection.connect(function(err) {
		if(err) {
			console.log('Error connecting '+err.stack)
			return
		}

		console.log('conectado a la base de datos.')
	})

	return connection.query('INSERT INTO usuario SET ?', [data],callback)

	connection.end()
}

exports.listar = (callback) => {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'mercado'
	})

	connection.connect(function(err) {
		if(err) {
			console.log('Error connecting '+err.stack)
			return
		}

		console.log('conectado a la base de datos.')
	})

	return connection.query('SELECT * FROM usuario', callback)

	connection.end()
}