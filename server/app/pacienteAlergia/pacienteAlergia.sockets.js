import PacienteAlergia from './pacienteAlergia.model'

let nroDocumento
let id_tipoDocumento

export default (io) => {
	var pacienteAlergiaNsp = io.of('/pacienteAlergia');
	
	pacienteAlergiaNsp.on('connection', function (socket) {

		console.log('Paciente Alergia..!')

		// Cada vez que se muestra un paciente, se escucha nroDocumento 
		// y id_tipoDocumento. para mostrar las alergias de un paciente.
		socket.on('listar_alergiasPaciente', (data) => {

			nroDocumento = data.nroDocumento
			id_tipoDocumento = data.id_tipoDocumento

			function pacienteAlergias() {

				PacienteAlergia.find(nroDocumento, id_tipoDocumento, (err, alergias) => {
					if(err) {
						console.log(err)
						
						socket.emit('listar_alergiasPaciente', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}
						
					pacienteAlergiaNsp.emit('listar_alergiasPaciente', { alergias: alergias })
				})
			}

			pacienteAlergias()



			socket.on('crear_alergiaPaciente', function(data) {
				// console.log(data)
				
				PacienteAlergia.findById(data, (err, alergiaExistente) => {
					if(err) {
						console.log(err)

						socket.emit('crear_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					if(alergiaExistente[0]) {
						// console.log(alergiaExistente[0])

						socket.emit('crear_alergiaPaciente', { error: 'Esta alergia ya está registrada.' })
						return
					} else {
						// console.log(data)
						PacienteAlergia.create(data, (err) => {
							if(err) {
								console.log(err)

								socket.emit('crear_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('crear_alergiaPaciente', { mensaje: 'Se agregó exitósamente.' })
											
							pacienteAlergias()
						})
					}
				})
			})


			socket.on('mostrar_alergiaPaciente', (data) => {
				PacienteAlergia.findById(data, (err, alergia) => {
					if(err) {
						console.log(err)

						socket.emit('mostrar_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					// console.log(alergia[0])

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
				// console.log(data)
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

		})

		socket.on('disconnect', function () {
			console.log('Paciente Alergia Desconecto.')
		})
	})
}
