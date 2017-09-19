import Accion from './accion.model'

export default (io) => {
	var accionNsp = io.of('/accion');
	
	accionNsp.on('connection', function (socket) {

		console.log('Accion Conectado.')

		function acciones() {
			Accion.find((err, acciones) => {
				// console.log(acciones)
				if(err) {
					console.log(err)
					
					socket.emit('listar_acciones', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				accionNsp.emit('listar_acciones', { acciones: acciones })
			})
		}
		
		acciones()


		socket.on('crear_accion', function(data) {
			Accion.verifyIfExist(data, (err, accionExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_accion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(accionExistente[0]) {
						socket.emit('crear_accion', { error: 'Esta acción ya está registrada' })
						return
				} else {
					Accion.create(data, (err, accion) => {
						if(err) {
							console.log(err)
							socket.emit('crear_accion', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_accion', { mensaje: 'Se agregó exitósamente.' })
						
						acciones()
					})
				}
			})
		})


		socket.on('eliminar_accion', (data) => {
			Accion.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_accion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_accion', { mensaje: 'Se Eliminó exitósamente.' })

				acciones()
			})
		})


		socket.on('editar_accion', (data) => {
			Accion.verifyIfExist(data, (err, accionExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_accion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(accionExistente[0]) {
					socket.emit('editar_accion', { error: 'Esta acción ya está registrada' })
					return
				}
					
					
				Accion.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_accion', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_accion', { mensaje: 'Se actualizó exitósamente.' })
					
					acciones()
				})
			})
		})
		
		socket.on('mostrar_accion', (data) => {
			Accion.findById(data, (err, accion) => {
				// console.log(accion)

				if(err) {
					console.log(err)
					socket.emit('mostrar_accion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_accion', accion[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Accion Desconecto.')
		})
	})
}
