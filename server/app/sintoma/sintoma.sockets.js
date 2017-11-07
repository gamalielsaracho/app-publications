import Sintoma from './sintoma.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (io) => {
	var sintomaNsp = io.of('/sintoma');
	
	sintomaNsp.on('connection', function (socket) {

		console.log('Sintoma Conectado.')

		function sintomas() {
			Sintoma.find((err, sintomas) => {
				// console.log(sintomas)
				if(err) {
					console.log(err)
					
					socket.emit('listar_sintomas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				sintomaNsp.emit('listar_sintomas', { sintomas: sintomas })
			})
		}
		
		sintomas()


		socket.on('crear_sintoma', function(data) {
			// console.log(data)
			Sintoma.verifyIfExist(data, (err, sintomaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(sintomaExistente[0]) {
						socket.emit('crear_sintoma', { error: 'Este sintoma ya está registrado' })
						return
				} else {
					Sintoma.create(data, (err, sintoma) => {
						if(err) {
							console.log(err)
							socket.emit('crear_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_sintoma', { mensaje: 'Se agregó exitósamente.' })
						
						sintomas()
					})
				}
			})
		})


		socket.on('eliminar_sintoma', (data) => {
			referentialIntegritySimple('consultassintomas', 'id_sintoma', data.id_sintoma, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_sintoma', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Sintoma.findById(data, (err, sintomaEncontrada) => {
						let sintoma = sintomaEncontrada[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{ 
								nombreCampo: 'Nombre',
								datoCampoAnterior: sintoma.descripcion
							}
						]

						Sintoma.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							sintomas()

							fieldsToEditData(data.id_sintoma, listaCampos, 'eliminación', 'sintomas', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_sintoma', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return 
								}
								
								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_sintoma', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_sintoma', { mensaje: 'Se Eliminó exitósamente.' })

						})

					})
				}
			})
		})


		socket.on('editar_sintoma', (data) => {
			Sintoma.verifyIfExist(data, (err, sintomaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(sintomaExistente[0]) {
					socket.emit('editar_sintoma', { error: 'Este nivel ya está registrado' })
					return
				}
					
				Sintoma.findById(data, (err, sintomaEncontrada) => {
					let sintoma = sintomaEncontrada[0]

					if(err) {
						console.log(err)
						socket.emit('editar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					let listaCampos = [
						{ 
							nombreCampo: 'Nombre',
							datoCampoAnterior: sintoma.descripcion,
							datoCampoNuevo: data.descripcion
						}
					]


					Sintoma.update(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('editar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}
						
						sintomas()

						fieldsToEditData(data.id_sintoma, listaCampos, 'actualización', 'sintomas', data.idPersonal, null, (err, datos) => {
							if(err) {
								console.log(err)
								socket.emit('editar_sintoma', { error: 'Ocurrió un error en la auditoría de este módulo.' })
								return 
							}
							
							// .. Ejecutar esto despues de editar el registro. 
							// console.log(datos)
							AuditoriaModulo1.create(datos, (err) => {
								if(err) {
									console.log(err)
									socket.emit('editar_sintoma', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
							})
						})

						socket.emit('editar_sintoma', { mensaje: 'Se actualizó exitósamente.' })
					})
				})
					
			})
		})
		
		socket.on('mostrar_sintoma', (data) => {
			Sintoma.findById(data, (err, sintoma) => {
				// console.log(sintoma)

				if(err) {
					console.log(err)
					socket.emit('mostrar_sintoma', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_sintoma', sintoma[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Sintoma Desconecto.')
		})
	})
}
