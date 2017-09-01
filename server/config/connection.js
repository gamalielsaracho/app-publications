import mysql from 'mysql'

var dataBase = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'usf'
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
