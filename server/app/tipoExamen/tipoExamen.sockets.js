import TipoExamen from './tipoExamen.model'

export default (io) => {
	var tipoExamenNsp = io.of('/tipoExamen');
	
	tipoExamenNsp.on('connection', function (socket) {

		console.log('Tipo Examen Conectado.')

		function tiposExamenes() {
			TipoExamen.find((err, tiposExamenes) => {
				// console.log(tiposExamenes)
				if(err) {
					console.log(err)
					
					socket.emit('listar_tiposExamenes', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				tipoExamenNsp.emit('listar_tiposExamenes', { tiposExamenes: tiposExamenes })
			})
		}
		
		tiposExamenes()


		socket.on('crear_tipoExamen', function(data) {
			TipoExamen.verifyIfExist(data, (err, tipoExamenExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_tipoExamen', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(tipoExamenExistente[0]) {
						socket.emit('crear_tipoExamen', { error: 'Este tipo de examen ya está registrado' })
						return
				} else {
					TipoExamen.create(data, (err, tipoExamen) => {
						if(err) {
							console.log(err)
							socket.emit('crear_tipoExamen', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_tipoExamen', { mensaje: 'Se agregó exitósamente.' })
						
						tiposExamenes()
					})
				}
			})
		})


		socket.on('eliminar_tipoExamen', (data) => {
			TipoExamen.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_tipoExamen', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_tipoExamen', { mensaje: 'Se Eliminó exitósamente.' })

				tiposExamenes()
			})
		})


		socket.on('editar_tipoExamen', (data) => {
			TipoExamen.verifyIfExist(data, (err, tipoExamenExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_tipoExamen', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(tipoExamenExistente[0]) {
					socket.emit('editar_tipoExamen', { error: 'Este tipo de examen está registrado' })
					return
				}
					
					
				TipoExamen.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_tipoExamen', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_tipoExamen', { mensaje: 'Se actualizó exitósamente.' })
					
					tiposExamenes()
				})
			})
		})
		
		
		socket.on('mostrar_tipoExamen', (data) => {
			TipoExamen.findById(data, (err, tipoExamen) => {
				// console.log(tipoExamen)

				if(err) {
					console.log(err)
					socket.emit('mostrar_tipoExamen', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_tipoExamen', tipoExamen[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Tipo Examen Desconecto.')
		})
	})
}
