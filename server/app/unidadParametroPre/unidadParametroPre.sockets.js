import UnidadParametroPre from './unidadParametroPre.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {

	var unidadParametroPreNsp = io.of('/unidadParametroPre');
	
	unidadParametroPreNsp.on('connection', function (socket) {

		console.log('Unidades Parametro Pre Conectado.')

		function unidadesParametroPre() {
			UnidadParametroPre.find((err, unidadesParametroPre) => {
				// console.log(unidadesParametroPre)
				if(err) {
					console.log(err)
					
					socket.emit('listar_unidadesParametroPre', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				unidadParametroPreNsp.emit('listar_unidadesParametroPre', { unidadesParametroPre: unidadesParametroPre })
			})
		}
		
		unidadesParametroPre()


		socket.on('crear_unidadParametroPre', function(data) {
			UnidadParametroPre.verifyIfExist(data, (err, unidadParametroExistente) => {
				if(err) {
					console.log(err)
				}

				if(unidadParametroExistente[0]) {
						socket.emit('crear_unidadParametroPre', { error: 'Esta unidad de medida ya está registrada' })
						return
				} else {
					UnidadParametroPre.create(data, (err, unidadParametroPre) => {
						if(err) {
							socket.emit('crear_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_unidadParametroPre', { mensaje: 'Se agregó exitósamente.' })
						
						unidadesParametroPre()
					})
				}
			})
		})


		socket.on('eliminar_unidadParametroPre', (data) => {
			referentialIntegritySimple('parametrospreconsulta', 'id_unidadParametroPre', data.id_unidadParametroPre, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_unidadParametroPre', { error: 'Este dato está siendo usado por otros registros.' })
				} else {

					UnidadParametroPre.findById(data, (err, unidadDatosAnterior) => {
						let uAnt = unidadDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: uAnt.descripcion
							}
						]


						UnidadParametroPre.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							unidadesParametroPre()

							fieldsToEditData(data.id_unidadParametroPre, listaCampos, 'eliminación', 'unidades-parametro-preconsulta', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_unidadParametroPre', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
								
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_unidadParametroPre', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})
							
							socket.emit('eliminar_unidadParametroPre', { mensaje: 'Se Eliminó exitósamente.' })

						})
					})

				}
			})
		})


		socket.on('editar_unidadParametroPre', (data) => {
			UnidadParametroPre.verifyIfExist(data, (err, unidadParametroExistente) => {
				if(err) {
					console.log(err)
				}

				if(unidadParametroExistente[0]) {
					socket.emit('editar_unidadParametroPre', { error: 'Esta unidad de medida ya está registrada' })
					return
				}

				UnidadParametroPre.findById(data, (err, unidadDatosAnterior) => {
					let uAnt = unidadDatosAnterior[0]

					if(err) {
						console.log(err)
						socket.emit('editar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{
							nombreCampo: 'Nombre',
							datoCampoAnterior: uAnt.descripcion,
							datoCampoNuevo: data.descripcion
						}
					]

					UnidadParametroPre.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}
							
						unidadesParametroPre()

						fieldsToEditData(data.id_unidadParametroPre, listaCampos, 'actualización', 'unidades-parametro-preconsulta', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_unidadParametroPre', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de editar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_unidadParametroPre', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_unidadParametroPre', { mensaje: 'Se actualizó exitósamente.' })

					})
				})					
			})
		})
		
		socket.on('mostrar_unidadParametroPre', (data) => {
			UnidadParametroPre.findById(data, (err, unidadParametroPre) => {
				console.log(unidadParametroPre)

				if(err) {
					console.log(err)
					socket.emit('mostrar_unidadParametroPre', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_unidadParametroPre', unidadParametroPre[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Unidades Parametro Pre Desconecto.')
		})
	})
}
