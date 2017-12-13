import Consulta from './consulta.model'
import PreConsultaParametro from '../preConsultaParametro/preConsultaParametro.model'
import ConsultaSintoma from '../consultaSintoma/consultaSintoma.model'
import ConsultaDiagnostico from '../consultaDiagnostico/consultaDiagnostico.model'

// ............
import MedicamentoTratamiento from '../medicamentoTratamiento/medicamentoTratamiento.model'
import Medicamento from '../medicamento/medicamento.model'
import MedicamentoDroga from '../medicamentoDroga/medicamentoDroga.model'

import moment from 'moment'


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


		function consultasPorMedico(idPersonal) {
			// Listar todas las consultas que realizó un médico/a.
			// para mostrarlo al mismo.
			Consulta.findListByIdPersonal(idPersonal, (err, consultas) => {
				if(err) {
					console.log(err)
							
					socket.emit('listar_consultas_medico', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				socket.emit('listar_consultas_medico', { consultas: consultas })
			})
		}

		socket.on('listar_consultas_medico', (data) => {
			consultasPorMedico(data.id_personal)
		})
		
		
		// ..
		function consultasPorPreConsulta(idPreConsulta) {
			Consulta.findListByIdPreConsulta(idPreConsulta, (err, consultas) => {
				if(err) {
					console.log(err)
					socket.emit('listar_consultas_preConsulta', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				consultaNsp.emit('listar_consultas_preConsulta', {
					consultas: consultas
				})
			})
		}

		socket.on('listar_consultas_preConsulta', (data) => {
			consultasPorPreConsulta(data.id_preconsulta)
		})



		let listaDetalladaConsultas = []

		Consulta.findListaConsultasDetalladasReporte((err, consultas) => {
			// console.log(consultas)
			if(err) {
				console.log(err)
				socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
				return
			}


			let longConsultas = consultas.length

			// consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
			let op
			consultas.map((i) => {

				PreConsultaParametro.find(i.preConsulta.id_preconsulta, (err, resultadosPreconsulta) => {
					if(err) {
						console.log(err)	
						socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						return
					}

					i.resultadosPreconsulta = resultadosPreconsulta

					ConsultaSintoma.find(i.consulta.id_consulta, (err, sintomas) => {
						if(err) { 
							console.log(err)	
							socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })				
							return
						}

						i.sintomas = sintomas

						ConsultaDiagnostico.find(i.consulta.id_consulta, (err, diagnosticos) => {
							if(err) {
								console.log(err)	
								socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })				
								return
							}

							i.diagnosticos = diagnosticos


							// if(i.consulta.id_tratamiento) {
								MedicamentoTratamiento.findListByIdTratamientoReporteConsultas({ id_tratamiento:i.consulta.id_tratamiento }, (err, medicamentosTratamiento) => {

									if(medicamentosTratamiento.length) {
										i.tratamientos = medicamentosTratamiento
										
										if(i == consultas[longConsultas-1]) {
											consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
										}

									} else {
										i.tratamientos = medicamentosTratamiento
										console.log(medicamentosTratamiento)
										
										if(i == consultas[longConsultas-1]) {
											consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
										}
									}

								})
								
							// } else {

							// 	i.tratamientos = []

							// 	if(i == consultas[longConsultas-1]) {
							// 		consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
							// 	}
							// }



							// if(i.consulta.id_tratamiento) {
							// 	MedicamentoTratamiento.findListByIdTratamientoReporteConsultas({ id_tratamiento:i.consulta.id_tratamiento }, (err, medicamentosTratamiento) => {
							// 		if(err) {
							// 			console.log(err)
							// 			socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })					
							// 			return
							// 		}

							// 		// console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
							// 		// console.log(medicamentosTratamiento)

							// 		// let longMedicamentosTratamiento = medicamentosTratamiento.length

							// 		// if(longMedicamentosTratamiento) {
							// 			// medicamentosTratamiento.map((j) => {
							// 			// 	let idMedicamento = j.indicacion.id_medicamento

							// 			// 		MedicamentoDroga.find(idMedicamento , (err, drogas) => {
							// 			// 			if(err) {
							// 			// 				console.log(err)
							// 			// 				socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
							// 			// 				return
							// 			// 			}
														
							// 			// 			j.drogas = drogas

													
							// 			// 		})
							// 			// })

							// 			i.tratamientos = medicamentosTratamiento
										
							// 			if(i == consultas[longConsultas-1]) {
							// 				consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
							// 			}
							// 		// } 
							// 		// else {
							// 		// 	i.tratamientos = []

							// 		// 	if(i == consultas[longConsultas-1]) {
							// 		// 		consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
							// 		// 	}
							// 		// }

							// 	})

							// } else {
							// 	i.tratamientos = []
							// 	if(i == consultas[longConsultas-1]) {
							// 		consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
							// 	}
							// }

							// if(i.consulta.id_tratamiento) {
							// 	// i.tratamientos = [{ hola: "dddd" }]
							// 	console.log("------> "+i.consulta.id_tratamiento)
							// 	MedicamentoTratamiento.findListByIdTratamientoReporteConsultas({ id_tratamiento:i.consulta.id_tratamiento }, (err, medicamentosTratamiento) => {
									
							// 		medicamentosTratamiento.map((j) => {
							// 			let idMedicamento = j.indicacion.id_medicamento

							// 			MedicamentoDroga.find(idMedicamento , (err, drogas) => {
							// 				if(err) {
							// 					console.log(err)
							// 					socket.emit('reporte_listar_consultas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
							// 					return
							// 				}
														
							// 				j.drogas = drogas

													
							// 			})
							// 		})
							// 		i.tratamientos = medicamentosTratamiento

							// 		if(i == consultas[longConsultas-1]) {
							// 			consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
							// 		}
							// 	})

							// } else {
							// 	i.tratamientos = []

							// 	if(i == consultas[longConsultas-1]) {
							// 		consultaNsp.emit('reporte_listar_consultas', { consultas: consultas })
							// 	}
							// }
						})
					})


				})
				
			})


			// consultaNsp.emit('reporte_listar_consultas', { consultas: listaDetalladaConsultas })			
		})
			console.log(listaDetalladaConsultas)



		// Estadística 1.
		// Consulta.findOnlyDiagnosticos((err, diagnosticos) => {
		// 	if(err) {
		// 		console.log(err)
		// 		socket.emit('cantidad_diagnosticos_enAnhos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
		// 		return
		// 	}

		// 	let longDiag = diagnosticos.length

		// 	diagnosticos.map((i) => {
		// 		Consulta.findCantidadDiagnosticosEnAnhos(i.id_diagnostico, (err, consultas) => {
		// 				// console.log(consultas)

		// 			if(err) {
		// 				console.log(err)
		// 				socket.emit('cantidad_diagnosticos_enAnhos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
		// 				return
		// 			}

		// 				i.labels = []
		// 				i.data = []
		// 			consultas.map((c) => {
		// 				// console.log(c)
		// 				i.data.push(c.cantidad)
		// 				// i.data.sort()

		// 				c.fecha = c.fecha.toString()
		// 				i.labels.push((c.fecha))
		// 				// i.labels.sort()

		// 			})

		// 				// i.contenido = consultas

		// 			if(i == diagnosticos[longDiag-1]) {
		// 				console.log(diagnosticos)
		// 				consultaNsp.emit('cantidad_diagnosticos_enAnhos', diagnosticos)
		// 			}
		// 		})
		// 	})
		// })



		// Estadística 2.
		// Consulta.findOnlyYears((err, anhos) => {
		// 	// console.log(anhos)
		// 	if(err) {
		// 		console.log(err)
		// 		socket.emit('cantidad_diagnosticos_porAnho', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
		// 		return
		// 	}

		// 	let longAnhos = anhos.length

		// 	anhos.map((i) => {
		// 		// console.log(i.fecha)
		// 		Consulta.findCantidadDiagnosticosPorAnho(i.fecha, (err, diagnosticos) => {
		// 			if(err) {
		// 				console.log(err)
		// 				socket.emit('cantidad_diagnosticos_porAnho', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
		// 				return
		// 			}

		// 				i.labels = []
		// 				i.data = []
		// 			diagnosticos.map((d) => {
		// 				i.data.push(d.cantidad)
		// 				// i.data.sort()

		// 				// d.fecha = d.fecha.toString()
		// 				i.labels.push((d.descripcion))
		// 				// i.labels.sort()

		// 			})

		// 			// i.contenido = consultas

		// 			if(i == anhos[longAnhos-1]) {
		// 				consultaNsp.emit('cantidad_diagnosticos_porAnho', anhos)
		// 			}

		// 		})
		// 	})
		// })	



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
						consultasPorPreConsulta(data.id_preconsulta)

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
