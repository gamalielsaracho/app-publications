import Alergia from './alergia.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

export default (socket, io) => {
	
		function alergias() {
			Alergia.find((err, alergias) => {
				if(err) {
					console.log(err)
				
					socket.emit('listar_alergias', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				// console.log('primero !')
				// console.log(alergias)

				io.sockets.emit('listar_alergias', { alergias: alergias })
			})
		}
	
		alergias()


		socket.on('crear_alergia', function(data) {
			Alergia.verifyIfExist(data, (err, alergiaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(alergiaExistente[0]) {
					console.log(err)
					socket.emit('crear_alergia', { error: 'Esta alergia ya está registrada.' })
					return
				}

				Alergia.create(data, (err, alergia) => {
					if(err) {
						console.log(err)
						socket.emit('crear_alergia', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('crear_alergia', { mensaje: 'Se agregó exitósamente.' })
				
					// console.log('Segundo !')
					alergias()
				})
			})
			
		})


		socket.on('mostrar_alergia', (data) => {
			Alergia.findById(data, (err, alergia) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_alergia', alergia[0])
			})
		})


		socket.on('eliminar_alergia', (data) => {
			referentialIntegritySimple('pacientesalergias', 'id_alergia', data.id_alergia, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_alergia', { error: 'Este dato está siendo usado por otros registros.' })
				} else {

					Alergia.findById(data, (err, alergiaDatosAnterior) => {
						let aAnt = alergiaDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('eliminar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: aAnt.descripcion
							}
						]

						Alergia.delete(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('eliminar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							alergias()

							fieldsToEditData(data.id_alergia, listaCampos, 'eliminación', 'alergias', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('eliminar_alergia', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
								

								// .. Ejecutar esto despues de eliminar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('eliminar_alergia', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('eliminar_alergia', { mensaje: 'Se Eliminó exitósamente.' })
						})

					})
				}
			})
		})


		socket.on('editar_alergia', (data) => {
			Alergia.verifyIfExist(data, (err, alergiaExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(alergiaExistente[0]) {
					console.log(err)
					socket.emit('editar_alergia', { error: 'Esta alergia ya está registrada.' })
				} else {
					Alergia.findById(data, (err, alergiaDatosAnterior) => {
						let aAnt = alergiaDatosAnterior[0]

						if(err) {
							console.log(err)
							socket.emit('editar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						let listaCampos = [
							{
								nombreCampo: 'Nombre',
								datoCampoAnterior: aAnt.descripcion,
								datoCampoNuevo: data.descripcion
							}
						]

						Alergia.update(data, (err) => {
							if(err) {
								console.log(err)
								socket.emit('editar_alergia', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

						
							alergias()

							fieldsToEditData(data.id_alergia, listaCampos, 'actualización', 'alergias', data.idPersonal, null, (err, datos) => {
								if(err) {
									console.log(err)
									socket.emit('editar_alergia', { error: 'Ocurrió un error en la auditoría de este módulo.' })
									return
								}
								

								// .. Ejecutar esto despues de editar el registro. 
								// console.log(datos)
								AuditoriaModulo1.create(datos, (err) => {
									if(err) {
										console.log(err)
										socket.emit('editar_alergia', { error: 'Ocurrió un error en la auditoría de este módulo.' })
										return
									}
								})
							})

							socket.emit('editar_alergia', { mensaje: 'Se actualizó exitósamente.' })
						})

					})
					
				}

			})
		})
}
