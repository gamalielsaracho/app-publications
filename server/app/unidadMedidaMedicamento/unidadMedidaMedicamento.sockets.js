import UnidadMedicamento from './unidadMedidaMedicamento.model'

export default (io) => {
	var unidadMedicamentoNsp = io.of('/unidadMedidaMedicamento');
	
	unidadMedicamentoNsp.on('connection', function (socket) {

		console.log('Unidad medicamento Conectado.')

		function unidadesMedicamentos() {
			UnidadMedicamento.find((err, unidadesMedicamentos) => {
				// console.log(unidadesMedicamentos)
				if(err) {
					console.log(err)
					
					socket.emit('listar_unidadesMedicamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				unidadMedicamentoNsp.emit('listar_unidadesMedicamentos', {
					unidadesMedicamentos: unidadesMedicamentos 
				})
			})
		}
		
		unidadesMedicamentos()


		socket.on('crear_unidadMedicamento', function(data) {
			UnidadMedicamento.verifyIfExist(data, (err, unidadExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_unidadMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(unidadExistente[0]) {
						socket.emit('crear_unidadMedicamento', { error: 'Esta unidad ya está registrada' })
						return
				} else {
					UnidadMedicamento.create(data, (err, unidadMedicamento) => {
						if(err) {
							console.log(err)
							socket.emit('crear_unidadMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_unidadMedicamento', { mensaje: 'Se agregó exitósamente.' })
						
						unidadesMedicamentos()
					})
				}
			})
		})


		socket.on('eliminar_unidadMedicamento', (data) => {
			UnidadMedicamento.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_unidadMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_unidadMedicamento', { mensaje: 'Se Eliminó exitósamente.' })

				unidadesMedicamentos()
			})
		})


		socket.on('editar_unidadMedicamento', (data) => {
			UnidadMedicamento.verifyIfExist(data, (err, unidadExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_unidadMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(unidadExistente[0]) {
					socket.emit('editar_unidadMedicamento', { error: 'Esta unidad ya está registrada' })
					return
				}
					
					
				UnidadMedicamento.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_unidadMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_unidadMedicamento', { mensaje: 'Se actualizó exitósamente.' })
					
					unidadesMedicamentos()
				})
			})
		})
		
		socket.on('mostrar_unidadMedicamento', (data) => {
			UnidadMedicamento.findById(data, (err, unidadMedicamento) => {
				// console.log(unidadMedicamento)

				if(err) {
					console.log(err)
					socket.emit('mostrar_unidadMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_unidadMedicamento', unidadMedicamento[0])
			})
		})


		socket.on('disconnect', function () {
			console.log('Unidad medicamento Desconecto.')
		})
	})
}
