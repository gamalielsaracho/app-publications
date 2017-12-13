import ParametroAnalisis from './parametroAnalisis.model'
import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import verifyRef from './././../validations/verifyRef.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

import fetchDataActions from './fetchDataActions'

export default (io) => {
	var parametroAnalisisNsp = io.of('/parametroAnalisis');
	
	parametroAnalisisNsp.on('connection', function (socket) {

		console.log('Parametro analisis Conectado.')

		fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisis()
		

		socket.on('listar_parametrosAnalisis_byIdTipoAnalisis', function(data) {
			fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisisByIdTipoAnalisis(data.id_tipoAnalisis)
		})
		

		socket.on('crear_parametroAnalisis', function(data) {
			ParametroAnalisis.verifyIfExist(data, (err, parametroExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(parametroExistente[0]) {
					socket.emit('crear_parametroAnalisis', { error: 'Este nivel ya está registrado' })
					return
				}

				ParametroAnalisis.create(data, (err, parametroAnalisis) => {
					if(err) {
						console.log(err)
						socket.emit('crear_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('crear_parametroAnalisis', { mensaje: 'Se agregó exitósamente.' })
					
					fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisis()
					fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisisByIdTipoAnalisis(data.id_tipoAnalisis)
						
				})
			})
		})


		socket.on('eliminar_parametroAnalisis', (data) => {

			referentialIntegritySimple('referencias', 'id_parametroAnalisis', data.id_parametroAnalisis, (err, enUso) => {

				if(err) {
					console.log(err)
					socket.emit('eliminar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log('enUso ParametroAnalisis ---------->')
				console.log(enUso[0])
				
				if(enUso[0]) {
					socket.emit('eliminar_parametroAnalisis', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					ParametroAnalisis.findById(data, (err, parametroAnalisisDatosAnterior) => {
						let prAnlAnt = parametroAnalisisDatosAnterior[0]

						console.log(prAnlAnt)
						if(err) {
							console.log(err)
							socket.emit('eliminar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
								{ 
									nombreCampo: 'Nombre',
									datoCampoAnterior: prAnlAnt.parametro.descripcion
								},
								{ 
									nombreCampo: 'Unidad',
									datoCampoAnterior: prAnlAnt.unidad.descripcion
								},
								{ 
									nombreCampo: 'Tipo examen',
									datoCampoAnterior: prAnlAnt.tipoExamen.descripcion
								}
						]

						ParametroAnalisis.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							// console.log(prAnlAnt)
							// fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisis()
							fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisisByIdTipoAnalisis(prAnlAnt.parametro.id_tipoAnalisis)

							fieldsToEditData(data.id_parametroAnalisis, listaCampos, 'eliminación', 'parametros-analisis', data.idPersonal, prAnlAnt.parametro.id_tipoAnalisis, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_parametroAnalisis', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								// .. Ejecutar esto despues de editar el registro. 
								console.log(datos)

								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_parametroAnalisis', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_parametroAnalisis', { mensaje: 'Se Eliminó exitósamente.' })
						})
					})
				}
			})
		})


		socket.on('mostrar_parametroAnalisis_editar', (data) => {
			fetchDataActions(parametroAnalisisNsp, socket).mostrarParametroAnalisisEditar(data)
		})


		socket.on('editar_parametroAnalisis', (data) => {
			ParametroAnalisis.verifyIfExist(data, (err, parametroExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(parametroExistente[0]) {
					socket.emit('editar_parametroAnalisis', { error: 'Este parametro ya está registrado' })
					return
				}
					
					
				ParametroAnalisis.findById(data, (err, parametroAnalisisDatosAnterior) => {
					let prAnlAnt = parametroAnalisisDatosAnterior[0]

					if(err) {
						console.log(err)
						socket.emit('editar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					ParametroAnalisis.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisis()
						fetchDataActions(parametroAnalisisNsp, socket).listarParametrosAnalisisByIdTipoAnalisis(prAnlAnt.parametro.id_tipoAnalisis)
						fetchDataActions(parametroAnalisisNsp, socket).mostrarParametroAnalisis(data)


						socket.emit('editar_parametroAnalisis', { mensaje: 'Se actualizó exitósamente.' })

						ParametroAnalisis.findById(data, (err, parametroAnalisisDatosNuevo) => {
							let prAnlNue = parametroAnalisisDatosNuevo[0]
							
							if(err) {
								console.log(err)
								socket.emit('mostrar_parametroAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							let listaCampos = [
								{ 
									nombreCampo: 'Nombre',
									datoCampoAnterior: prAnlAnt.parametro.descripcion,
									datoCampoNuevo: prAnlNue.parametro.descripcion
								},
								{ 
									nombreCampo: 'Unidad',
									datoCampoAnterior: prAnlAnt.unidad.descripcion,
									datoCampoNuevo: prAnlNue.unidad.descripcion
								},
								{ 
									nombreCampo: 'Tipo examen',
									datoCampoAnterior: prAnlAnt.tipoExamen.descripcion,
									datoCampoNuevo: prAnlNue.tipoExamen.descripcion
								}
							]

							fieldsToEditData(data.id_parametroAnalisis, listaCampos, 'actualización', 'parametros-analisis', data.idPersonal, prAnlAnt.parametro.id_tipoAnalisis, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('editar_parametroAnalisis', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}

								// .. Ejecutar esto despues de editar el registro. 
								console.log(datos)

								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('editar_parametroAnalisis', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							// socket.emit('mostrar_parametroAnalisis', prAnlNue)
						})

					})

				})

			})
		})
		
		
		socket.on('mostrar_parametroAnalisis', (data) => {
			fetchDataActions(parametroAnalisisNsp, socket).mostrarParametroAnalisis(data)
		})



		socket.on('disconnect', function () {
			console.log('Parametro analisis Desconecto.')
		})
	})
}
