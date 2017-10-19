import AnalisisSolicitado from './analisisSolicitado.model'

import verifyRef from './././../validations/verifyRef.js'

export default (io) => {
	var analisisSolicitadoNsp = io.of('/analisisSolicitado');
	
	analisisSolicitadoNsp.on('connection', function (socket) {

		console.log('Analisis Solicitado Conectado.')

		function analisisSolicitados() {
			AnalisisSolicitado.find((err, analisisSolicitados) => {
				// console.log(analisisSolicitados)
				if(err) {
					console.log(err)
					
					socket.emit('listar_analisisSolicitados', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				analisisSolicitadoNsp.emit('listar_analisisSolicitados', {
					analisisSolicitados: analisisSolicitados
				})
			})
		}
		
		analisisSolicitados()

		socket.on('listar_analisisSolicitados_porIdPaciente', (data) => {
			AnalisisSolicitado.findByIdPaciente(data.id_paciente, (err, analisisSolicitados) => {
				if(err) {
					console.log(err)
					socket.emit('listar_analisisSolicitados_porIdPaciente', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				analisisSolicitadoNsp.emit('listar_analisisSolicitados_porIdPaciente', {
					analisisSolicitados: analisisSolicitados
				})
			})
		})


		socket.on('crear_analisisSolicitado', function(data) {
			// AnalisisSolicitado.verifyIfExist(data, (err, solicitudExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

			// 	if(solicitudExistente[0]) {
			// 			socket.emit('crear_analisisSolicitado', { error: 'Este nivel ya está registrado' })
			// 			return
			// 	} else {
					AnalisisSolicitado.create(data, (err, analisisSolicitado) => {
						if(err) {
							socket.emit('crear_analisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_analisisSolicitado', { mensaje: 'Se agregó exitósamente.' })
						
						analisisSolicitados()
					})
			// 	}
			// })
		})


		socket.on('eliminar_analisisSolicitado', (data) => {
			
			let d = {
				table1: 'analisissolicitadostipos', 
				table2: 'analisis',
				table3: null,
				fieldPrimaryKey: 'id_analisisSolicitado',
				primaryKey: data.id_analisisSolicitado
			}

			verifyRef(d, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_analisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log('En Uso AnalisisSolicitado ---------->')
				console.log(enUso)
				
				if(enUso) {
					socket.emit('eliminar_analisisSolicitado', { error: 'Este dato está siendo usado por otros registros.' })
					return
				} else {
					AnalisisSolicitado.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_analisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_analisisSolicitado', { mensaje: 'Se Eliminó exitósamente.' })

						analisisSolicitados()
					})
				}
			})

		})

		socket.on('mostrar_analisisSolicitado_editar', (data) => {
			AnalisisSolicitado.findByIdToEdit(data, (err, analisisSolicitado) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_analisisSolicitado_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_analisisSolicitado_editar', analisisSolicitado[0])
			})
		})


		socket.on('editar_analisisSolicitado', (data) => {
			// AnalisisSolicitado.verifyIfExist(data, (err, solicitudExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

			// 	if(solicitudExistente[0]) {
			// 		socket.emit('editar_analisisSolicitado', { error: 'Este nivel ya está registrado' })
			// 		return
			// 	}
					
					
				AnalisisSolicitado.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_analisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_analisisSolicitado', { mensaje: 'Se actualizó exitósamente.' })

					// VER.!
					AnalisisSolicitado.findById(data, (err, analisisSolicitado) => {
						if(err) {
							console.log(err)
							socket.emit('mostrar_analisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('mostrar_analisisSolicitado', analisisSolicitado[0])
					})

					analisisSolicitados()
				})
			// })
		})
		
		
		socket.on('mostrar_analisisSolicitado', (data) => {
			AnalisisSolicitado.findById(data, (err, analisisSolicitado) => {
				// console.log(analisisSolicitado[0])

				if(err) {
					console.log(err)
					socket.emit('mostrar_analisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_analisisSolicitado', analisisSolicitado[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Analisis Solicitado Desconecto.')
		})
	})
}
