import Alergia from './alergia.model'

export default (socket, io) => {
	
		function alergias() {
			Alergia.find((err, alergias) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_alergias', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				// console.log('primero !')
				// console.log(alergias)

				io.sockets.emit('listar_alergias', { alergias: alergias })
			})
		}
	
		alergias()


		socket.on('crear_alergia', function(data) {
			Alergia.create(data, (err, alergia) => {
				if(err) {
					socket.emit('crear_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_alergia', { mensaje: 'Se agregó exitósamente.' })
			
				// console.log('Segundo !')
				alergias()
			})
		})


		socket.on('mostrar_alergia', (data) => {
			Alergia.findById(data.id_alergia, (err, alergia) => {
				if(err) {
					socket.emit('mostrar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_alergia', alergia[0])
			})
		})


		socket.on('eliminar_alergia', (data) => {
			Alergia.delete(data.id_alergia, (err) => {
				if(err) {
					socket.emit('eliminar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_alergia', { mensaje: 'Se Eliminó exitósamente.' })

				alergias()
			})
		})


		socket.on('editar_alergia', (data) => {
			Alergia.update(data, (err) => {
				if(err) {
					socket.emit('editar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_alergia', { mensaje: 'Se actualizó exitósamente.' })
			
				alergias()
			})
		})
}
