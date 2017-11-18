import Preconsulta from './preconsulta.model'

import verifyRef from './././../validations/verifyRef.js'

export default (io) => {
	var preconsultaNsp = io.of('/preconsulta');
	
	preconsultaNsp.on('connection', function (socket) {

		console.log('Pre-consulta Conectado.')

		// socket.on('listar_preconsultas', () => {
			
			function preconsultas() {
				Preconsulta.find((err, preConsultas) => {
					// console.log(preConsultas)
					if(err) {
						console.log(err)
					
						socket.emit('listar_preconsultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					preconsultaNsp.emit('listar_preconsultas', { preConsultas: preConsultas })
				})
			}
		
			preconsultas()


			function preconsultasPorFechaDia() {
				socket.on('listar_preconsultas_fechaDia', (data) => {
					// console.log(data)

					// Listar todas las pre-consultas por fecha del día y el paciente.
					Preconsulta.listarPorFechaActualYidPaciente(data, (err, preConsultas) => {
						console.log(preConsultas)
						if(err) {
							console.log(err)
							socket.emit('listar_preconsultas_fechaDia', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
							return
						}

						preconsultaNsp.emit('listar_preconsultas_fechaDia', {
							preConsultas: preConsultas 
						})
					})
				})
			}

			preconsultasPorFechaDia()

			socket.on('crear_preconsulta', function(data) {
				console.log(data)
				Preconsulta.create(data, (err, preconsulta) => {
					if(err) {
						console.log(err)
						socket.emit('crear_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('crear_preconsulta', { 
						mensaje: 'Se agregó exitósamente.' ,
						idPreconsultaInsertada: preconsulta.insertId
					})

					let datos = {}
					datos.fechaCita = data.fecha
					datos.id_paciente = data.id_paciente

					// Listar todas las pre-consultas por fecha del día y el paciente.
					Preconsulta.listarPorFechaActualYidPaciente(data, (err, preConsultas) => {
						// console.log(preConsultas)
						if(err) {
							console.log(err)
							socket.emit('listar_preconsultas_fechaDia', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
							return
						}

						preconsultaNsp.emit('listar_preconsultas_fechaDia', {
							preConsultas: preConsultas 
						})
					})
				
					preconsultas()
					// preconsultasPorFechaDia()
				})
			})

			socket.on('eliminar_preconsulta', (data) => {
				let d = {
					table1: 'consultas', 
					table2: 'preconsultasparametros', 
					table3: null,
					fieldPrimaryKey: 'id_preconsulta',
					primaryKey: data.id_preconsulta
				}

				verifyRef(d, (err, enUso) => {
					if(err) {
						console.log(err)
						socket.emit('eliminar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					console.log('preConsulta EN USO ---------->')
					console.log(enUso)
					
					if(enUso) {
						socket.emit('eliminar_preconsulta', { error: 'Este dato está siendo usado por otros registros.' })
					} else {
						Preconsulta.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('eliminar_preconsulta', { mensaje: 'Se Eliminó exitósamente.' })

							preconsultas()
						})
					}
				})

			})


			socket.on('mostrar_preconsulta_editar', (data) => {
				Preconsulta.findByIdToUpdate(data, (err, preconsulta) => {
					// console.log(preconsulta)
					if(err) {
						console.log(err)
						socket.emit('mostrar_preconsulta_editar', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_preconsulta_editar', preconsulta[0])
				})
			})

			socket.on('editar_preconsulta', (data) => {
				Preconsulta.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_preconsulta', { mensaje: 'Se actualizó exitósamente.' })
				
					preconsultas()
				})
			})
		// })

		// Esta acción saco afuera, porque si está dentro de listar_preconsultas,
		// a la hora de ver una preconsulta, y actualizar la página, No entra
		// a mostrar_preconsulta, y queda esperando. 
		socket.on('mostrar_preconsulta', (data) => {
			Preconsulta.findById(data, (err, preconsulta) => {
				// console.log(preconsulta)
				if(err) {
					console.log(err)
					socket.emit('mostrar_preconsulta', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_preconsulta', preconsulta[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Pre-consulta Desconecto.')
		})
	})
}
