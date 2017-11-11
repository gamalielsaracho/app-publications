import NombreMedicamento from './nombreMedicamento.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {
	var nombreMedicamentoNsp = io.of('/nombreMedicamento');
	
	nombreMedicamentoNsp.on('connection', function (socket) {

		console.log('Nombre medicamento Conectado.')

		function nombresMedicamentos() {
			NombreMedicamento.find((err, nombresMedicamentos) => {
				// console.log(nombresMedicamentos)
				if(err) {
					console.log(err)
					socket.emit('listar_nombresMedicamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				nombreMedicamentoNsp.emit('listar_nombresMedicamentos', { 
					nombresMedicamentos: nombresMedicamentos 
				})
			})
		}
		
		nombresMedicamentos()

		socket.on('crear_nombreMedicamento', function(data) {
			NombreMedicamento.verifyIfExist(data, (err, nombreExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(nombreExistente[0]) {
						socket.emit('crear_nombreMedicamento', { error: 'Este nombre ya está registrado' })
						return
				} else {
					NombreMedicamento.create(data, (err, nombreMedicamento) => {
						if(err) {
							console.log(err)
							socket.emit('crear_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_nombreMedicamento', { mensaje: 'Se agregó exitósamente.' })
						
						nombresMedicamentos()
					})
				}
			})
		})


		socket.on('eliminar_nombreMedicamento', (data) => {
			referentialIntegritySimple('medicamentos', 'id_nombreMedicamento', data.id_nombreMedicamento, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_nombreMedicamento', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					NombreMedicamento.findById(data, (err, nombreMedicamentoDatosAnterior) => {
						let nMeAnt = nombreMedicamentoDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: nMeAnt.descripcion
							}
						]

						NombreMedicamento.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							nombresMedicamentos()

							fieldsToEditData(data.id_nombreMedicamento, listaCampos, 'eliminación', 'nombres-medicamentos', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
								
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_nombreMedicamento', { mensaje: 'Se Eliminó exitósamente.' })

						})
					})

				}
			})
			
		})


		socket.on('editar_nombreMedicamento', (data) => {
			NombreMedicamento.verifyIfExist(data, (err, nombreExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(nombreExistente[0]) {
					socket.emit('editar_nombreMedicamento', { error: 'Este nombre ya está registrado' })
					return
				}

				NombreMedicamento.findById(data, (err, nombreMedicamentoDatosAnterior) => {
					let nMeAnt = nombreMedicamentoDatosAnterior[0]

					if(err) {
						console.log(err)
						socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{
							nombreCampo: 'Nombre',
							datoCampoAnterior: nMeAnt.descripcion,
							datoCampoNuevo: data.descripcion
						}
					]


					NombreMedicamento.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						nombresMedicamentos()

						fieldsToEditData(data.id_nombreMedicamento, listaCampos, 'actualización', 'nombres-medicamentos', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de editar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_nombreMedicamento', { mensaje: 'Se actualizó exitósamente.' })

					})

				})					
			})
		})
		
		socket.on('mostrar_nombreMedicamento', (data) => {
			NombreMedicamento.findById(data, (err, nombreMedicamento) => {
				// console.log(nombreMedicamento)

				if(err) {
					console.log(err)
					socket.emit('mostrar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_nombreMedicamento', nombreMedicamento[0])
			})
		})


		socket.on('disconnect', function () {
			console.log('Nombre medicamento Desconecto.')
		})
	})
}
