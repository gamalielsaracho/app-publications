import Consulta from './consulta.model'

import verifyRef from './././../validations/verifyRef.js'

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


		// Estadística 1.
		Consulta.findOnlyDiagnosticos((err, diagnosticos) => {
				// console.log(diagnosticos)
			if(err) {
				console.log(err)
				socket.emit('cantidad_diagnosticos_porAnho', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				return
			}

			let longDiag = diagnosticos.length

			diagnosticos.map((i) => {
				Consulta.findCantidadDiagnosticosPorAnho(i.id_diagnostico, (err, consultas) => {
						// console.log(consultas)
					if(err) {
						console.log(err)
						socket.emit('cantidad_diagnosticos_porAnho', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

						i.labels = []
						i.data = []
					consultas.map((c) => {
						// console.log(c)
						i.data.push(c.cantidad)
						i.data.sort()

						c.fecha = c.fecha.toString()
						i.labels.push((c.fecha))
						i.labels.sort()

					})

						// i.contenido = consultas

					if(i == diagnosticos[longDiag-1]) {
						consultaNsp.emit('cantidad_diagnosticos_porAnho', diagnosticos)
					}
				})
			})
		})



		// Listar todas las consultas que realizó un médico/a.
		// para mostrarlo al mismo.
		socket.on('listar_consultas_medico', (data) => {
			Consulta.findListByIdPersonal(data.id_personal, (err, consultas) => {
				if(err) {
					console.log(err)
						
					socket.emit('listar_consultas_medico', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				socket.emit('listar_consultas_medico', { consultas: consultas })
			})

		})

		// Para el historial clinico del paciente.
		socket.on('listar_consultas_paciente', (data) => {
			Consulta.findListByIdPaciente(data.id_paciente, (err, consultas) => {
				if(err) {
					console.log(err)
						
					socket.emit('listar_consultas_paciente', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				consultaNsp.emit('listar_consultas_paciente', { consultas: consultas })
			})

		})

		socket.on('crear_consulta', function(data) {
			// Consulta.verifyIfExist(data, (err, consultaExistente) => {
				// if(err) {
				// 	console.log(err)
				// }

				// if(consultaExistente[0]) {
				// 		socket.emit('crear_consulta', { error: 'Esta consulta ya está registrado' })
				// 		return
				// } else {
					Consulta.create(data, (err, consulta) => {
						if(err) {
							console.log(err)
							socket.emit('crear_consulta', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_consulta', { 
							mensaje: 'Se Agregó exitósamente.',
							// ...
							idConsultaInsertada: consulta.insertId
						})

						consultas()
					})
				// }
			// })
		})


		socket.on('eliminar_consulta', (data) => {
			let d = {
				table1: 'consultasdiagnosticos', 
				table2: 'consultassintomas', 
				table3: 'analisissolicitados',
				fieldPrimaryKey: 'id_consulta',
				primaryKey: data.id_consulta
			}

			verifyRef(d, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log('enUso ---------->')
				console.log(enUso)
				
				if(enUso) {
					socket.emit('eliminar_consulta', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Consulta.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_consulta', { mensaje: 'Se Eliminó exitósamente.' })

						consultas()
					})
				}
			})
		})

		socket.on('mostrar_consulta_editar', (data) => {
			Consulta.findByIdToUpdate(data, (err, consulta) => {
				// console.log(consulta)

				if(err) {
					console.log(err)
					socket.emit('mostrar_consulta_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_consulta_editar', consulta[0])
			})
		})

		socket.on('editar_consulta', (data) => {
			// Consulta.verifyIfExist(data, (err, consultaExistente) => {
				// if(err) {
				// 	console.log(err)
				// }

				// if(consultaExistente[0]) {
				// 	socket.emit('editar_consulta', { error: 'Esta consulta ya está registrado' })
				// 	return
				// }
					
					
				Consulta.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_consulta', { mensaje: 'Se actualizó exitósamente.' })
					
					// Volvemos a busrcar la consulta editada
					// para emitir los cambios.
					Consulta.findById(data, (err, consulta) => {
						if(err) {
							console.log(err)
							
							socket.emit('mostrar_consulta', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('mostrar_consulta', consulta[0])
					})

					consultas()
				})
			// })
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
