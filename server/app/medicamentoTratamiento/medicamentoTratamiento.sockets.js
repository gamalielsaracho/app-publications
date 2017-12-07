import MedicamentoTratamiento from './medicamentoTratamiento.model'

import MedicamentoDroga from '../medicamentoDroga/medicamentoDroga.model'

import fetchDataActions from './fetchDataActions'


import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {
	var medicamentoTratamientoNsp = io.of('/medicamentoTratamiento');
	
	medicamentoTratamientoNsp.on('connection', function (socket) {

		console.log('Medicamentos tratamientos Conectado.')


		socket.on('listar_medicamentosXtratamientos_byIdTratamiento', function(data) {
			fetchDataActions(medicamentoTratamientoNsp, socket).listarByIdTratamiento(data)
		})
		

		socket.on('crear_medicamentoTratamiento', function(data) {
			MedicamentoTratamiento.verifyIfExist(data, (err, datoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_medicamentoTratamiento', { error: 'Este nivel ya está registrado' })
					return
				}

				if(datoExistente[0]) {
						socket.emit('crear_medicamentoTratamiento', { error: 'Este nivel ya está registrado' })
						return
				} else {
					MedicamentoTratamiento.create(data, (err, nivel) => {
						if(err) {
							console.log(err)
							socket.emit('crear_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_medicamentoTratamiento', { mensaje: 'Se agregó exitósamente.' })
						
						fetchDataActions(medicamentoTratamientoNsp, socket).listarByIdTratamiento(data)

					})
				}
			})
		})


		socket.on('eliminar_medicamentoTratamiento', (data) => {
			MedicamentoTratamiento.findByIdIfHaveIdMedicamento(data, (err, tratamiento) => {
				MedicamentoTratamiento.findById(tratamiento[0], (err, medicamentoTratamientoDatosAnterior) => {
					let medtraAnt = medicamentoTratamientoDatosAnterior[0]

					if(err) {
						console.log(err)
						socket.emit('eliminar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{
							nombreCampo: 'Nombre',
							datoCampoAnterior: medtraAnt.nombreMedicamento
						},
						{
							nombreCampo: 'Cantidad consumo',
							datoCampoAnterior: medtraAnt.cantidadConsumo
						},
						{
							nombreCampo: 'Cantidad tiempo',
							datoCampoAnterior: medtraAnt.cantidadTiempo
						},
						{
							nombreCampo: 'Duración consumo',
							datoCampoAnterior: medtraAnt.duracionConsumo
						},
						{
							nombreCampo: 'Observaciones',
							datoCampoAnterior: medtraAnt.observaciones
						}
					]


					MedicamentoTratamiento.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						fetchDataActions(medicamentoTratamientoNsp, socket).listarByIdTratamiento(medtraAnt)

						fieldsToEditData(data.id_medicamentoTratamiento, listaCampos, 'eliminación', 'tratamiento-medicamentos', data.idPersonal, medtraAnt.id_tratamiento, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_medicamentoTratamiento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de eliminar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_medicamentoTratamiento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('eliminar_medicamentoTratamiento', { mensaje: 'Se Eliminó exitósamente.' })

					})
				})
			})
		})


		
		socket.on('editar_medicamentoTratamiento', (data) => {
			// console.log('EL DATO DESDE EL CLIENTE ----------->')
			// console.log(data)

			MedicamentoTratamiento.verifyIfExist(data, (err, datoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}


				if(datoExistente[0]) {
					socket.emit('editar_medicamentoTratamiento', { error: 'Esta indicación ya está registrada' })
					return
				}
				
				MedicamentoTratamiento.findByIdIfHaveIdMedicamento(data, (err, tratamiento) => {
					// console.log('tratamiento[0] -------->')
					// console.log(tratamiento[0])

					MedicamentoTratamiento.findById(tratamiento[0], (err, medicamentoTratamientoDatosAnterior) => {
						let medtraAnt = medicamentoTratamientoDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('editar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}


						MedicamentoTratamiento.update(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('editar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							MedicamentoTratamiento.findById(tratamiento[0], (err, medicamentoTratamientoDatosNuevo) => {
								let medtraNue = medicamentoTratamientoDatosNuevo[0]

								if(err) {
									console.log(err)
									socket.emit('editar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
									return
								}

								let listaCampos = [
									{
										nombreCampo: 'Nombre',
										datoCampoAnterior: medtraAnt.nombreMedicamento,
										datoCampoNuevo: medtraNue.nombreMedicamento
									},
									{
										nombreCampo: 'Cantidad consumo',
										datoCampoAnterior: medtraAnt.cantidadConsumo,
										datoCampoNuevo: medtraNue.cantidadConsumo
									},
									{
										nombreCampo: 'Cantidad tiempo',
										datoCampoAnterior: medtraAnt.cantidadTiempo,
										datoCampoNuevo: medtraNue.cantidadTiempo
									},
									{
										nombreCampo: 'Duración consumo',
										datoCampoAnterior: medtraAnt.duracionConsumo,
										datoCampoNuevo: medtraNue.duracionConsumo
									},
									{
										nombreCampo: 'Observaciones',
										datoCampoAnterior: medtraAnt.observaciones,
										datoCampoNuevo: medtraNue.observaciones
									}
								]


								fieldsToEditData(data.id_medicamentoTratamiento, listaCampos, 'actualización', 'tratamiento-medicamentos', data.idPersonal, data.id_tratamiento, (err, datos) => {
									if(err) {
										console.log(err)
										socket.emit('editar_medicamentoTratamiento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return 
									}
									
									// .. Ejecutar esto despues de editar el registro. 
									// console.log(datos)
									AuditoriaModulo1.create(datos, (err) => {
										if(err) {
											console.log(err)
											socket.emit('editar_medicamentoTratamiento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
											return
										}
									})
								})

								socket.emit('editar_medicamentoTratamiento', { mensaje: 'Se actualizó exitósamente.' })

								fetchDataActions(medicamentoTratamientoNsp, socket).listarByIdTratamiento(data)
							})

						})
					})
				})		
			})
		})
		
		
		
		socket.on('mostrar_medicamentoTratamiento_editar', (data) => {
			// console.log('EL DATO DESDE EL CLIENTE...')
			// console.log(data)
			MedicamentoTratamiento.findByIdIfHaveIdMedicamento(data, (err, tratamiento) => {
					// console.log('tratamiento[0]')
					// console.log(tratamiento[0])
					
				MedicamentoTratamiento.findByIdToUpdate(tratamiento[0], (err, medicamentoTratamiento) => {

					if(err) {
						console.log(err)
						socket.emit('mostrar_medicamentoTratamiento_editar', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					if(medicamentoTratamiento[0].medicamentoNoExistente) {
						socket.emit('mostrar_medicamentoTratamiento_editar', medicamentoTratamiento[0])
					} else {
						MedicamentoDroga.find(medicamentoTratamiento[0].id_medicamento , (err, drogas) => {
							if(err) {
								console.log(err)
								return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
							}

							medicamentoTratamiento[0].drogas = drogas

							socket.emit('mostrar_medicamentoTratamiento_editar', medicamentoTratamiento[0])
						})
					}
				})
			})
		})


		socket.on('mostrar_medicamentoTratamiento', (data) => {
			MedicamentoTratamiento.findById(data, (err, medicamentoTratamiento) => {
				// console.log(medicamentoTratamiento)

				if(err) {
					console.log(err)
					socket.emit('mostrar_medicamentoTratamiento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_medicamentoTratamiento', medicamentoTratamiento[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Medicamentos tratamientos Desconecto.')
		})
	})
}


