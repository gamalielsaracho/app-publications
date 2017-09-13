import Consulta from './consulta.model'

export default (io) => {
	var consultaNsp = io.of('/consulta');
	
	consultaNsp.on('connection', function (socket) {

		console.log('Consulta Conectado.')

		function consultas() {
			Consulta.find((err, consultas) => {
				// console.log(consultas)
				if(err) {
					console.log(err)
					
					socket.emit('listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				consultaNsp.emit('listar_consultas', { consultas: consultas })
			})
		}
		
		consultas()


		socket.on('crear_consulta', function(data) {
			Consulta.verifyIfExist(data, (err, consultaExistente) => {
				if(err) {
					console.log(err)
				}

				if(consultaExistente[0]) {
						socket.emit('crear_consulta', { error: 'Esta consulta ya está registrado' })
						return
				} else {
					Consulta.create(data, (err) => {
						if(err) {
							socket.emit('crear_consulta', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						consultas()
					})
				}
			})
		})


		socket.on('eliminar_consulta', (data) => {
			Consulta.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_consulta', { mensaje: 'Se Eliminó exitósamente.' })

				consultas()
			})
		})


		socket.on('editar_consulta', (data) => {
			Consulta.verifyIfExist(data, (err, consultaExistente) => {
				if(err) {
					console.log(err)
				}

				if(consultaExistente[0]) {
					socket.emit('editar_consulta', { error: 'Esta consulta ya está registrado' })
					return
				}
					
					
				Consulta.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_consulta', { mensaje: 'Se actualizó exitósamente.' })
					
					consultas()
				})
			})
		})
		
		socket.on('mostrar_consulta', (data) => {
			Consulta.findById(data, (err, consulta) => {
				// console.log(consulta)

				if(err) {
					console.log(err)
					socket.emit('mostrar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_consulta', consulta[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Consulta Desconecto.')
		})
	})
}
