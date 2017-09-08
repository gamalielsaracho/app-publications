import express from 'express'

let app = express()
let server = require('http').Server(app)

let io = require('socket.io')(server)


app.get('/', (req, res) => {
	res.sendfile('index.html')
})

require('././app/pacienteAlergia/pacienteAlergia.sockets')(io)
require('././app/cita/cita.sockets')(io)
require('././app/preconsulta/preconsulta.sockets')(io)
require('././app/nivel/nivel.sockets')(io)
require('././app/parametroPreConsulta/parametroPreConsulta.sockets')(io)

require('././app/preConsultaParametro/preConsultaParametro.sockets')(io)

require('././app/unidadParametroPre/unidadParametroPre.sockets')(io)


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


// var nsp = io.of('/pacienteAlergia');

// nsp.on('connection', function(socket){
//   console.log('someone connected');

//   nsp.emit('hi', 'Hello everyone!');
// });


// var clients = 0;

// nsp.on('connection', function(socket){
// 	clients++;
// 	// Para cada uno.
// 	nsp.emit('broadcast',{ description: clients + ' clients connected!'});
	
// 	socket.on('disconnect', function () {
// 		clients--;
// 		nsp.emit('broadcast',{ description: clients + ' clients connected!'});
// 	});
// });

// var chat = io
//   .of('/chat')
//   .on('connection', function (socket) {
//     socket.emit('a message', {
//         that: 'only'
//       , '/chat': 'will get'
//     });
//     chat.emit('a message', {
//         everyone: 'in'
//       , '/chat': 'will get'
//     });
//   });

// var news = io
//   .of('/news')
//   .on('connection', function (socket) {
//     socket.emit('item', { news: 'item' });
//   });


server.listen(3000, (err) => {
	if(err) {
		console.log(`Error al correr el servidor 3000`)
	}

	console.log(`Corriendo en el puerto 3000`)
})