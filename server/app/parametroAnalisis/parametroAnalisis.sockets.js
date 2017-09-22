import ParametroAnalisis from './parametroAnalisis.model'

export default (io) => {
	var parametroAnalisisNsp = io.of('/parametroAnalisis');
	
	parametroAnalisisNsp.on('connection', function (socket) {

		console.log('Parametro analisis Conectado.')

		function parametrosAnalisis() {
			ParametroAnalisis.find((err, parametrosAnalisis) => {
				// console.log(parametrosAnalisis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_parametrosAnalisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				parametroAnalisisNsp.emit('listar_parametrosAnalisis', {
					parametrosAnalisis: parametrosAnalisis
				})
			})
		}
		
		parametrosAnalisis()


		socket.on('crear_parametroAnalisis', function(data) {
			// ParametroAnalisis.verifyIfExist(data, (err, nivelExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

			// 	if(nivelExistente[0]) {
			// 			socket.emit('crear_parametroAnalisis', { error: 'Este nivel ya está registrado' })
			// 			return
			// 	} else {
					ParametroAnalisis.create(data, (err, parametroAnalisis) => {
						if(err) {
							socket.emit('crear_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_parametroAnalisis', { mensaje: 'Se agregó exitósamente.' })
						
						parametrosAnalisis()
					})
			// 	}
			// })
		})


		socket.on('eliminar_parametroAnalisis', (data) => {
			ParametroAnalisis.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_parametroAnalisis', { mensaje: 'Se Eliminó exitósamente.' })

				parametrosAnalisis()
			})
		})


		socket.on('editar_parametroAnalisis', (data) => {
			// ParametroAnalisis.verifyIfExist(data, (err, nivelExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

			// 	if(nivelExistente[0]) {
			// 		socket.emit('editar_parametroAnalisis', { error: 'Este nivel ya está registrado' })
			// 		return
			// 	}
					
					
				ParametroAnalisis.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_parametroAnalisis', { mensaje: 'Se actualizó exitósamente.' })
					
					parametrosAnalisis()
				})
			// })
		})
		
		
		socket.on('mostrar_parametroAnalisis', (data) => {
			ParametroAnalisis.findById(data, (err, parametroAnalisis) => {
				// console.log(parametroAnalisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_parametroAnalisis', parametroAnalisis[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Parametro analisis Desconecto.')
		})
	})
}
