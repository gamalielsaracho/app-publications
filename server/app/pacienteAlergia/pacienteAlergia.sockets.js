import PacienteAlergia from './pacienteAlergia.model'

let nroDocumento
let id_tipoDocumento

let primero = 1

export default (io) => {
	var pacienteAlergiaNsp = io.of('/pacienteAlergia');
	
	pacienteAlergiaNsp.on('connection', function (socket) {

		console.log('Paciente Alergia..!')

		socket.on('mostrar_paciente_L', (data) => {
			socket.nroDocumento = data.nroDocumento
			socket.idTipoDocumento = data.id_tipoDocumento
		})

		function pacienteAlergias(nroDocumento, id_tipoDocumento) {
			
			// socket.on('mostrar_paciente_L', (data) => {
				// console.log(data)

				PacienteAlergia.find(nroDocumento, id_tipoDocumento, (err, alergias) => {
					if(err) {
						console.log(err)
						
						socket.emit('listar_alergiasPaciente', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					// console.log(alergias)
						
					pacienteAlergiaNsp.emit('listar_alergiasPaciente', { alergias: alergias })
				})
			// })

			// console.log("NO ENTRÓ.(segunda vez).!")
		}

		pacienteAlergias(socket.nroDocumento, socket.idTipoDocumento)



		socket.on('crear_alergiaPaciente', function(data) {
			// console.log(data)
			PacienteAlergia.create(data, (err, alergia) => {
				if(err) {
					console.log(err)

					socket.emit('crear_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_alergiaPaciente', { mensaje: 'Se agregó exitósamente.' })
			
				console.log("y segundo..")

				// socket.on('listar_alergiasPaciente', (data) => {
				// 	console.log("LISTAR LLAMADA (CREAR)..!")

				// socket.on('mostrar_paciente_L', (data) => {
				// 	pacienteAlergias(data.nroDocumento, data.id_tipoDocumento)
				// })
				
				pacienteAlergias(socket.nroDocumento, socket.idTipoDocumento)


				// })

			})
		})


		socket.on('mostrar_alergiaPaciente', (data) => {
			PacienteAlergia.findById(data, (err, alergia) => {
				if(err) {
					console.log(err)

					socket.emit('mostrar_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_alergiaPaciente', alergia[0])
			})
		})


		socket.on('eliminar_alergiaPaciente', (data) => {

			PacienteAlergia.delete(data, (err) => {
				if(err) {
					console.log(err)

					socket.emit('eliminar_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_alergiaPaciente', { mensaje: 'Se Eliminó exitósamente.' })

				pacienteAlergias()
			})
		})


		socket.on('editar_alergiaPaciente', (data) => {
			PacienteAlergia.update(data, (err) => {
				if(err) {
					console.log(err)

					socket.emit('editar_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_alergiaPaciente', { mensaje: 'Se actualizó exitósamente.' })
			
				pacienteAlergias()
			})
		})
		

		

		// socket.on('disconnect', function () {
		// 	console.log('Paciente Alergia Desconecto.')
		// })
	})
}
