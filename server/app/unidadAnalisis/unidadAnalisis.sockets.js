import UnidadAnalisis from './unidadAnalisis.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (io) => {
	var unidadAnalisisNsp = io.of('/unidadAnalisis');
	
	unidadAnalisisNsp.on('connection', function (socket) {

		console.log('Unidad Analisis Conectado.')

		function unidadesAnalisis() {
			UnidadAnalisis.find((err, unidadesAnalisis) => {
				// console.log(unidadesAnalisis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_unidadesAnalisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				unidadAnalisisNsp.emit('listar_unidadesAnalisis', {
					unidadesAnalisis: unidadesAnalisis
				})
			})
		}
		
		unidadesAnalisis()


		socket.on('crear_unidadAnalisis', function(data) {
			UnidadAnalisis.verifyIfExist(data, (err, unidadExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(unidadExistente[0]) {
						socket.emit('crear_unidadAnalisis', { error: 'Esta unidad de medida ya está registrada' })
						return
				} else {
					UnidadAnalisis.create(data, (err, unidadAnalisis) => {
						if(err) {
							console.log(err)
							socket.emit('crear_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_unidadAnalisis', { mensaje: 'Se agregó exitósamente.' })
						
						unidadesAnalisis()
					})
				}
			})
		})


		socket.on('eliminar_unidadAnalisis', (data) => {
			referentialIntegritySimple('parametrosanalisis', 'id_unidadAnalisis', data.id_unidadAnalisis, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_unidadAnalisis', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					UnidadAnalisis.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_unidadAnalisis', { mensaje: 'Se Eliminó exitósamente.' })

						unidadesAnalisis()
					})
				}
			})

		})


		socket.on('editar_unidadAnalisis', (data) => {
			UnidadAnalisis.verifyIfExist(data, (err, unidadExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(unidadExistente[0]) {
					socket.emit('editar_unidadAnalisis', { error: 'Esta unidad de medida ya está registrada' })
					return
				}
					
					
				UnidadAnalisis.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_unidadAnalisis', { mensaje: 'Se actualizó exitósamente.' })
					
					unidadesAnalisis()
				})
			})
		})
		
		socket.on('mostrar_unidadAnalisis', (data) => {
			UnidadAnalisis.findById(data, (err, unidadAnalisis) => {
				// console.log(unidadAnalisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_unidadAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_unidadAnalisis', unidadAnalisis[0])
			})
		})
		


		socket.on('disconnect', function () {
			console.log('Unidad Analisis Desconecto.')
		})
	})
}
