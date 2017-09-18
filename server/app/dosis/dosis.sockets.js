import Dosis from './dosis.model'

export default (io) => {
	var dosisNsp = io.of('/dosis');
	
	dosisNsp.on('connection', function (socket) {

		console.log('Dosis Conectado.')

		function listaDosis() {
			Dosis.find((err, listaDosis) => {
				// console.log(dosis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_dosis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				dosisNsp.emit('listar_dosis', { listaDosis: listaDosis })
			})
		}
		
		listaDosis()


		socket.on('crear_dosis', function(data) {
			Dosis.verifyIfExist(data, (err, dosisExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_dosis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(dosisExistente[0]) {
						socket.emit('crear_dosis', { error: 'Este dosis ya está registrado' })
						return
				} else {
					Dosis.create(data, (err, dosis) => {
						if(err) {
							console.log(err)
							socket.emit('crear_dosis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_dosis', { mensaje: 'Se agregó exitósamente.' })
						
						listaDosis()
					})
				}
			})
		})


		socket.on('eliminar_dosis', (data) => {
			Dosis.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_dosis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_dosis', { mensaje: 'Se Eliminó exitósamente.' })

				listaDosis()
			})
		})


		socket.on('editar_dosis', (data) => {
			Dosis.verifyIfExist(data, (err, dosisExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_dosis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(dosisExistente[0]) {
					socket.emit('editar_dosis', { error: 'Esta dosis ya está registrado' })
					return
				}
					
					
				Dosis.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_dosis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_dosis', { mensaje: 'Se actualizó exitósamente.' })
					
					listaDosis()
				})
			})
		})
		
		socket.on('mostrar_dosis', (data) => {
			Dosis.findById(data, (err, dosis) => {
				// console.log(dosis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_dosis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_dosis', dosis[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Dosis Desconecto.')
		})
	})
}
