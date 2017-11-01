import ParametroPreConsulta from './parametroPreConsulta.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {
	var parametroPreConsultaNsp = io.of('/parametroPreConsulta');
	
	parametroPreConsultaNsp.on('connection', function (socket) {

		console.log('Parametro preConsulta Conectado.')

		function parametros() {
			ParametroPreConsulta.find((err, parametros) => {
				// console.log(parametros)
				if(err) {
					console.log(err)
					
					socket.emit('listar_parametros', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				parametroPreConsultaNsp.emit('listar_parametros', { parametros: parametros })
			})
		}
		
		parametros()


		socket.on('crear_parametro', function(data) {
			ParametroPreConsulta.verifyIfExist(data, (err, parametroExistente) => {
				if(err) {
					console.log(err)
				}

				if(parametroExistente[0]) {
						socket.emit('crear_parametro', { error: 'Este parametro ya está registrado' })
						return
				} else {
					ParametroPreConsulta.create(data, (err, parametro) => {
						if(err) {
							console.log(err)
							socket.emit('crear_parametro', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_parametro', { mensaje: 'Se agregó exitósamente.' })
						
						parametros()
					})
				}
			})
		})


		socket.on('eliminar_parametro', (data) => {
			referentialIntegritySimple('preconsultasparametros', 'id_parametroPreconsulta', data.id_parametroPreconsulta, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_parametro', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					ParametroPreConsulta.findById(data, (err, parametroDatosAnterior) => {
						// console.log(parametro)
						let pAnt = parametroDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{ 
								nombreCampo: 'Nombre',
								datoCampoAnterior: pAnt.parametro.descripcion
							},
							{ 
								nombreCampo: 'Valor normal',
								datoCampoAnterior: pAnt.parametro.valorNormal
							},
							{ 
								nombreCampo: 'Valor alto',
								datoCampoAnterior: pAnt.parametro.valorAlto
							},
							{ 
								nombreCampo: 'Valor bajo',
								datoCampoAnterior: pAnt.parametro.valorBajo
							},
							{ 
								nombreCampo: 'Unidad',
								datoCampoAnterior: pAnt.unidad.descripcion
							}
						]

						ParametroPreConsulta.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							parametros()

							// console.log(listaCampos)
							fieldsToEditData(data.id_parametroPreconsulta, listaCampos, 'eliminación', 'parametros-preconsulta', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_parametro', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)

								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_parametro', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_parametro', { mensaje: 'Se Eliminó exitósamente.' })

						})

					})
				}
			})
		})

		socket.on('mostrar_parametro_editar', (data) => {
			ParametroPreConsulta.findByIdToUpdate(data, (err, parametro) => {
				// console.log(parametro)

				if(err) {
					console.log(err)
					socket.emit('mostrar_parametro_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_parametro_editar', parametro[0])
			})
		})

		socket.on('editar_parametro', (data) => {
			// ParametroPreConsulta.verifyIfExist(data, (err, parametroExistente) => {
				// if(err) {
				// 	console.log(err)
				// }

				// if(parametroExistente[0]) {
				// 	socket.emit('editar_parametro', { error: 'Este parametro ya está registrado' })
				// 	return
				// }
					
			ParametroPreConsulta.findById(data, (err, parametroDatosAnterior) => {
				// console.log(parametro)
				let pAnt = parametroDatosAnterior[0]

				if(err) {
					console.log(err)
					socket.emit('editar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				ParametroPreConsulta.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}
					
					parametros()

					ParametroPreConsulta.findById(data, (err, parametroDatosNuevo) => {
						// console.log(parametro)
						let pNue = parametroDatosNuevo[0]

						if(err) {
							console.log(err)
							socket.emit('editar_parametro', { error: 'Ocurrió un error en la auditoría de este módulo.' })
							return
						}

						let listaCampos = [
							{ 
								nombreCampo: 'Nombre',
								datoCampoAnterior: pAnt.parametro.descripcion,
								datoCampoNuevo: pNue.parametro.descripcion
							},
							{ 
								nombreCampo: 'Valor normal',
								datoCampoAnterior: pAnt.parametro.valorNormal,
								datoCampoNuevo: pNue.parametro.valorNormal
							},
							{ 
								nombreCampo: 'Valor alto',
								datoCampoAnterior: pAnt.parametro.valorAlto,
								datoCampoNuevo: pNue.parametro.valorAlto
							},
							{ 
								nombreCampo: 'Valor bajo',
								datoCampoAnterior: pAnt.parametro.valorBajo,
								datoCampoNuevo: pNue.parametro.valorBajo
							},
							{ 
								nombreCampo: 'Unidad',
								datoCampoAnterior: pAnt.unidad.descripcion,
								datoCampoNuevo: pNue.unidad.descripcion
							}
						]


						// console.log(listaCampos)
						fieldsToEditData(data.id_parametroPreconsulta, listaCampos, 'actualización', 'parametros-preconsulta', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_parametro', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return
							}

							// .. Ejecutar esto despues de editar el registro. 
							console.log(datos)

							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_parametro', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_parametro', { mensaje: 'Se actualizó exitósamente.' })

					})

				})

			})


			// })
		})
		
		socket.on('mostrar_parametro', (data) => {
			ParametroPreConsulta.findById(data, (err, parametro) => {
				console.log(parametro)

				if(err) {
					console.log(err)
					socket.emit('mostrar_parametro', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_parametro', parametro[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Parametro preConsulta Desconecto.')
		})
	})
}
