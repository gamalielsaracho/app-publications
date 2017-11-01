import Ciudad from './ciudad.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (socket, io) => {
	
		function ciudades() {
			Ciudad.find((err, ciudades) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_ciudades', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				io.sockets.emit('listar_ciudades', { ciudades: ciudades })
			})
		}
	
		ciudades()


		socket.on('crear_ciudad', function(data) {
			Ciudad.verifyIfExist(data, (err, ciudadExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(ciudadExistente[0]) {
					socket.emit('crear_ciudad', { error: 'Esta ciudad ya está registrada.' })
				} else {
					Ciudad.create(data, (err, ciudad) => {
						if(err) {
							console.log(err)
							socket.emit('crear_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_ciudad', { mensaje: 'Se agregó exitósamente.' })
					
						ciudades()
					})
				}
			})
		})


		socket.on('mostrar_ciudad', (data) => {
			Ciudad.findById(data, (err, ciudad) => {
				if(err) {
					socket.emit('mostrar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_ciudad', ciudad[0])
			})
		})


		socket.on('eliminar_ciudad', (data) => {
			referentialIntegritySimple('pacientes', 'id_ciudad', data.id_ciudad, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_ciudad', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Ciudad.findById(data, (err, ciudadDatosAnterior) => {
						let cAnt = ciudadDatosAnterior[0]

						// console.log(ciudad)
						if(err) {
							console.log(err)
							socket.emit('eliminar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: cAnt.ciudad.descripcion
							},
							{ 
								nombreCampo: 'Departamento',
								datoCampoAnterior: cAnt.departamento.descripcion
							}
						]

						Ciudad.delete(data, (err) => {
							if(err) {
								socket.emit('eliminar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							ciudades()

							// console.log(listaCampos)
							fieldsToEditData(data.id_ciudad, listaCampos, 'eliminación', 'ciudades', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_ciudad', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_ciudad', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_ciudad', { mensaje: 'Se Eliminó exitósamente.' })
						})

					})					
				}
			})
		})

		
		socket.on('mostrar_ciudad_editar', (data) => {
			Ciudad.findByIdToUpdate(data, (err, ciudad) => {
				if(err) {
					socket.emit('mostrar_ciudad_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_ciudad_editar', ciudad[0])
			})
		})


		socket.on('editar_ciudad', (data) => {
			// console.log(data)
			Ciudad.verifyIfExist(data, (err, ciudadExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(ciudadExistente[0]) {
					socket.emit('editar_ciudad', { error: 'Esta ciudad ya está registrada.' })
				} else {
					Ciudad.findById(data, (err, ciudadDatosAnterior) => {
						let cAnt = ciudadDatosAnterior[0]

						// console.log(ciudad)
						if(err) {
							console.log(err)
							socket.emit('editar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						Ciudad.update(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('editar_ciudad', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

						
							ciudades()

							Ciudad.findById(data, (err, ciudadDatosNuevo) => {
								let cNue = ciudadDatosNuevo[0]

								// console.log(ciudad)
								if(err) {
									console.log(err)
									socket.emit('editar_ciudad', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								let listaCampos = [
									{
										nombreCampo: 'Nombre',
										datoCampoAnterior: cAnt.ciudad.descripcion,
										datoCampoNuevo: cNue.ciudad.descripcion
									},
									{ 
										nombreCampo: 'Departamento',
										datoCampoAnterior: cAnt.departamento.descripcion,
										datoCampoNuevo: cNue.departamento.descripcion
									}
								]


								// console.log(listaCampos)
								fieldsToEditData(data.id_ciudad, listaCampos, 'actualización', 'ciudades', data.idPersonal, null, (err, datos) => {
									if(err) {
										console.log(err)
										socket.emit('editar_ciudad', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}

									// .. Ejecutar esto despues de editar el registro. 
									// console.log(datos)

									AuditoriaModulo1.create(datos, (err) => {
										if(err) {
											console.log(err)
											socket.emit('editar_ciudad', { error: 'Ocurrió un error en la auditoría de este módulo.' })
											return
										}
									})
								})

							})

							socket.emit('editar_ciudad', { mensaje: 'Se actualizó exitósamente.' })
						})
					})
				}
			})
		})
}
