import express from 'express'

// import bodyParser from 'body-parser'

import routes from './app/routes'

let app = express()
let server = require('http').Server(app)

let io = require('socket.io')(server)


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))


// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*")
// 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials")
// 	res.header("Access-Control-Allow-Credentials", true)
// 	next()
// })



// routes(app)

app.get('/', (req, res) => {
	res.sendfile('index.html')
})

io.on('connection', function (socket) {
	console.log('Un usuario Conectado.')

	socket.usuario = 'Rie'

	// Primero tiene que pasar por acá, y verificar el token.
	// socket.on('verificar_token', (data) => {
		
		// console.log(data)

		// socket.tokenUsuario = data.token

		require('././app/usuario/usuario.sockets')(socket, io)
		require('././app/rol/rol.sockets')(socket, io)
	// })


	// todos los sockets por cada modulo.
	// algo(socket, io)
	// if(usuario == 'Toro') {
	// } else {
		// console.log('No puedes ver esto.')
	// }

	socket.on('disconnect', function () {
		console.log('El usuario se Desconecto.')
	})
})



server.listen(3000, (err) => {
	if(err) {
		console.log(`Error al correr el servidor 3000`)
	}

	console.log(`Corriendo en el puerto 3000`)
})