import express from 'express'

let app = express()
let server = require('http').Server(app)

let io = require('socket.io')(server)


app.get('/', (req, res) => {
	res.sendfile('index.html')
})

io.on('connection', function (socket) {
	console.log('Un usuario Conectado INICIO.!')
	
	require('././app/usuario/usuario.sockets')(socket, io)
	require('././app/rol/rol.sockets')(socket, io)

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