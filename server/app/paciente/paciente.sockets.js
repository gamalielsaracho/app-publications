import Paciente from './paciente.model'

export default (socket, io) => {
	
		function pacientes() {
			Paciente.find((err, pacientes) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_pacientes', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				// console.log(pacientes)

				io.sockets.emit('listar_pacientes', { pacientes: pacientes })
			})
		}
	
		pacientes()


		socket.on('crear_paciente', function(data) {
			Paciente.create(data, (err, paciente) => {
				if(err) {
					socket.emit('crear_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_paciente', { mensaje: 'Se agregó exitósamente.' })
			
				pacientes()
			})
		})


		socket.on('mostrar_paciente', (data) => {
			console.log(data)
			Paciente.findById(data, (err, paciente) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log(paciente)

				socket.emit('mostrar_paciente', paciente[0])
			})
		})


		socket.on('eliminar_paciente', (data) => {
			Paciente.delete(data, (err) => {
				if(err) {
					socket.emit('eliminar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_paciente', { mensaje: 'Se Eliminó exitósamente.' })

				pacientes()
			})
		})


		socket.on('editar_paciente', (data) => {
			Paciente.update(data, (err) => {
				if(err) {
					socket.emit('editar_paciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_paciente', { mensaje: 'Se actualizó exitósamente.' })
			
				pacientes()
			})
		})
}