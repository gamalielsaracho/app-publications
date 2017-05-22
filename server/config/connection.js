import mysql from 'mysql'

// console.log('hola desde connection.json')

var dataBase = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'mercado'
}

export default mysql.createConnection(dataBase, function(err, connection) {
	if(err) {
		console.log('Error connecting '+err.stack)
		return
	}

	connection.connect((err, success) => {
		if(err) {
			console.log('Error connecting '+err.stack)
			return
		}

		return success
	})
})




// connection.connect(function(err) {

// 	console.log('connected as id '+connection.threadId)
// })
// // 		return connection.query('select * from prestatario WHERE prestamoId = ?', [prestamoId],callback)
// // 		connection.end()