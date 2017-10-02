import Analisis from './analisis.model'

export default (io) => {
	var analisisNsp = io.of('/analisis');
	
	analisisNsp.on('connection', function (socket) {

		console.log('Analisis Conectado.')

		function analisisLista() {
			Analisis.find((err, analisisLista) => {
				// console.log(analisisLista)
				if(err) {
					console.log(err)
					
					socket.emit('listar_analisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				analisisNsp.emit('listar_analisis', { 
					analisisLista: analisisLista 
				})
			})
		}
		
		analisisLista()


		socket.on('mostrar_por_IdanalisisSolicitado', (data) => {
			Analisis.findByIdanalisisSolicitado(data, (err, analisis) => {
				// console.log(analisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_por_IdanalisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_por_IdanalisisSolicitado', analisis[0])
			})
		})

		socket.on('crear_analisis', function(data) {
			Analisis.verifyIfExist(data, (err, analisisExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_analisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(analisisExistente[0]) {
						socket.emit('crear_analisis', { error: 'Solo está permitido crear un analisis por cada solicitud.' })
						return
				} else {
					Analisis.create(data, (err, analisis) => {
						if(err) {
							console.log(err)
							socket.emit('crear_analisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_analisis', { mensaje: 'Se agregó exitósamente.' })
						
						Analisis.findByIdanalisisSolicitado(data, (err, analisis) => {
							if(err) {
								console.log(err)
								socket.emit('mostrar_por_IdanalisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('mostrar_por_IdanalisisSolicitado', analisis[0])
						})

						analisisLista()
					})
				}
			})
		})


		socket.on('eliminar_analisis', (data) => {
			Analisis.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_analisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_analisis', { mensaje: 'Se Eliminó exitósamente.' })

				analisisLista()
			})
		})

		socket.on('mostrar_analisis', (data) => {
			Analisis.findById(data, (err, analisis) => {
				// console.log(analisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_analisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_analisis', analisis[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Analisis Desconecto.')
		})
	})
}