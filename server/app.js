import express from 'express'

let app = express()
let server = require('http').Server(app)

let io = require('socket.io')(server)


app.get('/', (req, res) => {
	res.sendfile('index.html')
})


io.on('connection', function (socket) {
	console.log('Un usuario Conectado INICIO.!')
	
	// Personal.
	require('././app/personal/personal.sockets')(socket, io)
	require('././app/rol/rol.sockets')(socket, io)
	require('././app/especialidad/especialidad.sockets')(socket, io)
	require('././app/ciudad/ciudad.sockets')(socket, io)
	require('././app/departamento/departamento.sockets')(socket, io)

	// Paciente.
	require('././app/area/area.sockets')(socket, io)
	require('././app/alergia/alergia.sockets')(socket, io)
	require('././app/paciente/paciente.sockets')(socket, io)

	

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