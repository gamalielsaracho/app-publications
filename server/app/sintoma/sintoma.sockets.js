import Sintoma from './sintoma.model'

export default (io) => {
	var sintomaNsp = io.of('/sintoma');
	
	sintomaNsp.on('connection', function (socket) {

		console.log('Sintoma Conectado.')

		function sintomas() {
			Sintoma.find((err, sintomas) => {
				// console.log(sintomas)
				if(err) {
					console.log(err)
					
					socket.emit('listar_sintomas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				sintomaNsp.emit('listar_sintomas', { sintomas: sintomas })
			})
		}
		
		sintomas()


		socket.on('crear_sintoma', function(data) {
			// console.log(data)
			Sintoma.verifyIfExist(data, (err, sintomaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(sintomaExistente[0]) {
						socket.emit('crear_sintoma', { error: 'Este sintoma ya está registrado' })
						return
				} else {
					Sintoma.create(data, (err, sintoma) => {
						if(err) {
							console.log(err)
							socket.emit('crear_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_sintoma', { mensaje: 'Se agregó exitósamente.' })
						
						sintomas()
					})
				}
			})
		})


		socket.on('eliminar_sintoma', (data) => {
			Sintoma.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_sintoma', { mensaje: 'Se Eliminó exitósamente.' })

				sintomas()
			})
		})


		socket.on('editar_sintoma', (data) => {
			Sintoma.verifyIfExist(data, (err, sintomaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(sintomaExistente[0]) {
					socket.emit('editar_sintoma', { error: 'Este nivel ya está registrado' })
					return
				}
					
					
				Sintoma.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_sintoma', { mensaje: 'Se actualizó exitósamente.' })
					
					sintomas()
				})
			})
		})
		
		socket.on('mostrar_sintoma', (data) => {
			Sintoma.findById(data, (err, sintoma) => {
				// console.log(sintoma)

				if(err) {
					console.log(err)
					socket.emit('mostrar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_sintoma', sintoma[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Sintoma Desconecto.')
		})
	})
}
