import PreConsultaParametro from './preConsultaParametro.model'

export default (io) => {
	var PreConsultaParametroNsp = io.of('/preConsultaParametro');
	
	PreConsultaParametroNsp.on('connection', function (socket) {

		console.log('PreConsulta X Parametro Conectado.')

	    socket.on('listar_parametrosPreConsulta', (data) => {
			
			function parametrosPreConsulta() {
				PreConsultaParametro.find(data.id_preconsulta, (err, parametrosPreConsulta) => {
					// console.log(parametrosPreConsulta)
					if(err) {
						console.log(err)
						
						socket.emit('listar_parametrosPreConsulta', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					PreConsultaParametroNsp.emit('listar_parametrosPreConsulta', { parametrosPreConsulta: parametrosPreConsulta })
				})
			}
			
			parametrosPreConsulta()


			socket.on('crear_parametroPreConsulta', function(data) {
				PreConsultaParametro.verifyIfExist(data, (err, parametroPreConsultaExistente) => {
					if(err) {
						console.log(err)
					}

					if(parametroPreConsultaExistente[0]) {
							socket.emit('crear_parametroPreConsulta', { error: 'Este paramentro ya está registrado' })
							return
					} else {
						PreConsultaParametro.create(data, (err, parametroPreConsulta) => {
							if(err) {
								console.log(err)

								socket.emit('crear_parametroPreConsulta', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('crear_parametroPreConsulta', { mensaje: 'Se agregó exitósamente.' })
							
							parametrosPreConsulta()
						})
					}
				})
			})


			socket.on('eliminar_parametroPreConsulta', (data) => {
				PreConsultaParametro.delete(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('eliminar_parametroPreConsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('eliminar_parametroPreConsulta', { mensaje: 'Se Eliminó exitósamente.' })

					parametrosPreConsulta()
				})
			})

			socket.on('mostrar_parametroPreConsulta_editar', (data) => {
				PreConsultaParametro.findByIdToUpdate(data, (err, parametroPreConsulta) => {
					// console.log(parametroPreConsulta)

					if(err) {
						console.log(err)
						socket.emit('mostrar_parametroPreConsulta_editar', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_parametroPreConsulta_editar', parametroPreConsulta[0])
				})
			})

			socket.on('editar_parametroPreConsulta', (data) => {						
				PreConsultaParametro.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_parametroPreConsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_parametroPreConsulta', { mensaje: 'Se actualizó exitósamente.' })
						
					parametrosPreConsulta()
				})
			})
			
			socket.on('mostrar_parametroPreConsulta', (data) => {
				PreConsultaParametro.findById(data, (err, parametroPreConsulta) => {
					// console.log(parametroPreConsulta)

					if(err) {
						console.log(err)
						socket.emit('mostrar_parametroPreConsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_parametroPreConsulta', parametroPreConsulta[0])
				})
			})
	    })

		socket.on('disconnect', function () {
			console.log('PreConsulta X Parametro Desconecto.')
		})
	})
}
