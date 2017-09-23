import ParametroPreConsulta from './parametroPreConsulta.model'

export default (io) => {
	var parametroPreConsultaNsp = io.of('/parametroPreConsulta');
	
	parametroPreConsultaNsp.on('connection', function (socket) {

		console.log('Parametro preConsulta Conectado.')

		function parametros() {
			ParametroPreConsulta.find((err, parametros) => {
				// console.log(parametros)
				if(err) {
					console.log(err)
					
					socket.emit('listar_parametros', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				parametroPreConsultaNsp.emit('listar_parametros', { parametros: parametros })
			})
		}
		
		parametros()


		socket.on('crear_parametro', function(data) {
			ParametroPreConsulta.verifyIfExist(data, (err, parametroExistente) => {
				if(err) {
					console.log(err)
				}

				if(parametroExistente[0]) {
						socket.emit('crear_parametro', { error: 'Este parametro ya está registrado' })
						return
				} else {
					ParametroPreConsulta.create(data, (err, parametro) => {
						if(err) {
							console.log(err)
							socket.emit('crear_parametro', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_parametro', { mensaje: 'Se agregó exitósamente.' })
						
						parametros()
					})
				}
			})
		})


		socket.on('eliminar_parametro', (data) => {
			ParametroPreConsulta.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_parametro', { mensaje: 'Se Eliminó exitósamente.' })

				parametros()
			})
		})

		socket.on('mostrar_parametro_editar', (data) => {
			ParametroPreConsulta.findByIdToUpdate(data, (err, parametro) => {
				// console.log(parametro)

				if(err) {
					console.log(err)
					socket.emit('mostrar_parametro_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_parametro_editar', parametro[0])
			})
		})

		socket.on('editar_parametro', (data) => {
			// ParametroPreConsulta.verifyIfExist(data, (err, parametroExistente) => {
				// if(err) {
				// 	console.log(err)
				// }

				// if(parametroExistente[0]) {
				// 	socket.emit('editar_parametro', { error: 'Este parametro ya está registrado' })
				// 	return
				// }
					
					
				ParametroPreConsulta.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_parametro', { mensaje: 'Se actualizó exitósamente.' })
					
					parametros()
				})
			// })
		})
		
		socket.on('mostrar_parametro', (data) => {
			ParametroPreConsulta.findById(data, (err, parametro) => {
				console.log(parametro)

				if(err) {
					console.log(err)
					socket.emit('mostrar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_parametro', parametro[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Parametro preConsulta Desconecto.')
		})
	})
}
