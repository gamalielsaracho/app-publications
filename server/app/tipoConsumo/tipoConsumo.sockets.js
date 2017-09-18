import TipoConsumo from './tipoConsumo.model'

export default (io) => {
	var tipoConsumoNsp = io.of('/tipoConsumo');
	
	tipoConsumoNsp.on('connection', function (socket) {

		console.log('Tipo consumo Conectado.')

		function tiposConsumos() {
			TipoConsumo.find((err, tiposConsumos) => {
				// console.log(tiposConsumos)
				if(err) {
					console.log(err)
					
					socket.emit('listar_tiposConsumos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				tipoConsumoNsp.emit('listar_tiposConsumos', { tiposConsumos: tiposConsumos })
			})
		}
		
		tiposConsumos()


		socket.on('crear_tipoConsumo', function(data) {
			TipoConsumo.verifyIfExist(data, (err, tipoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_tipoConsumo', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(tipoExistente[0]) {
						socket.emit('crear_tipoConsumo', { error: 'Este tipo de consumo ya está registrado' })
						return
				} else {
					TipoConsumo.create(data, (err, tipoConsumo) => {
						if(err) {
							console.log(err)
							socket.emit('crear_tipoConsumo', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_tipoConsumo', { mensaje: 'Se agregó exitósamente.' })
						
						tiposConsumos()
					})
				}
			})
		})


		socket.on('eliminar_tipoConsumo', (data) => {
			TipoConsumo.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_tipoConsumo', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_tipoConsumo', { mensaje: 'Se Eliminó exitósamente.' })

				tiposConsumos()
			})
		})


		socket.on('editar_tipoConsumo', (data) => {
			TipoConsumo.verifyIfExist(data, (err, tipoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_tipoConsumo', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(tipoExistente[0]) {
					socket.emit('editar_tipoConsumo', { error: 'Este tipo de consumo ya está registrado' })
					return
				}
					
					
				TipoConsumo.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_tipoConsumo', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_tipoConsumo', { mensaje: 'Se actualizó exitósamente.' })
					
					tiposConsumos()
				})
			})
		})
		
		socket.on('mostrar_tipoConsumo', (data) => {
			TipoConsumo.findById(data, (err, tipoConsumo) => {
				// console.log(tipoConsumo)

				if(err) {
					console.log(err)
					socket.emit('mostrar_tipoConsumo', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_tipoConsumo', tipoConsumo[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Tipo consumo Desconecto.')
		})
	})
}
