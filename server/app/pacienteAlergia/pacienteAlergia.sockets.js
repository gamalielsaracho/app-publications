import PacienteAlergia from './pacienteAlergia.model'

export default (socket, io) => {
	
		function pacienteAlergias() {
			socket.on('listar_alergiasPaciente', (data) => {
				console.log("primero..")
				console.log(data)

				PacienteAlergia.find(data.nroDocumento, data.id_tipoDocumento, (err, alergias) => {
					if(err) {
						console.log(err)
					
						socket.emit('listar_alergiasPaciente', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					// console.log(roles)

					io.sockets.emit('listar_alergiasPaciente', { alergias: alergias })
				})
			})
		}
	
		pacienteAlergias()


		socket.on('crear_alergiaPaciente', function(data) {
			PacienteAlergia.create(data, (err, alergia) => {
				if(err) {
					console.log(err)

					socket.emit('crear_alergiaPaciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_alergiaPaciente', { mensaje: 'Se agregó exitósamente.' })
			
				pacienteAlergias()
				console.log("y segundo..")

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
}
