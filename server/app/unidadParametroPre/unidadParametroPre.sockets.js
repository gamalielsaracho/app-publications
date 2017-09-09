import UnidadParametroPre from './unidadParametroPre.model'

export default (io) => {
	var unidadParametroPreNsp = io.of('/unidadParametroPre');
	
	unidadParametroPreNsp.on('connection', function (socket) {

		console.log('Unidades Parametro Pre Conectado.')

		function unidadesParametroPre() {
			UnidadParametroPre.find((err, unidadesParametroPre) => {
				// console.log(unidadesParametroPre)
				if(err) {
					console.log(err)
					
					socket.emit('listar_unidadesParametroPre', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				unidadParametroPreNsp.emit('listar_unidadesParametroPre', { unidadesParametroPre: unidadesParametroPre })
			})
		}
		
		unidadesParametroPre()


		socket.on('crear_unidadParametroPre', function(data) {
			UnidadParametroPre.verifyIfExist(data, (err, unidadParametroExistente) => {
				if(err) {
					console.log(err)
				}

				if(unidadParametroExistente[0]) {
						socket.emit('crear_unidadParametroPre', { error: 'Esta unidad de medida ya está registrada' })
						return
				} else {
					UnidadParametroPre.create(data, (err, unidadParametroPre) => {
						if(err) {
							socket.emit('crear_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_unidadParametroPre', { mensaje: 'Se agregó exitósamente.' })
						
						unidadesParametroPre()
					})
				}
			})
		})


		socket.on('eliminar_unidadParametroPre', (data) => {
			UnidadParametroPre.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_unidadParametroPre', { mensaje: 'Se Eliminó exitósamente.' })

				unidadesParametroPre()
			})
		})


		socket.on('editar_unidadParametroPre', (data) => {
			UnidadParametroPre.verifyIfExist(data, (err, unidadParametroExistente) => {
				if(err) {
					console.log(err)
				}

				if(unidadParametroExistente[0]) {
					socket.emit('editar_unidadParametroPre', { error: 'Esta unidad de medida ya está registrada' })
					return
				}
					
					
				UnidadParametroPre.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_unidadParametroPre', { mensaje: 'Se actualizó exitósamente.' })
					
					unidadesParametroPre()
				})
			})
		})
		
		socket.on('mostrar_unidadParametroPre', (data) => {
			UnidadParametroPre.findById(data, (err, unidadParametroPre) => {
				console.log(unidadParametroPre)

				if(err) {
					console.log(err)
					socket.emit('mostrar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_unidadParametroPre', unidadParametroPre[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Unidades Parametro Pre Desconecto.')
		})
	})
}
