import express from 'express'
import bodyParser from 'body-parser'

let app = express()
let routes = require('./app/routes')

let server = require('http').Server(app)

let io = require('socket.io')(server)

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendfile('index.html')
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials")
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

routes(app)

require('././app/pacienteAlergia/pacienteAlergia.sockets')(io)
require('././app/cita/cita.sockets')(io)
require('././app/preconsulta/preconsulta.sockets')(io)
require('././app/nivel/nivel.sockets')(io)
require('././app/parametroPreConsulta/parametroPreConsulta.sockets')(io)

require('././app/diagnostico/diagnostico.sockets')(io)
require('././app/consulta/consulta.sockets')(io)


// AJAX.
// require('././app/preConsultaParametro/preConsultaParametro.sockets')(io)

require('././app/unidadParametroPre/unidadParametroPre.sockets')(io)


// Farmacia.
require('././app/nombreMedicamento/nombreMedicamento.sockets')(io)
require('././app/presentacion/presentacion.sockets')(io)
require('././app/tipoConsumo/tipoConsumo.sockets')(io)
require('././app/dosis/dosis.sockets')(io)
require('././app/unidadMedidaMedicamento/unidadMedidaMedicamento.sockets')(io)
require('././app/farmaceutica/farmaceutica.sockets')(io)
require('././app/proveedor/proveedor.sockets')(io)
// Agregar solamente. si piden.
// require('././app/accion/accion.sockets')(io)
require('././app/medicamento/medicamento.sockets')(io)
require('././app/loteMedicamento/loteMedicamento.sockets')(io)



// Laboratorio
require('././app/tipoExamen/tipoExamen.sockets')(io)
require('././app/unidadAnalisis/unidadAnalisis.sockets')(io)
require('././app/parametroAnalisis/parametroAnalisis.sockets')(io)


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